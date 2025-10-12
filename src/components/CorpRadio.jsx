// src/components/CorpRadio.jsx
import React, { useEffect, useState, useRef } from "react";
import { Menu, X, Radio, Play, Mic, Users, TrendingUp, Award, Phone, Mail, Youtube, Linkedin, Instagram, Facebook, } from "lucide-react";
import logo from "../assets/CorpRadioLogo.jpeg";
import heroBg from "../assets/hero.jpeg";
import "../App.css";

export default function CorpRadio() {
  // UI state
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [publicTab, setPublicTab] = useState("corporate");
  const [memberTab, setMemberTab] = useState("corporate");

  // Refs to observe
  const sectionIds = ["hero", "shows", "radio", "members", "about", "contact"];
  const sectionRefs = useRef({});

  // Show definitions (short & precise per brand guidelines)
  const shows = [
    {
      id: "corporate",
      title: "The Corporate Show",
      host: "Jeff Kahn",
      desc: "Warm, professional interviews with CEOs & C-suite — focused on leadership and strategy.",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=60&auto=format&fit=crop",
      color: "corpnavy",
      videoType: "youtube",
      episodes: [
        {
          id: 1,
          title: "Leadership in Crisis",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          id: 2,
          title: "Building High-Performance Teams",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          id: 3,
          title: "Strategic Planning for 2025",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          id: 4,
          title: "Innovation & Disruption",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        }
      ]
    },
    {
      id: "fundamentals",
      title: "Business Fundamentals",
      host: "Charlene Senosi",
      desc: "Tactical episodes on Sales, Marketing, HR, Funding and small-business growth.",
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=60&auto=format&fit=crop",
      videoType: "youtube",
      episodes: [
        {
          id: 1,
          title: "Sales Fundamentals",
          videoUrl: "https://www.youtube.com/embed/TQZ6QtmM8tU?si=zk2XvyPyjrxfqOs-"
        },
        {
          id: 2,
          title: "Marketing Basics",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          id: 3,
          title: "HR Essentials",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          id: 4,
          title: "Funding Your Business",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        }
      ]
    },
    {
      id: "acquisition",
      title: "Acquisition & Franchise",
      host: "Lester Philander",
      desc: "Practical guidance for acquisitions, franchising and growing via M&A strategies.",
      img: "src/assets/Lester.jpg",
      videoType: "facebook",
      episodes: [
        {
          id: 1,
          title: "Franchise Fundamentals",
          videoUrl: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F4359229150964045&show_text=false&width=867&t=0"
        },
        {
          id: 2,
          title: "Acquisition Strategies",
          videoUrl: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F783620987637550%2F&show_text=false&width=867&t=0"
        },
        {
          id: 3,
          title: "M&A Best Practices",
          videoUrl: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1474116340586636%2F&show_text=true&width=867&t=0"
        },
        {
          id: 4,
          title: "Scaling Through Franchising",
          videoUrl: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F814388837754086%2F&show_text=false&width=867&t=0"

        }
      ]
    },
    {
      id: "ai",
      title: "The AI Playbook",
      host: "Charl Imalman",
      desc: "Real tools, case studies and policies for adopting AI in business workflows.",
      img: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&q=60&auto=format&fit=crop",
      videoType: "youtube",
      episodes: [
        {
          id: 1,
          title: "AI Tools Overview",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          id: 2,
          title: "Implementing AI in Business",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          id: 3,
          title: "AI Policy & Ethics",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          id: 4,
          title: "Case Studies: AI Success",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        }
      ]
    },
  ];
  const [currentEpisode, setCurrentEpisode] = useState({});

  // Initialize current episode when publicTab changes
  useEffect(() => {
    const currentShow = shows.find(s => s.id === publicTab);
    if (currentShow && currentShow.episodes && currentShow.episodes.length > 0) {
      setCurrentEpisode({ [publicTab]: currentShow.episodes[0] });
    }
  }, [publicTab]);
  // Smooth scroll + close mobile
  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Intersection Observer for active nav highlight
  useEffect(() => {
    const options = { root: null, rootMargin: "-20% 0px -60% 0px", threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, options);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        sectionRefs.current[id] = el;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Contact form basic state (non-submitting placeholder)
  const [contact, setContact] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!contact.name.trim()) {
      newErrors.name = true;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contact.email.trim() || !emailRegex.test(contact.email)) {
      newErrors.email = true;
    }

    if (!contact.subject.trim()) {
      newErrors.subject = true;
    }

    if (!contact.message.trim()) {
      newErrors.message = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Show success message
      setShowSuccess(true);

      setContact({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);

      // Here you would normally send the data to your backend
      console.log('Form submitted:', contact);
    }
  };
  return (
    <div className="min-h-screen font-sans antialiased text-gray-900 bg-white">
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer flex-shrink-0"
              onClick={() => scrollTo("hero")}
            >
              <div className="w-12 h-12 rounded-full bg-[#001F3F] flex items-center justify-center overflow-hidden">
                <img src={logo} alt="Corp Radio logo" className="object-cover w-full h-full" />
              </div>
              <div>
                <div className="text-xl font-bold tracking-tight text-[#001F3F]">Corp Radio</div>
                <div className="text-xs text-gray-600">Tuned Into The Business Frequency</div>
              </div>
            </div>

            {/* Desktop nav - visible on md+ screens */}
            <nav className="hidden md:!flex cursor:pointer items-center gap-2">
              {[
                { label: "Shows", id: "shows" },
                { label: "Public Episodes", id: "radio" },
                { label: "Members", id: "members" },
                { label: "About", id: "about" },
                { label: "Contact", id: "contact" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-sm font-medium px-4 py-2 transition-all border-b-2 ${active === link.id
                    ? "text-[#001F3F] border-[#001F3F]"
                    : "text-gray-600 border-transparent hover:text-[#001F3F] hover:border-[#001F3F]"
                    }`}
                >
                  {link.label}
                </button>

              ))}
            </nav>

            {/* Right side CTAs (visible on md+ screens) */}
            <div className="hidden md:!flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => scrollTo("contact")}
                className="text-sm font-semibold text-[#001F3F] hover:text-blue-800 transition"
              >
                Advertise
              </button>
              <button
                onClick={() => scrollTo("members")}
                className="bg-[#001F3F] text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-md hover:bg-blue-900 transition"
              >
                Join Free
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setMenuOpen((s) => !s)}
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile nav panel */}
          {menuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col gap-2">
                <button className="text-left px-3 py-2 text-sm font-semibold hover:bg-gray-50 rounded" onClick={() => scrollTo("shows")}>Shows</button>
                <button className="text-left px-3 py-2 text-sm font-semibold hover:bg-gray-50 rounded" onClick={() => scrollTo("radio")}>Public Episodes</button>
                <button className="text-left px-3 py-2 text-sm font-semibold hover:bg-gray-50 rounded" onClick={() => scrollTo("members")}>Members</button>
                <button className="text-left px-3 py-2 text-sm font-semibold hover:bg-gray-50 rounded" onClick={() => scrollTo("about")}>About</button>
                <button className="text-left px-3 py-2 text-sm font-semibold hover:bg-gray-50 rounded" onClick={() => scrollTo("contact")}>Contact</button>
                <div className="flex gap-3 px-3 pt-4">
                  <button onClick={() => scrollTo("contact")} className="flex-1 bg-[#001F3F] text-white rounded-lg py-2.5 font-semibold">Advertise</button>
                  <button onClick={() => scrollTo("members")} className="flex-1 border-2 border-[#001F3F] text-[#001F3F] rounded-lg py-2.5 font-semibold">Join Free</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative pt-20 min-h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"

          style={{ backgroundImage: `linear-gradient(rgba(0,31,63,0.75), rgba(0,31,63,0.85)),url(${heroBg})`, }}

          aria-hidden
        />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm mb-6 border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Founded 2025 • South Africa</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight mb-6">
              Your Business Growth,<br />
              <span className="text-gray-200">One Podcast at a Time</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
              Premium content, mentorship and networking for CEOs, founders and senior leaders—actionable episodes you can use today.
            </p>

            <div className="flex flex-row lg:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => scrollTo("contact")}
                className="bg-white text-[#001F3F] px-8 py-4 rounded-lg font-bold shadow-xl hover:bg-gray-100 transition-all transform hover:scale-105"
              >
                Enquire About Advertising
              </button>
              <button
                onClick={() => scrollTo("members")}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#001F3F] transition-all"
              >
                Become a Member (Free)
              </button>
            </div>

            {/* Key trust metrics */}
            <div className="flex flex-wrap justify-center gap-12 text-white">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-sm text-gray-300">High-value guests</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-sm text-gray-300">Episodes & growing</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">4</div>
                <div className="text-sm text-gray-300">Expert shows</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWS OVERVIEW */}
      <section id="shows" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#001F3F] mb-4">Our Shows</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Short, high-value series hosted by experienced presenters—tailored to business outcomes.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shows.map((s) => (
              <article key={s.id} className="group rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white">
                <div className="h-56 bg-gray-100 overflow-hidden">
                  <img src={s.img} alt={s.host} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-5">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">{s.host}</div>
                  <h3 className="text-lg font-bold text-[#001F3F] mb-3">{s.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{s.desc}</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => { setPublicTab(s.id); scrollTo('radio'); }}
                      className="flex-1 text-sm font-semibold text-[#001F3F] hover:bg-blue-50 py-2 rounded transition"
                    >
                      Listen
                    </button>
                    <button
                      onClick={() => { setMemberTab(s.id); scrollTo('members'); }}
                      className="text-sm font-medium border border-gray-300 px-3 py-2 rounded hover:border-[#001F3F] hover:text-[#001F3F] transition"
                    >
                      Members
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RADIO (Public) */}
      <section id="radio" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#001F3F] mb-2">Radio Shows — Public Access</h2>
              <p className="text-gray-600 text-lg">Select a show and listen to long-form episodes.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {shows.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setPublicTab(s.id)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${publicTab === s.id
                    ? "bg-[#001F3F] text-white shadow-lg"
                    : "bg-white border-2 border-gray-200 text-gray-700 hover:border-[#001F3F]"
                    }`}
                >
                  {s.title.replace("Show", "").trim()}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 lg:p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: large embed */}
              <div className="lg:col-span-2">
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg relative">
                  {shows.find(s => s.id === publicTab)?.videoType === 'facebook' ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <iframe
                        title="Public episode player"
                        className="w-full h-full"
                        src={currentEpisode[publicTab]?.videoUrl || shows.find(s => s.id === publicTab)?.episodes[0]?.videoUrl}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        scrolling="no"
                        style={{ border: 'none' }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
                    </div>
                  ) : (
                    <iframe
                      title="Public episode player"
                      className="w-full h-full"
                      src={currentEpisode[publicTab]?.videoUrl || shows.find(s => s.id === publicTab)?.episodes[0]?.videoUrl}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>

                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-[#001F3F]">{shows.find(s => s.id === publicTab)?.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-1">Hosted by {shows.find(s => s.id === publicTab)?.host}</p>
                  <p className="text-lg font-semibold text-[#001F3F] mb-3">
                    Episode {currentEpisode[publicTab]?.id || 1}: {currentEpisode[publicTab]?.title || shows.find(s => s.id === publicTab)?.episodes[0]?.title}
                  </p>
                  <p className="text-gray-700 leading-relaxed">{shows.find(s => s.id === publicTab)?.desc}</p>
                </div>
              </div>

              {/* Right: list of episodes */}
              <aside className="space-y-3">
                <h4 className="font-bold text-[#001F3F] mb-4">Episodes</h4>
                {shows.find(s => s.id === publicTab)?.episodes?.map((episode) => (
                  <div
                    key={episode.id}
                    onClick={() => setCurrentEpisode({ ...currentEpisode, [publicTab]: episode })}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition cursor-pointer group ${currentEpisode[publicTab]?.id === episode.id
                      ? 'border-[#001F3F] bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-[#001F3F] hover:shadow-md'
                      }`}
                  >
                    <div className={`w-16 h-12 rounded flex items-center justify-center flex-shrink-0 ${currentEpisode[publicTab]?.id === episode.id
                      ? 'bg-[#001F3F]'
                      : 'bg-gradient-to-br from-blue-900 to-gray-700'
                      }`}>
                      <Play className="w-5 h-5 text-white group-hover:scale-110 transition" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900 truncate">Episode {episode.id}</div>
                      <div className="text-xs text-gray-500 truncate">{episode.title}</div>
                    </div>
                  </div>
                ))}
                <div className="pt-4">
                  <button
                    onClick={() => scrollTo('contact')}
                    className="w-full bg-[#001F3F] text-white py-3 rounded-lg font-bold hover:bg-blue-900 transition shadow-md"
                  >
                    Enquire About Advertising
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERS (Gated content placeholder) */}
      <section id="members" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Award className="mx-auto text-[#001F3F] w-16 h-16 mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#001F3F] mb-4">Members Only Content</h2>
            <p className="text-gray-600 text-lg mb-8">Extended interviews, exclusive resources and behind-the-scenes content. Join our community for free.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => window.open('https://forms.gle/YOUR_GOOGLE_FORM', '_blank')}
                className="bg-[#001F3F] text-white px-8 py-4 rounded-lg font-bold shadow-xl hover:bg-blue-900 transition-all transform hover:scale-105"
              >
                Become a Member (Free)
              </button>
              <button
                onClick={() => setMemberTab('corporate')}
                className="border-2 border-[#001F3F] text-[#001F3F] px-8 py-4 rounded-lg font-bold hover:bg-[#001F3F] hover:text-white transition-all"
              >
                View Sample Content
              </button>
            </div>
          </div>

          {/* sample member video */}
          <div className="max-w-5xl mx-auto">
            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                title="Members sample"
                className="w-full h-full"
                src={shows.find(s => s.id === memberTab)?.youtube || shows[0].youtube}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#001F3F] mb-6">About Corp Radio</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Corp Radio is a premium business-focused platform providing content, insights, networking and mentorship for entrepreneurs, corporate leaders and NPOs.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Our mission is to empower business leaders with actionable knowledge, valuable connections, and a thriving community dedicated to growth and innovation.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-[#001F3F]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#001F3F] mb-1">Business Growth Strategies</h4>
                    <p className="text-sm text-gray-600">Proven tactics and insights for scaling your business</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-[#001F3F]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#001F3F] mb-1">Networking & Events</h4>
                    <p className="text-sm text-gray-600">Connect with like-minded leaders and professionals</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-[#001F3F]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#001F3F] mb-1">Expert Coaching</h4>
                    <p className="text-sm text-gray-600">Access to mentorship and exclusive resources</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollTo('contact')}
                  className="bg-[#001F3F] text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-900 transition"
                >
                  Get in Touch
                </button>
                <button
                  onClick={() => scrollTo('members')}
                  className="border-2 border-[#001F3F] text-[#001F3F] px-6 py-3 rounded-lg font-bold hover:bg-[#001F3F] hover:text-white transition"
                >
                  Join Community
                </button>
              </div>
            </div>

            <div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80&auto=format&fit=crop"
                  alt="Business team collaboration"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}

      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-[#001F3F] mb-4">Get in Touch</h3>
            <p className="text-gray-600 text-lg">Questions about advertising, partnerships or memberships? We'd love to hear from you.</p>
          </div>

          {/* Main Container wrapping both sides */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Info - LEFT SIDE */}
              <div className="flex flex-col space-y-6 h-full">
                <div className="bg-gradient-to-br from-[#001F3F] to-blue-900 p-8 rounded-2xl shadow-xl text-white flex-grow">
                  <h4 className="font-bold text-2xl mb-6">Contact Information</h4>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-200 mb-1">Phone</div>
                        <a href="tel:0612019633" className="font-semibold text-lg hover:text-gray-200 transition">061 201 9633</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-200 mb-1">Email</div>
                        <a href="mailto:info@corpradio.online" className="font-semibold text-lg hover:text-gray-200 transition break-all">info@corpradio.online</a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/20">
                    <div className="text-sm text-gray-200 mb-4">Follow Us on Social Media</div>
                    <div className="flex gap-3">
                      <a href="https://youtube.com/@corpradio" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition transform hover:scale-110">
                        <Youtube className="w-6 h-6" />
                      </a>
                      <a href="https://linkedin.com/company/corpradio" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition transform hover:scale-110">
                        <Linkedin className="w-6 h-6" />
                      </a>
                      <a href="https://instagram.com/corpradio" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition transform hover:scale-110">
                        <Instagram className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#001F3F] to-blue-900 p-6 rounded-xl border border-blue-100 shadow-md">
                  <h5 className="font-bold text-gray-200 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Business Hours
                  </h5>
                  <div className="space-y-2 text-sm text-gray-200">
                    <div className="flex justify-between items-center py-2 border-b border-white/20">
                      <span className="font-medium">Monday - Friday:</span>
                      <span className="font-semibold text-white">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/20">
                      <span className="font-medium">Saturday:</span>
                      <span className="font-semibold text-white">10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium">Sunday:</span>
                      <span className="font-semibold text-gray-400">Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form - RIGHT SIDE */}
              {/* Contact Form - RIGHT SIDE */}
              <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col h-full">
                <div className="flex-grow">
                  <h4 className="font-bold text-[#001F3F] mb-4 text-2xl">Send us a Message</h4>
                  <p className="text-gray-600 mb-4">Fill out the form below and we'll get back to you within 24 hours.</p>

                  {/* Success Message */}
                  {showSuccess && (
                    <div className="mb-4 p-4 bg-green-50 border-2 border-green-500 rounded-lg flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-bold text-green-800 mb-1">Message Sent Successfully!</h5>
                        <p className="text-sm text-green-700">We'll get back to you within 24 hours.</p>
                      </div>
                    </div>
                  )}

                  <form className="space-y-3" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={contact.name}
                        onChange={onChange}
                        placeholder="John Doe"
                        className={`w-full p-2 rounded-lg border-2 ${errors.name ? 'border-red-500' : 'border-gray-300'
                          } focus:border-[#001F3F] focus:ring-2 focus:ring-blue-100 outline-none transition`}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={contact.email}
                        onChange={onChange}
                        placeholder="john@company.com"
                        className={`w-full p-2 rounded-lg border-2 ${errors.email ? 'border-red-500' : 'border-gray-300'
                          } focus:border-[#001F3F] focus:ring-2 focus:ring-blue-100 outline-none transition`}
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        value={contact.subject}
                        onChange={onChange}
                        placeholder="Advertising Inquiry"
                        className={`w-full p-2 rounded-lg border-2 ${errors.subject ? 'border-red-500' : 'border-gray-300'
                          } focus:border-[#001F3F] focus:ring-2 focus:ring-blue-100 outline-none transition`}
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={contact.message}
                        onChange={onChange}
                        rows={3}
                        placeholder="Tell us about your inquiry..."
                        className={`w-full p-4 rounded-lg border-2 ${errors.message ? 'border-red-500' : 'border-gray-300'
                          } focus:border-[#001F3F] focus:ring-2 focus:ring-blue-100 outline-none transition`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#001F3F] text-white p-4 rounded-lg font-bold hover:bg-blue-900 transition shadow-lg flex items-center justify-center gap-2 group"
                    >
                      <span>Send Message</span>
                      <Mail className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      <span className="text-red-500">*</span> Required fields. We respect your privacy and will never share your information.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="bg-[#001F3F] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Radio className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg">Corp Radio</div>
                  <div className="text-xs text-gray-300">Founded 2025</div>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Empowering entrepreneurs and corporate professionals with actionable business knowledge.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => scrollTo('shows')} className="block text-gray-300 hover:text-white text-sm transition">Our Shows</button>
                <button onClick={() => scrollTo('radio')} className="block text-gray-300 hover:text-white text-sm transition">Public Episodes</button>
                <button onClick={() => scrollTo('members')} className="block text-gray-300 hover:text-white text-sm transition">Members Area</button>
                <button onClick={() => scrollTo('about')} className="block text-gray-300 hover:text-white text-sm transition">About Us</button>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Shows</h4>
              <div className="space-y-2">
                {shows.map((show) => (
                  <button
                    key={show.id}
                    onClick={() => scrollTo('shows')}
                    className="block text-gray-300 hover:text-white text-sm transition"
                  >
                    {show.title}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="space-y-3 text-sm">
                <p className="text-gray-300">061 201 9633</p>
                <p className="text-gray-300">info@corpradio.online</p>
                <div className="flex gap-3 pt-2">
                  <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-400">
                © 2025 Corp Radio. All rights reserved.
              </div>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
