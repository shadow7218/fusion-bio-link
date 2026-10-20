"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Instagram,
  Youtube,
  Twitter,
  Send,
  Mail,
  Globe,
  Music,
  Image as ImageIcon,
  FileText,
  Link2,
  Settings,
  BarChart3,
  Share2,
  QrCode,
  Sparkles,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ExternalLink,
  ChevronRight,
  Home,
  Search,
  PlusCircle,
  Bookmark,
  User,
  Check,
  X,
  Download,
  Sliders,
  Eye,
  Lock,
  ArrowUpDown,
} from "lucide-react";

// --- INITIAL PERSISTENT PROFILE STATE (Matches "Psyphiss" Reference Image) ---
const INITIAL_PROFILE = {
  username: "psyphiss",
  displayName: "Psyphiss",
  tagline: "Philosophy • Discipline • Better Self",
  quote: '"A better you, builds a greater tomorrow."',
  avatarUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  bannerUrl:
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1800&q=80",
  themePreset: "Dark", // Dark, Light, OLED, Anime, Minimal
  accentColor: "#38bdf8",
  glassBlur: 22,
  glassOpacity: 0.48,
  showMusicWidget: true,
  showSocialIcons: true,
  enableAnimations: true,
  enableBlur: true,
  spotify: {
    profileHandle: "Psyphiss",
    listenerBadge: "Top 1% listener • 2025",
    liveAuthorized: true,
    isPlaying: true,
    currentSong: {
      id: "1bDbXMyjaUIooNwFE9wn0N",
      title: "Better Days",
      artist: "Imagine Dragons",
      albumArt:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
      currentTime: "1:42",
      duration: "3:24",
      progressPercent: 52,
      spotifyUrl: "https://open.spotify.com/track/1bDbXMyjaUIooNwFE9wn0N",
    },
    queueAndRecent: [
      {
        id: "1",
        title: "Better Days",
        artist: "Imagine Dragons",
        albumArt:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
        playing: true,
        spotifyUrl: "https://open.spotify.com",
      },
      {
        id: "2",
        title: "505",
        artist: "Arctic Monkeys",
        albumArt:
          "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=200&q=80",
        playing: false,
        spotifyUrl: "https://open.spotify.com",
      },
      {
        id: "3",
        title: "Sweater Weather",
        artist: "The Neighbourhood",
        albumArt:
          "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=200&q=80",
        playing: false,
        spotifyUrl: "https://open.spotify.com",
      },
      {
        id: "4",
        title: "Apocalypse",
        artist: "Cigarettes After Sex",
        albumArt:
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80",
        playing: false,
        spotifyUrl: "https://open.spotify.com",
      },
    ],
    playlists: [
      {
        id: "p1",
        title: "Late Night Thoughts",
        count: "42 songs",
        cover:
          "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=200&q=80",
        url: "https://open.spotify.com",
      },
      {
        id: "p2",
        title: "Philosophy Vibes",
        count: "76 songs",
        cover:
          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=200&q=80",
        url: "https://open.spotify.com",
      },
      {
        id: "p3",
        title: "Workout + Focus",
        count: "58 songs",
        cover:
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=200&q=80",
        url: "https://open.spotify.com",
      },
      {
        id: "p4",
        title: "Anime OSTs",
        count: "34 songs",
        cover:
          "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=200&q=80",
        url: "https://open.spotify.com",
      },
    ],
  },
  quickLinks: [
    {
      id: "ql-1",
      title: "Spotify",
      subtitle: "My current vibe",
      icon: "spotify",
      url: "https://open.spotify.com",
      clicks: 1420,
      featured: true,
    },
    {
      id: "ql-2",
      title: "Latest Post",
      subtitle: "Thoughts & Quotes",
      icon: "blog",
      url: "#blog",
      clicks: 980,
      featured: false,
    },
    {
      id: "ql-3",
      title: "YouTube",
      subtitle: "Long Form Videos",
      icon: "youtube",
      url: "https://youtube.com",
      clicks: 2150,
      featured: true,
    },
    {
      id: "ql-4",
      title: "Website",
      subtitle: "Projects & More",
      icon: "globe",
      url: "https://example.com",
      clicks: 845,
      featured: false,
    },
  ],
  socials: [
    { id: "s1", name: "Instagram", handle: "@psyphiss", icon: "instagram", url: "https://instagram.com" },
    { id: "s2", name: "YouTube", handle: "@Psyphiss", icon: "youtube", url: "https://youtube.com" },
    { id: "s3", name: "Spotify", handle: "My Playlists", icon: "spotify", url: "https://open.spotify.com" },
    { id: "s4", name: "Twitter / X", handle: "@psyphiss", icon: "twitter", url: "https://x.com" },
    { id: "s5", name: "Telegram", handle: "Join Channel", icon: "telegram", url: "https://t.me" },
    { id: "s6", name: "Website", handle: "Psyphiss.com", icon: "globe", url: "https://example.com" },
    { id: "s7", name: "Email", handle: "contact@psyphiss.com", icon: "mail", url: "mailto:contact@psyphiss.com" },
  ],
  gallery: [
    {
      id: "g1",
      title: "Solitude Peak",
      category: "Photos",
      url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "g2",
      title: "Cyber Sanctuary",
      category: "Wallpapers",
      url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "g3",
      title: "Neon Horizon",
      category: "Wallpapers",
      url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "g4",
      title: "Midnight Study",
      category: "Photos",
      url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "g5",
      title: "Stoic Temple",
      category: "Wallpapers",
      url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "g6",
      title: "Ethereal Mist",
      category: "Videos",
      url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    },
  ],
  blogPosts: [
    {
      id: "b1",
      title: "The Power of Silence",
      date: "Oct 18, 2025",
      category: "Philosophy",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80",
      content:
        "In a world engineered for constant noise, silence is no longer the absence of sound—it is a deliberate sanctuary where clarity and self-mastery are forged.",
    },
    {
      id: "b2",
      title: "Discipline Beats Motivation",
      date: "Oct 15, 2025",
      category: "Life",
      image:
        "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=80",
      content:
        "Motivation is an emotional spark; discipline is an architectural system. Build habits that execute regardless of how inspired you feel at 6:00 AM.",
    },
    {
      id: "b3",
      title: "Why You Feel Lost",
      date: "Oct 12, 2025",
      category: "Quotes",
      image:
        "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=300&q=80",
      content:
        "Feeling lost is rarely a sign of failure. More often, it is the shedding of an old identity before your next chapter has fully crystallized.",
    },
    {
      id: "b4",
      title: "A Better You",
      date: "Oct 8, 2025",
      category: "Updates",
      image:
        "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=300&q=80",
      content:
        "Small daily compouding improvements create unrecognizable transformations over 365 days. Focus on today's brick.",
    },
    {
      id: "b5",
      title: "The Art of Letting Go",
      date: "Oct 5, 2025",
      category: "Philosophy",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80",
      content:
        "Holding onto what is outside your control drains the exact energy required to master what lies within your control.",
    },
  ],
};

const BACKGROUND_PRESETS = [
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1800&q=80",
];

const ACCENT_PRESETS = [
  "#38bdf8", // Sky Blue
  "#818cf8", // Indigo
  "#34d399", // Emerald
  "#c084fc", // Purple
  "#f43f5e", // Rose
];

export default function LiquidGlassPlatform() {
  // Persistent Profile State (Loads/Saves to LocalStorage + Syncs with DB API)
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [activeTab, setActiveTab] = useState<
    "home" | "music" | "gallery" | "links" | "blog"
  >("home");
  const [spotifySubTab, setSpotifySubTab] = useState<
    "now" | "playlists" | "recent"
  >("now");
  const [galleryFilter, setGalleryFilter] = useState("Photos");
  const [blogFilter, setBlogFilter] = useState("All");
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [lightboxImage, setLightboxImage] = useState<any | null>(null);

  // Studio, Analytics & Share Modals
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [showSpotifyEmbed, setShowSpotifyEmbed] = useState(false);
  const [pageViews, setPageViews] = useState(14892);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    const saved = localStorage.getItem("vibeglass_profile_v1");
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Save changes & update CSS custom properties dynamically
  useEffect(() => {
    localStorage.setItem("vibeglass_profile_v1", JSON.stringify(profile));
    document.documentElement.style.setProperty(
      "--glass-blur",
      profile.enableBlur ? `${profile.glassBlur}px` : "0px"
    );
    document.documentElement.style.setProperty(
      "--glass-opacity",
      String(profile.glassOpacity)
    );
    document.documentElement.style.setProperty(
      "--accent-color",
      profile.accentColor
    );
  }, [profile]);

  // Track Link Clicks for Analytics
  const handleLinkClick = (linkId: string, url: string) => {
    setProfile((prev) => ({
      ...prev,
      quickLinks: prev.quickLinks.map((item) =>
        item.id === linkId ? { ...item, clicks: item.clicks + 1 } : item
      ),
    }));
    if (url === "#blog") {
      setActiveTab("blog");
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // Reorder Quick Links in Customization Studio
  const moveQuickLink = (index: number, direction: -1 | 1) => {
    const updated = [...profile.quickLinks];
    const target = index + direction;
    if (target < 0 || target >= updated.length) return;
    const [moved] = updated.splice(index, 1);
    updated.splice(target, 0, moved);
    setProfile({ ...profile, quickLinks: updated });
  };

  const renderIcon = (name: string, className = "w-5 h-5") => {
    switch (name) {
      case "instagram":
        return <Instagram className={className} />;
      case "youtube":
        return <Youtube className={className} />;
      case "twitter":
        return <Twitter className={className} />;
      case "telegram":
        return <Send className={className} />;
      case "mail":
        return <Mail className={className} />;
      case "spotify":
        return <Music className={className} />;
      case "blog":
        return <FileText className={className} />;
      default:
        return <Globe className={className} />;
    }
  };

  const totalClicks = useMemo(
    () => profile.quickLinks.reduce((acc, item) => acc + item.clicks, 0),
    [profile.quickLinks]
  );

  return (
    <div
      className={`min-h-screen relative selection:bg-sky-500/30 selection:text-sky-200 ${
        profile.themePreset === "OLED"
          ? "bg-black"
          : profile.themePreset === "Light"
          ? "bg-slate-900"
          : "bg-[#06080e]"
      }`}
    >
      {/* Dynamic Ambient Background Wallpaper with Frosted Vignette */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 transition-all duration-700"
          style={{
            backgroundImage: `url(${profile.bannerUrl})`,
            filter: "blur(36px) brightness(0.32) saturate(140%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070c]/60 via-[#070a12]/80 to-[#05070b]" />
      </div>

      {/* =====================================================================
          TOP NAVIGATION BAR (Desktop Rich Header + Mobile Quick Actions)
      ====================================================================== */}
      <header className="sticky top-0 z-40 px-4 pt-3 pb-2">
        <div className="max-w-6xl mx-auto liquid-glass rounded-2xl px-4 py-2.5 flex items-center justify-between">
          {/* Brand / Identity */}
          <button
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-2.5 text-left group"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center border border-white/20 shadow-inner"
              style={{
                background: `radial-gradient(circle at top left, ${profile.accentColor}, rgba(15,23,42,0.9))`,
              }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-semibold tracking-tight text-white text-sm md:text-base">
                {profile.displayName}
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-slate-400">
                @{profile.username}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Tabs (Matches Panel 2: Home, Music, Gallery, Links, Blog) */}
          <nav className="hidden md:flex items-center gap-1 bg-black/25 p-1 rounded-xl border border-white/10">
            {(
              [
                { id: "home", label: "Home" },
                { id: "music", label: "Music" },
                { id: "gallery", label: "Gallery" },
                { id: "links", label: "Links" },
                { id: "blog", label: "Blog" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-white/15 text-white shadow-sm border border-white/15"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Action Controls: Analytics, QR Share, Theme Studio */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAnalyticsOpen(true)}
              className="liquid-glass-interactive px-3 py-1.5 rounded-xl text-xs font-medium text-slate-200 flex items-center gap-1.5"
              title="Creator Analytics"
            >
              <BarChart3 className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Analytics</span>
            </button>

            <button
              onClick={() => setIsQrModalOpen(true)}
              className="liquid-glass-interactive p-2 rounded-xl text-slate-200"
              title="Share & QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsStudioOpen(true)}
              className="liquid-glass-interactive px-3 py-1.5 rounded-xl text-xs font-medium text-white flex items-center gap-1.5 border-sky-400/30"
            >
              <Sliders className="w-3.5 h-3.5 text-sky-400" />
              <span>Theme</span>
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          MAIN CONTENT CONTAINER (Intentional Mobile & Desktop Layouts)
      ====================================================================== */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 pt-3 pb-28 md:pb-16">
        {/* -------------------------------------------------------------------
            VIEW 1 & 2: HOME HUB (Responsive Mobile Single-Col + Desktop Wide Grid)
        -------------------------------------------------------------------- */}
        {activeTab === "home" && (
          <div className="space-y-6">
            {/* HERO BANNER & PROFILE IDENTITY CARD */}
            <section className="liquid-glass rounded-3xl overflow-hidden relative">
              {/* Hero Background Scene */}
              <div className="h-44 sm:h-60 md:h-72 w-full relative overflow-hidden">
                <img
                  src={profile.bannerUrl}
                  alt="Profile Cover"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/45 to-transparent" />
              </div>

              {/* Centered Profile Avatar, Tagline, Quote & Social Row */}
              <div className="px-6 pb-8 -mt-20 sm:-mt-24 relative z-10 flex flex-col items-center text-center">
                <div className="relative group">
                  <div
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${profile.accentColor}, rgba(255,255,255,0.15))`,
                    }}
                  >
                    <img
                      src={profile.avatarUrl}
                      alt={profile.displayName}
                      className="w-full h-full rounded-full object-cover border-2 border-[#090d16]"
                    />
                  </div>
                  <span
                    className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-400 ring-4 ring-[#090d16]"
                    title="Online / Active"
                  />
                </div>

                <h1 className="mt-3.5 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {profile.displayName}
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-300 font-medium">
                  {profile.tagline}
                </p>
                <p className="mt-1.5 text-xs sm:text-sm italic text-slate-400 max-w-md">
                  {profile.quote}
                </p>

                {/* Social Icons Pill Bar */}
                {profile.showSocialIcons && (
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                    {profile.socials.slice(0, 6).map((soc) => (
                      <a
                        key={soc.id}
                        href={soc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="liquid-glass-interactive w-10 h-10 rounded-full flex items-center justify-center text-slate-200 hover:text-white"
                        title={`${soc.name} (${soc.handle})`}
                      >
                        {renderIcon(soc.icon, "w-4 h-4")}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* QUICK LINKS SECTION:
                Mobile: Stacked Full-Width Cards (Matches Panel 1)
                Desktop: 4-Column Horizontal Bento Row (Matches Panel 2) */}
            <section aria-label="Quick Links">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {profile.quickLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id, link.url)}
                    className="liquid-glass-interactive rounded-2xl p-4 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-white/15"
                        style={{
                          background:
                            link.icon === "spotify"
                              ? "rgba(30, 215, 96, 0.16)"
                              : link.icon === "youtube"
                              ? "rgba(239, 68, 68, 0.16)"
                              : "rgba(255, 255, 255, 0.07)",
                        }}
                      >
                        {renderIcon(
                          link.icon,
                          `w-5 h-5 ${
                            link.icon === "spotify"
                              ? "text-emerald-400"
                              : link.icon === "youtube"
                              ? "text-rose-400"
                              : "text-sky-300"
                          }`
                        )}
                      </div>
                      <div className="truncate">
                        <div className="font-semibold text-sm text-white group-hover:text-sky-300 transition-colors truncate">
                          {link.title}
                        </div>
                        <div className="text-xs text-slate-400 truncate">
                          {link.subtitle}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-white transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </section>

            {/* SPOTIFY MUSIC EXPERIENCE WIDGET:
                Mobile: Compact Now Playing Card
                Desktop: Dual-Column Now Playing + Tracklist Queue (Matches Panel 2) */}
            {profile.showMusicWidget && (
              <section className="liquid-glass rounded-3xl p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                      {profile.spotify.liveAuthorized
                        ? "Spotify Live Status"
                        : "Featured Spotify Track"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowSpotifyEmbed(!showSpotifyEmbed)}
                      className="text-xs text-slate-300 hover:text-white bg-white/10 px-3 py-1 rounded-full border border-white/10 transition"
                    >
                      {showSpotifyEmbed
                        ? "Show Glass View"
                        : "Launch Official Player"}
                    </button>
                    <button
                      onClick={() => setActiveTab("music")}
                      className="text-xs text-sky-400 hover:underline flex items-center gap-1"
                    >
                      <span>Full Music Page</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {showSpotifyEmbed ? (
                  <div className="rounded-2xl overflow-hidden border border-white/10">
                    <iframe
                      title="Spotify Official Embed Player"
                      src={`https://open.spotify.com/embed/track/${profile.spotify.currentSong.id}?utm_source=generator&theme=0`}
                      width="100%"
                      height="152"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Left Column: Now Playing Card */}
                    <div className="lg:col-span-7 flex flex-col justify-between bg-black/25 rounded-2xl p-4 sm:p-5 border border-white/10">
                      <div className="flex items-center gap-4">
                        <img
                          src={profile.spotify.currentSong.albumArt}
                          alt={profile.spotify.currentSong.title}
                          className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-lg border border-white/10"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-xs text-slate-400 block">
                            Now Playing
                          </span>
                          <h3 className="text-lg sm:text-2xl font-bold text-white truncate mt-0.5">
                            {profile.spotify.currentSong.title}
                          </h3>
                          <p className="text-sm text-slate-300 truncate">
                            {profile.spotify.currentSong.artist}
                          </p>
                          <a
                            href={profile.spotify.currentSong.spotifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300"
                          >
                            <span>Open in Spotify</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                      {/* Playback Controls & Verified Progress Bar */}
                      <div className="mt-5">
                        <div className="flex items-center justify-center gap-6 mb-3">
                          <button
                            onClick={() => setShowSpotifyEmbed(true)}
                            className="text-slate-400 hover:text-white transition"
                            title="Open Interactive Player"
                          >
                            <SkipBack className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setShowSpotifyEmbed(true)}
                            className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white shadow-lg transition"
                            title="Play via Official Spotify Embed"
                          >
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </button>
                          <button
                            onClick={() => setShowSpotifyEmbed(true)}
                            className="text-slate-400 hover:text-white transition"
                            title="Open Interactive Player"
                          >
                            <SkipForward className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${profile.spotify.currentSong.progressPercent}%`,
                              backgroundColor: profile.accentColor,
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-400 mt-1.5">
                          <span>{profile.spotify.currentSong.currentTime}</span>
                          <span>{profile.spotify.currentSong.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Featured Tracklist / Recently Played (Matches Desktop View) */}
                    <div className="lg:col-span-5 space-y-2.5">
                      {profile.spotify.queueAndRecent.map((track) => (
                        <a
                          key={track.id}
                          href={track.spotifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`liquid-glass-interactive rounded-xl p-2.5 flex items-center justify-between ${
                            track.playing
                              ? "border-sky-400/40 bg-sky-500/10"
                              : ""
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={track.albumArt}
                              alt={track.title}
                              className="w-11 h-11 rounded-lg object-cover shrink-0"
                            />
                            <div className="truncate">
                              <div className="text-sm font-medium text-white truncate">
                                {track.title}
                              </div>
                              <div className="text-xs text-slate-400 truncate">
                                {track.artist}
                              </div>
                            </div>
                          </div>
                          {track.playing ? (
                            <span className="text-xs font-semibold text-sky-400 px-2">
                              •••
                            </span>
                          ) : (
                            <ExternalLink className="w-3.5 h-3.5 text-slate-500 mr-1 shrink-0" />
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------------
            VIEW 3: DEDICATED SPOTIFY PAGE (Matches Panel 3)
        -------------------------------------------------------------------- */}
        {activeTab === "music" && (
          <div className="max-w-2xl mx-auto space-y-5">
            <div className="liquid-glass rounded-3xl p-6">
              {/* Top Artist/Listener Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.displayName}
                    className="w-14 h-14 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-white">
                        {profile.spotify.profileHandle}
                      </h2>
                      <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        Spotify Connected
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {profile.spotify.listenerBadge}
                    </p>
                  </div>
                </div>
                <a
                  href="https://open.spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass-interactive px-4 py-1.5 rounded-full text-xs font-semibold text-white"
                >
                  Follow
                </a>
              </div>

              {/* Sub-Navigation: Now Playing | Playlists | Recently Played */}
              <div className="flex gap-2 mt-6 border-b border-white/10 pb-3">
                {(
                  [
                    { id: "now", label: "Now Playing" },
                    { id: "playlists", label: "Playlists" },
                    { id: "recent", label: "Recently Played" },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSpotifySubTab(t.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition ${
                      spotifySubTab === t.id
                        ? "bg-white/15 text-white border border-white/15"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Active Song Card */}
              <div className="mt-5 bg-black/30 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-4">
                  <img
                    src={profile.spotify.currentSong.albumArt}
                    alt={profile.spotify.currentSong.title}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <span className="text-xs text-emerald-400 font-medium">
                      Now Playing
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {profile.spotify.currentSong.title}
                    </h3>
                    <p className="text-xs text-slate-300">
                      {profile.spotify.currentSong.artist}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${profile.spotify.currentSong.progressPercent}%`,
                        backgroundColor: profile.accentColor,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>{profile.spotify.currentSong.currentTime}</span>
                    <span>{profile.spotify.currentSong.duration}</span>
                  </div>
                </div>
              </div>

              {/* My Playlists List */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-slate-200 mb-3">
                  My Playlists
                </h3>
                <div className="space-y-2.5">
                  {profile.spotify.playlists.map((pl) => (
                    <a
                      key={pl.id}
                      href={pl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="liquid-glass-interactive rounded-2xl p-3 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={pl.cover}
                          alt={pl.title}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <div className="text-sm font-semibold text-white">
                            {pl.title}
                          </div>
                          <div className="text-xs text-slate-400">
                            {pl.count}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            VIEW 4: GALLERY / MEDIA SHOWCASE WITH LIGHTBOX (Matches Panel 4)
        -------------------------------------------------------------------- */}
        {activeTab === "gallery" && (
          <div className="max-w-4xl mx-auto liquid-glass rounded-3xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Gallery</h2>
                <p className="text-xs text-slate-400">
                  Curated photos, wallpapers, and digital artwork
                </p>
              </div>
              <div className="flex gap-2">
                {["All", "Photos", "Wallpapers", "Videos"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setGalleryFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                      galleryFilter === cat
                        ? "bg-sky-500/25 text-sky-300 border border-sky-400/30"
                        : "bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {profile.gallery
                .filter(
                  (item) =>
                    galleryFilter === "All" || item.category === galleryFilter
                )
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setLightboxImage(item)}
                    className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 cursor-pointer bg-black/40"
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3.5">
                      <span className="text-xs font-semibold text-white">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-slate-300">
                        {item.category}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            VIEW 5: ALL LINKS & SOCIALS HUB (Matches Panel 5)
        -------------------------------------------------------------------- */}
        {activeTab === "links" && (
          <div className="max-w-xl mx-auto liquid-glass rounded-3xl p-6 space-y-3">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white">Links</h2>
              <p className="text-xs text-slate-400">
                All official socials, channels, and direct contact points
              </p>
            </div>
            {profile.socials.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass-interactive rounded-2xl p-4 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-200 group-hover:text-sky-300 transition">
                    {renderIcon(item.icon, "w-5 h-5")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {item.name}
                    </div>
                    <div className="text-xs text-slate-400">{item.handle}</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </a>
            ))}
          </div>
        )}

        {/* -------------------------------------------------------------------
            VIEW 6: BLOG / NOTES / PHILOSOPHY READER (Matches Panel 6)
        -------------------------------------------------------------------- */}
        {activeTab === "blog" && (
          <div className="max-w-2xl mx-auto liquid-glass rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-white">Blog</h2>
                <p className="text-xs text-slate-400">
                  Thoughts, quotes, stories, and personal notes
                </p>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
              {["All", "Quotes", "Philosophy", "Life", "Updates"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setBlogFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 transition ${
                    blogFilter === cat
                      ? "bg-sky-500/25 text-sky-300 border border-sky-400/30"
                      : "bg-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {selectedPost ? (
              <div className="bg-black/30 rounded-2xl p-5 border border-white/10 space-y-4">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-xs text-sky-400 hover:underline"
                >
                  ← Back to all notes
                </button>
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span className="text-sky-400">{selectedPost.category}</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {selectedPost.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedPost.content}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {profile.blogPosts
                  .filter(
                    (post) =>
                      blogFilter === "All" || post.category === blogFilter
                  )
                  .map((post) => (
                    <button
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      className="w-full liquid-glass-interactive rounded-2xl p-3 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="truncate">
                          <div className="text-sm font-semibold text-white truncate">
                            {post.title}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            {post.date}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </button>
                  ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* =====================================================================
          MOBILE LIQUID GLASS BOTTOM NAVIGATION BAR (Matches Panel 1)
      ====================================================================== */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-4 inset-x-4 z-40 liquid-glass rounded-2xl px-6 py-3 flex items-center justify-between"
      >
        <button
          onClick={() => setActiveTab("home")}
          className={`${
            activeTab === "home" ? "text-sky-400" : "text-slate-400"
          }`}
        >
          <Home className="w-5 h-5" />
        </button>
        <button
          onClick={() => setActiveTab("music")}
          className={`${
            activeTab === "music" ? "text-sky-400" : "text-slate-400"
          }`}
        >
          <Music className="w-5 h-5" />
        </button>
        <button
          onClick={() => setActiveTab("gallery")}
          className={`${
            activeTab === "gallery" ? "text-sky-400" : "text-slate-400"
          }`}
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => setActiveTab("blog")}
          className={`${
            activeTab === "blog" ? "text-sky-400" : "text-slate-400"
          }`}
        >
          <Bookmark className="w-5 h-5" />
        </button>
        <button
          onClick={() => setActiveTab("links")}
          className={`${
            activeTab === "links" ? "text-sky-400" : "text-slate-400"
          }`}
        >
          <User className="w-5 h-5" />
        </button>
      </nav>

      {/* =====================================================================
          PANEL 7: SETTINGS / CUSTOMIZATION STUDIO DRAWER
      ====================================================================== */}
      {isStudioOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md liquid-glass h-full overflow-y-auto p-6 space-y-6 border-l border-white/15">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-sky-400" />
                <h2 className="text-lg font-bold text-white">
                  Settings & Theme Studio
                </h2>
              </div>
              <button
                onClick={() => setIsStudioOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Identity Editor */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Identity & Bio
              </label>
              <input
                type="text"
                value={profile.displayName}
                onChange={(e) =>
                  setProfile({ ...profile, displayName: e.target.value })
                }
                placeholder="Display Name"
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white"
              />
              <input
                type="text"
                value={profile.tagline}
                onChange={(e) =>
                  setProfile({ ...profile, tagline: e.target.value })
                }
                placeholder="Tagline"
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white"
              />
            </div>

            {/* Appearance Theme Dropdown */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Appearance
              </label>
              <div className="flex items-center justify-between bg-black/35 px-4 py-2.5 rounded-xl border border-white/10">
                <span className="text-sm text-slate-200">Theme</span>
                <select
                  value={profile.themePreset}
                  onChange={(e) =>
                    setProfile({ ...profile, themePreset: e.target.value })
                  }
                  className="bg-transparent text-sm font-medium text-sky-400 focus:outline-none"
                >
                  <option value="Dark" className="bg-slate-900">
                    Liquid Dark
                  </option>
                  <option value="OLED" className="bg-slate-900">
                    OLED Black
                  </option>
                  <option value="Minimal" className="bg-slate-900">
                    Minimal Frost
                  </option>
                  <option value="Anime" className="bg-slate-900">
                    Anime Aesthetic
                  </option>
                </select>
              </div>
            </div>

            {/* Accent Color Swatches (Matches Panel 7) */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Accent Color
              </label>
              <div className="flex items-center gap-3">
                {ACCENT_PRESETS.map((color) => (
                  <button
                    key={color}
                    onClick={() =>
                      setProfile({ ...profile, accentColor: color })
                    }
                    className={`w-8 h-8 rounded-full transition-transform ${
                      profile.accentColor === color
                        ? "scale-110 ring-2 ring-white"
                        : "opacity-75 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Background Selector (Matches Panel 7) */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Background Scene
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {BACKGROUND_PRESETS.map((bg, idx) => (
                  <button
                    key={idx}
                    onClick={() => setProfile({ ...profile, bannerUrl: bg })}
                    className={`h-16 rounded-xl overflow-hidden border-2 transition ${
                      profile.bannerUrl === bg
                        ? "border-sky-400 scale-105"
                        : "border-transparent opacity-70"
                    }`}
                  >
                    <img
                      src={bg}
                      alt={`Preset ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Glass Blur Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Liquid Glass Blur Depth</span>
                <span className="text-sky-400">{profile.glassBlur}px</span>
              </div>
              <input
                type="range"
                min={4}
                max={40}
                value={profile.glassBlur}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    glassBlur: Number(e.target.value),
                  })
                }
                className="w-full accent-sky-400"
              />
            </div>

            {/* Feature Toggles (Music Widget, Show Social Icons, Animations, Blur Effect) */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              {[
                {
                  label: "Music Widget",
                  key: "showMusicWidget" as const,
                },
                {
                  label: "Show Social Icons",
                  key: "showSocialIcons" as const,
                },
                {
                  label: "Animations",
                  key: "enableAnimations" as const,
                },
                {
                  label: "Blur Effect",
                  key: "enableBlur" as const,
                },
              ].map((toggle) => (
                <div
                  key={toggle.key}
                  className="flex items-center justify-between py-1"
                >
                  <span className="text-sm text-slate-200">{toggle.label}</span>
                  <button
                    onClick={() =>
                      setProfile({
                        ...profile,
                        [toggle.key]: !profile[toggle.key],
                      })
                    }
                    className={`w-11 h-6 rounded-full transition-colors p-0.5 ${
                      profile[toggle.key] ? "bg-sky-500" : "bg-white/15"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        profile[toggle.key] ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Quick Links Order Customization */}
            <div className="space-y-2.5 pt-2 border-t border-white/10">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>Reorder Quick Links</span>
              </label>
              {profile.quickLinks.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-black/30 px-3 py-2 rounded-xl border border-white/10 text-xs"
                >
                  <span className="text-white font-medium">{item.title}</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => moveQuickLink(idx, -1)}
                      className="px-2 py-1 bg-white/10 rounded hover:bg-white/20"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveQuickLink(idx, 1)}
                      className="px-2 py-1 bg-white/10 rounded hover:bg-white/20"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          ANALYTICS DASHBOARD MODAL
      ====================================================================== */}
      {isAnalyticsOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl liquid-glass rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Creator Analytics Dashboard
                </h2>
                <p className="text-xs text-slate-400">
                  Real-time click tracking & visitor performance
                </p>
              </div>
              <button
                onClick={() => setIsAnalyticsOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-black/30 p-4 rounded-2xl border border-white/10">
                <span className="text-xs text-slate-400">Total Page Views</span>
                <div className="text-2xl font-bold text-white mt-1">
                  {pageViews.toLocaleString()}
                </div>
                <span className="text-[11px] text-emerald-400">
                  +14.2% this week
                </span>
              </div>
              <div className="bg-black/30 p-4 rounded-2xl border border-white/10">
                <span className="text-xs text-slate-400">Total Link Clicks</span>
                <div className="text-2xl font-bold text-white mt-1">
                  {totalClicks.toLocaleString()}
                </div>
                <span className="text-[11px] text-sky-400">
                  Live Click Tracking
                </span>
              </div>
              <div className="bg-black/30 p-4 rounded-2xl border border-white/10">
                <span className="text-xs text-slate-400">Avg. CTR</span>
                <div className="text-2xl font-bold text-white mt-1">
                  {((totalClicks / pageViews) * 100).toFixed(1)}%
                </div>
                <span className="text-[11px] text-purple-400">
                  Top Referrer: Instagram
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Link Performance Breakdown
              </h3>
              {profile.quickLinks.map((l) => (
                <div
                  key={l.id}
                  className="bg-black/25 p-3 rounded-xl border border-white/10 flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm font-medium text-white">
                      {l.title}
                    </div>
                    <div className="text-xs text-slate-400">{l.subtitle}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-sky-400">
                      {l.clicks.toLocaleString()} clicks
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          QR CODE & INSTANT PROFILE SHARE MODAL
      ====================================================================== */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm liquid-glass rounded-3xl p-6 text-center space-y-4">
            <div className="flex justify-end">
              <button
                onClick={() => setIsQrModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://vibeglass.app/${profile.username}`}
              alt="Profile QR Code"
              className="w-44 h-44 mx-auto rounded-2xl p-2 bg-white"
            />
            <div>
              <h3 className="text-lg font-bold text-white">
                @{profile.username}
              </h3>
              <p className="text-xs text-slate-400">
                Scan to open this Liquid Glass Hub on any device
              </p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopiedUrl(true);
                setTimeout(() => setCopiedUrl(false), 2000);
              }}
              className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm flex items-center justify-center gap-2 transition"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Copy Profile URL</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          GALLERY LIGHTBOX MODAL
      ====================================================================== */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full liquid-glass rounded-3xl overflow-hidden"
          >
            <img
              src={lightboxImage.url}
              alt={lightboxImage.title}
              className="w-full max-h-[75vh] object-cover"
            />
            <div className="p-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  {lightboxImage.title}
                </h3>
                <span className="text-xs text-slate-400">
                  {lightboxImage.category}
                </span>
              </div>
              <div className="flex gap-2">
                <a
                  href={lightboxImage.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass-interactive px-3.5 py-1.5 rounded-xl text-xs font-medium text-white flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 text-xs text-slate-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
