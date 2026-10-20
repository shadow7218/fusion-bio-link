// app/api/spotify/status/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const SPOTIFY_RECENTLY_PLAYED_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=4";

async function getValidAccessToken(spotifyAuth: any) {
  if (!spotifyAuth.refreshToken) return null;

  const basicAuth = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: spotifyAuth.refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) return null;
  const data = await response.json();
  return data.access_token;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { spotifyAuth: true },
    });

    if (!user?.spotifyAuth) {
      return NextResponse.json({ mode: "unconfigured" });
    }

    const { spotifyAuth } = user;

    // If user enabled live status and has OAuth tokens
    if (spotifyAuth.showLiveListening && spotifyAuth.refreshToken) {
      const accessToken = await getValidAccessToken(spotifyAuth);

      if (accessToken) {
        const [nowRes, recentRes] = await Promise.all([
          fetch(SPOTIFY_NOW_PLAYING_URL, {
            headers: { Authorization: `Bearer ${accessToken}` },
            cache: "no-store",
          }),
          fetch(SPOTIFY_RECENTLY_PLAYED_URL, {
            headers: { Authorization: `Bearer ${accessToken}` },
            cache: "no-store",
          }),
        ]);

        let recentTracks = [];
        if (recentRes.ok) {
          const recentData = await recentRes.json();
          recentTracks = recentData.items?.map((item: any) => ({
            id: item.track.id,
            title: item.track.name,
            artist: item.track.artists.map((a: any) => a.name).join(", "),
            albumArt: item.track.album.images[0]?.url,
            spotifyUrl: item.track.external_urls.spotify,
          })) || [];
        }

        if (nowRes.status === 200) {
          const song = await nowRes.json();
          if (song.item) {
            return NextResponse.json({
              mode: "live",
              isPlaying: song.is_playing,
              progressMs: song.progress_ms,
              durationMs: song.item.duration_ms,
              track: {
                id: song.item.id,
                title: song.item.name,
                artist: song.item.artists.map((a: any) => a.name).join(", "),
                albumArt: song.item.album.images[0]?.url,
                spotifyUrl: song.item.external_urls.spotify,
              },
              recentTracks,
              playlists: spotifyAuth.playlistsJson || [],
            });
          }
        }
      }
    }

    // Fallback to User's Pinned/Featured Track via Official Spotify Embed
    return NextResponse.json({
      mode: "featured_embed",
      featuredTrackId: spotifyAuth.featuredTrackUri || "1A2B3C4D5E6F",
      playlists: spotifyAuth.playlistsJson || [],
    });
  } catch (error) {
    return NextResponse.json({ mode: "error" }, { status: 500 });
  }
}
