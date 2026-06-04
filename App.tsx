import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  Heart, 
  Sparkles, 
  Mail, 
  Send, 
  BadgePercent, 
  Users, 
  BookOpen, 
  Image as ImageIcon, 
  FolderHeart, 
  Compass, 
  ExternalLink, 
  ChevronRight, 
  UtensilsCrossed, 
  Calendar, 
  Flame,
  MousePointerClick
} from 'lucide-react';

import { ABOUT_STORY, PROJECTS, JOURNAL_ENTRIES, GALLERY_ITEMS, CONCEPT_PROJECT } from './data';
import { Project, JournalEntry, GalleryItem } from './types';

// Import components
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import JournalModal from './components/JournalModal';
import InteractiveBoard from './components/InteractiveBoard';

export default function App() {
  // Navigation active identifier based on scrolling position
  const [activeSection, setActiveSection] = useState('home');
  
  // Projects filtering state
  const [projectFilter, setProjectFilter] = useState<'all' | 'fandom' | 'community' | 'design'>('all');
  
  // Gallery filtering state
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'events' | 'merch' | 'displays' | 'moments'>('all');
  
  // Modal states for details
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedJournal, setSelectedJournal] = useState<JournalEntry | null>(null);
  
  // Full screen zoom lightbox for gallery
  const [zoomedGalleryItem, setZoomedGalleryItem] = useState<GalleryItem | null>(null);

  // Quote state
  const [currentQuote, setCurrentQuote] = useState('「用熱愛調配靈感，將每一次心動，化作溫存身邊的歲月收藏。」');
  const [isQuoteFading, setIsQuoteFading] = useState(false);

  const quotes = [
    '「用熱愛調配靈感，將每一次心動，化作溫存身邊的歲月收藏。」',
    '「讓喜歡的狂熱，變成帶有手感溫度的治癒力量。」',
    '「生活就像一碗香氣四溢的焦糖烤布丁，底層永遠藏著驚喜。」',
    '「在 fandom 文化的溫柔風暴中，人與人的情感連結才是最絢麗的奇蹟。」',
    '「細節是企劃的靈魂，而對同好的同理心，則是通往完美的指南針。」'
  ];

  const rollQuote = () => {
    setIsQuoteFading(true);
    setTimeout(() => {
      const currentIdx = quotes.indexOf(currentQuote);
      const nextIdx = (currentIdx + 1) % quotes.length;
      setCurrentQuote(quotes[nextIdx]);
      setIsQuoteFading(false);
    }, 300);
  };

  // Add scroll listener for active section indicator
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'journal', 'gallery', 'future-concept', 'guestbook', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = projectFilter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === projectFilter);

  const filteredGallery = galleryFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === galleryFilter);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-beige selection:bg-brand-cream selection:text-brand-dark overflow-x-hidden">
      
      {/* 1. Warm Top Decorative Banner */}
      <div className="w-full h-2.5 bg-gradient-to-r from-brand-cream via-brand-caramel to-brand-cream z-50 sticky top-0" />

      {/* 2. Floating Navbar Head */}
      <header className="sticky top-2.5 z-40 w-full transition-all duration-300 px-4 md:px-8">
        <div className="max-w-7xl mx-auto mt-4 px-5 py-3.5 md:py-4 bg-brand-white/80 backdrop-blur-md rounded-2xl border border-brand-caramel/10 shadow-warm-sm flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-cream flex items-center justify-center font-bold text-brand-caramel shadow-sm border border-brand-caramel/15 animate-cute-float text-sm">
              🍮
            </div>
            <div>
              <span className="font-extrabold text-brand-dark tracking-tight hover:text-brand-caramel transition-colors text-sm md:text-md">
                Purin Experience Lab
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-mono tracking-widest text-[var(--color-brand-caramel)] bg-brand-cream/40 px-2 py-0.5 rounded-full border border-brand-caramel/10 font-bold">
                布丁體驗實驗室
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-dark/70">
            {[
              { id: 'home', label: '首頁 / Hover' },
              { id: 'about', label: '品牌故事 / About' },
              { id: 'projects', label: '作品集 / Portfolio' },
              { id: 'journal', label: '分享誌 / Journal' },
              { id: 'gallery', label: '藝廊 / Gallery' },
              { id: 'future-concept', label: '未來企劃 / Concept' },
              { id: 'guestbook', label: '應援牆 / Guestbook' },
              { id: 'contact', label: '聯絡我 / Contact' },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                  activeSection === link.id
                    ? 'bg-brand-caramel text-brand-white shadow'
                    : 'hover:bg-brand-caramel-light/60 hover:text-brand-dark'
                }`}
              >
                {link.label.split(' / ')[0]}
              </a>
            ))}
          </nav>

          {/* Threads/Email Mini Social Link */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.threads.net/@qianrouxia"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-brand-beige hover:bg-brand-cream text-brand-caramel rounded-full transition-colors border border-brand-caramel/10"
              title="Threads"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="hidden md:flex items-center gap-1.5 py-1.5 px-3.5 bg-brand-cream hover:bg-brand-cream/80 text-brand-caramel border border-brand-caramel/20 text-xs font-bold rounded-lg transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>合作聯絡</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. HERO BANNER SECTION */}
      <section id="home" className="relative min-h-[90vh] md:min-h-screen py-16 md:py-24 flex items-center justify-center px-4 md:px-8">
        
        {/* Ambient Cute Background Orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-cream/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-caramel-light/40 rounded-full blur-3xl pointer-events-none" />
        
        {/* Floating character-inspired subtle details (non-copyrighted dog-paw/star hints) */}
        <div className="absolute top-1/4 right-1/4 text-brand-cream animate-cute-float text-3xl select-none opacity-40">✨</div>
        <div className="absolute bottom-1/4 left-1/5 text-brand-caramel animate-cute-float text-2xl select-none opacity-40">🐾</div>
        <div className="absolute top-1/3 left-10 text-brand-caramel/20 text-7xl font-sans font-extrabold select-none pointer-events-none tracking-widest hidden md:block uppercase font-mono">
          PURIN EXPERIENCE
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero Left Intro */}
          <div className="lg:col-span-7 space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Cute Greeting tag */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white text-brand-caramel text-xs font-bold rounded-full border border-brand-caramel/15 shadow-sm"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-brand-cream border border-brand-caramel/40 animate-pulse" />
              <span>Purin Experience Lab / 粉絲企劃工作室</span>
            </motion.div>

            {/* Giant Display Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <span className="block font-mono text-xs uppercase tracking-[0.3em] text-brand-caramel font-extrabold">
                Creating Memorable Fan Experiences
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-brand-dark leading-tight select-none">
                Purin Experience <br />
                <span className="text-brand-caramel relative">
                  Lab
                  <span className="absolute left-0 bottom-1 md:bottom-2 w-full h-[6px] bg-brand-cream -z-10 rounded" />
                </span>
              </h1>
              
              <p className="text-lg md:text-2xl font-bold font-sans text-brand-dark/90 leading-normal pt-2">
                把每一次喜歡，都變成值得收藏的回憶。
              </p>
            </motion.div>

            {/* Sub-headline detailed */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm md:text-base text-brand-dark/70 leading-relaxed max-w-xl font-normal"
            >
              我們相信，社群經營、可愛角色與精心策劃的應援體驗，是串聯彼此最美的鑰匙。這裡致力於將熱狂的情感，「打包成精緻又可愛的應援周邊，或是精心落地的概念空間。」
            </motion.p>

            {/* Interactive Dynamic Quotes Board */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={rollQuote}
              className="p-4 bg-white/70 border border-brand-caramel/10 rounded-2xl max-w-lg cursor-pointer hover:bg-white hover:border-brand-caramel/25 transition-all shadow-warm-sm group flex items-start gap-3"
            >
              <span className="text-xl">💡</span>
              <div className="space-y-1">
                <p className={`text-xs italic font-semibold text-brand-caramel transition-opacity duration-300 ${isQuoteFading ? 'opacity-0' : 'opacity-100'}`}>
                  {currentQuote}
                </p>
                <div className="flex items-center gap-1 text-[10px] font-mono text-brand-dark/40 font-bold uppercase tracking-wider mt-1 group-hover:text-brand-caramel transition-colors">
                  <MousePointerClick className="w-3.5 h-3.5" />
                  點選點亮靈感 / Click to refresh
                </div>
              </div>
            </motion.div>

            {/* Call To Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-3 w-full justify-center lg:justify-start"
            >
              <a 
                href="#projects" 
                className="py-3.5 px-7 bg-brand-caramel hover:bg-brand-caramel/90 text-brand-beige font-extrabold text-sm rounded-xl border border-brand-caramel shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
              >
                <FolderHeart className="w-4 h-4" />
                瀏覽企劃案例 / View Projects
              </a>
              <a 
                href="#journal" 
                className="py-3.5 px-6 bg-white hover:bg-brand-cream/30 text-brand-dark font-extrabold text-sm rounded-xl border border-brand-caramel/20 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <BookOpen className="w-4 h-4 text-brand-caramel" />
                探索靈感誌 / Explore Journal
              </a>
            </motion.div>
          </div>

          {/* Hero Right Decorative Polaroid Display cards */}
          <div className="lg:col-span-5 flex justify-center relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-[360px] md:max-w-[400px] bg-white p-5 rounded-3xl shadow-warm-lg border border-brand-caramel/10 rotate-2 hover:rotate-0 transition-transform duration-500"
            >
              {/* Photo Area with yellow background aesthetic placeholder */}
              <div className="relative h-64 md:h-80 bg-brand-cream-light rounded-2xl overflow-hidden border border-brand-caramel/5">
                <img 
                  src="https://i.ibb.co/wZLt1Xy7/IMG-7980.png"
                  alt="Cozy Coffee sleeve craft"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none"
                />
                
                {/* Overlay Badge */}
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.2 px-3 py-1 bg-brand-cream/95 text-brand-caramel text-[10px] font-extrabold uppercase rounded-full border border-brand-caramel/20">
                  <Coffee className="w-3.5 h-3.5" />
                  Cute but Cafe Aesthetic
                </span>
              </div>

              {/* Card Footer resembling a paper souvenir sleeve list */}
              <div className="pt-6 space-y-4">
                <div className="flex justify-between items-start border-b border-brand-beige pb-3">
                  <div>
                    <h3 className="font-sans font-bold text-brand-dark text-lg leading-tight">
                      Experience Design
                    </h3>
                    <p className="text-xs uppercase font-mono tracking-wider text-brand-caramel/80 font-bold mt-0.5">
                      Purin Lab Portfolio
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-brand-caramel font-bold px-2.5 py-1 bg-brand-beige rounded-md">
                      EST. 2026
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <div className="grid grid-cols-2 gap-3 text-xs font-bold text-brand-dark/80">
                  <div className="flex items-center gap-1.5">
                    <span className="text-brand-caramel">🐾</span> K-pop 應援
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-brand-caramel">🍮</span> 布丁社群經營
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-brand-caramel">✨</span> 品牌特典周邊
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-brand-caramel">☕</span> 體驗與策展規劃
                  </div>
                </div>
              </div>

              {/* Tiny Pompompurin inspired ribbon sticker decor (simulated color bar on top) */}
              <div className="absolute -top-3 left-10 py-1.5 px-6 bg-brand-cream text-brand-caramel border-x border-b border-brand-caramel/20 rounded-b-xl text-[10px] font-bold uppercase tracking-widest shadow-sm">
                💛 Handcrafted
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 4. ABOUT ME SECTION */}
      <section id="about" className="py-24 bg-white/70 relative border-y border-brand-caramel/5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column / Brand story card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[360px] bg-brand-beige rounded-3xl p-5 border border-brand-caramel/10 shadow-warm-md">
                
                {/* Round Profile Silhouette Photo-card */}
                <div className="w-full aspect-square rounded-2xl bg-brand-cream-light border border-brand-caramel/10 overflow-hidden relative flex items-center justify-center">
                  <div className="absolute top-2 right-2 px-3 py-1 bg-brand-caramel text-brand-beige text-[10px] font-bold rounded-lg border border-brand-caramel">
                    Designer Profile
                  </div>
                  {/* Decorative soft yellow hand-painted styled portrait or nice stock profile desk image */}
                  <img 
                    src="https://i.ibb.co/SDzpxT2W/IMG-4015.jpg" 
                    alt="千媃 Zooey"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-95"
                  />
                  {/* Floating badge details */}
                  <div className="absolute bottom-3 inset-x-3 bg-brand-white/95 border border-brand-caramel/15 p-3 rounded-xl shadow flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-brand-dark">千媃 Zooey</p>
                      <p className="text-[10px] text-brand-caramel/80 font-bold uppercase">Experience Planner</p>
                    </div>
                    <span className="text-xl select-none">🐾</span>
                  </div>
                </div>

                <div className="mt-5 space-y-3.5">
                  <div className="flex items-center gap-2 text-xs border-b border-brand-caramel/10 pb-2">
                    <span className="font-bold text-brand-caramel">定位：</span>
                    <span className="text-brand-dark font-medium">探索愛好、角色 IP 與體驗的中介人</span>
                  </div>
                  
                  <div className="space-y-2 text-xs text-brand-dark/80">
                    <p className="font-bold text-[10px] uppercase font-mono tracking-wider text-brand-caramel/60">個人成就標籤 / Quick facts</p>
                    <ul className="space-y-1.5 pl-1">
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-caramel" />
                        經營萬同好布丁社群圈仔
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-caramel" />
                        精通各種特種印刷工藝應用
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-caramel" />
                        2年韓團咖啡廳線下策劃主力
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Story & Skills Column */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-brand-beige border border-brand-caramel/15 text-[11px] font-extrabold uppercase tracking-widest text-brand-caramel rounded-full mb-3 shadow-inner">
                  <Compass className="w-3.5 h-3.5" />
                  About Me / 關於我
                </span>
                
                <h2 className="text-3xl md:text-5xl font-black text-brand-dark leading-tight mt-1">
                  我是千媃 <span className="text-brand-caramel">Zooey</span>
                </h2>
                
                {/* Introduction statement */}
                <p className="text-lg md:text-xl font-bold font-sans text-brand-dark/90 leading-relaxed mt-3 border-l-4 border-brand-cream pl-4 py-1 bg-brand-cream-light/30">
                  {ABOUT_STORY.intro}
                </p>
              </div>

              {/* Brand story in markdown paragraphs format nicely parsed */}
              <div className="space-y-4 text-sm md:text-base text-brand-dark/80 leading-relaxed font-normal">
                {ABOUT_STORY.storyMarkdown.split('\n\n').map((para, idx) => (
                  <p key={idx} className="whitespace-pre-line leading-relaxed">
                    {para.includes('**') ? (
                      <>
                        {para.split('**').map((chunk, cIdx) => (
                          cIdx % 2 === 1 ? <strong key={cIdx} className="text-brand-caramel font-bold">{chunk}</strong> : chunk
                        ))}
                      </>
                    ) : para}
                  </p>
                ))}
              </div>

              {/* Core design values section list */}
              <div className="border-t border-brand-beige pt-6 space-y-4">
                <h4 className="text-xs uppercase font-mono font-extrabold tracking-widest text-brand-caramel/80">
                  Core Skills & Capabilities / 專業技能
                </h4>
                
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { label: 'Event Planning (活動企劃與執行)', icon: '☕' },
                    { label: 'Community Management (社群粉絲經營)', icon: '🍮' },
                    { label: 'Creative Marketing (創意與品牌行銷)', icon: '✨' },
                    { label: 'Visual Communication (平面與包裝視覺設計)', icon: '🎨' },
                    { label: 'Fan Experience Design (同好情感體驗)', icon: '🐾' },
                    { label: 'Social Media Content Planning (社群內容企劃)', icon: '📱' },
                  ].map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-brand-beige hover:bg-brand-cream text-brand-dark text-xs font-bold rounded-2xl border border-brand-caramel/10 shadow-warm-sm transition-all hover:scale-[1.03]"
                    >
                      <span>{skill.icon}</span>
                      <span>{skill.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS SECTION */}
      <section id="projects" className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-brand-caramel text-xs font-bold rounded-full border border-brand-caramel/15 shadow-sm">
            <FolderHeart className="w-3.5 h-3.5" />
            Featured Projects
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-brand-dark font-sans leading-none">
            我的企劃作品集
          </h2>
          <p className="text-xs md:text-sm text-brand-dark/70 leading-relaxed font-normal">
            融合粉絲應援體驗、社群熱潮經營、以及高質感視覺周邊製品，展現如何將「熱愛」導流至實體策展落地。
          </p>

          {/* Filtering control sliders */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: '全部 / All' },
              { id: 'fandom', label: '應援企劃 / Event' },
              { id: 'community', label: '社群經營 / Social' },
              { id: 'design', label: '周邊設計 / Design' },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setProjectFilter(filter.id as any)}
                className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all cursor-pointer ${
                  projectFilter === filter.id
                    ? 'bg-brand-caramel text-brand-white border-brand-caramel shadow-sm'
                    : 'bg-white text-brand-dark border-brand-caramel/10 hover:bg-brand-beige'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project grid layouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </section>

      {/* 6. COMMUNITY JOURNAL / BLOG SECTION */}
      <section id="journal" className="py-24 bg-white/50 border-y border-brand-caramel/5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between border-b border-brand-beige pb-6 gap-6 mb-12">
            <div className="space-y-3 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-cream/40 text-brand-caramel text-xs font-bold rounded-full border border-brand-caramel/10 shadow-inner">
                <BookOpen className="w-3.5 h-3.5" />
                Fan Journal / 靈感觀測誌
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-dark font-sans leading-none">
                粉絲文化與 IP 行銷觀察
              </h2>
              <p className="text-xs md:text-sm text-brand-dark/70 font-normal">
                分享關於 K-pop 應援現場的策劃心法、三麗鷗角色經營趨勢與粉絲社群的觀察散記。
              </p>
            </div>
            
            <span className="text-xs font-mono text-brand-caramel font-bold px-3 py-1.5 bg-brand-white rounded-lg border border-brand-caramel/10 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
              持續更新中 / Updated Monthly
            </span>
          </div>

          {/* Blogs Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {JOURNAL_ENTRIES.map((entry) => (
              <motion.article 
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl overflow-hidden shadow-warm-sm hover:shadow-warm-md border border-brand-caramel/10 flex flex-col justify-between h-full group cursor-pointer"
                onClick={() => setSelectedJournal(entry)}
              >
                <div>
                  {/* Photo cover preview */}
                  <div className="h-40 overflow-hidden relative bg-brand-beige">
                    <img 
                      src={entry.coverUrl} 
                      alt={entry.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-brand-white/90 text-brand-caramel text-[10px] font-bold rounded-md">
                      {entry.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] text-brand-caramel/80 font-bold font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {entry.date}
                    </div>
                    
                    <h3 className="font-bold text-sm md:text-md text-brand-dark line-clamp-2 leading-snug group-hover:text-brand-caramel transition-colors">
                      {entry.title}
                    </h3>
                    
                    <p className="text-xs text-brand-dark/70 line-clamp-3 leading-relaxed font-normal pt-1.5">
                      {entry.summary}
                    </p>
                  </div>
                </div>

                {/* Footer read item */}
                <div className="p-5 border-t border-brand-beige pt-3 flex items-center justify-between text-[11px] font-semibold text-brand-caramel">
                  <span>{entry.readTime} 閱讀完畢</span>
                  <div className="flex items-center gap-0.5 group-hover:text-brand-dark transition-all">
                    <span>點擊朗讀</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>

      {/* 7. PINTEREST-STYLE PHOTO GALLERY */}
      <section id="gallery" className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
        
        {/* Gallery Headers */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-brand-caramel text-xs font-bold rounded-full border border-brand-caramel/15 shadow-sm">
            <ImageIcon className="w-3.5 h-3.5" />
            Pinterest Grid Gallery
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-brand-dark font-sans leading-none">
            應援日常藝廊
          </h2>
          <p className="text-xs md:text-sm text-brand-dark/70 font-normal leading-relaxed">
            精心設計特典與應咖實體現場陳列
          </p>
        </div>

        {/* Masonry Columns layouts of images */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filteredGallery.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`gallery-item-${item.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setZoomedGalleryItem(item)}
              className="break-inside-avoid relative rounded-2xl overflow-hidden border border-brand-caramel/10 cursor-pointer shadow-warm-sm hover:shadow-warm-md bg-white p-2"
            >
              {/* Photo */}
              <div className="relative rounded-xl overflow-hidden h-fit">
                <img
                  src={item.url}
                  alt="Gallery Image"
                  referrerPolicy="no-referrer"
                  className="w-full object-cover max-h-96"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. FUTURE PROJECT CONCEPT: PURIN CAFÉ CONCEPT */}
      <section id="future-concept" className="py-24 bg-brand-cream-light border-y border-brand-caramel/5 relative px-4 md:px-8">
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-4 text-3xl opacity-35 animate-cute-float">🐾</div>
        <div className="absolute top-20 right-10 text-4xl opacity-35 animate-cute-float">🍮</div>

        <div className="max-w-7xl mx-auto w-full">
          {/* Header titles */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-brand-caramel text-xs font-bold rounded-full border border-brand-caramel/15 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Future Proposal / 未來藍圖
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark font-sans leading-none flex items-center justify-center gap-2">
              <UtensilsCrossed className="w-8 h-8 text-brand-caramel" />
              Purin Café Concept
            </h2>
            <p className="text-xs md:text-sm text-brand-dark/75 font-normal max-w-lg mx-auto">
              此為一個以經典 IP 與應援同好文化為核心的概念咖啡廳企劃。透過空間氛圍、主題餐飲與實體周邊，實現心靈與味蕾的實體治癒。
            </p>
            <span className="inline-block px-3 py-1 bg-brand-cream text-brand-caramel text-[11px] font-extrabold uppercase rounded border border-brand-caramel/25 shadow-sm tracking-widest font-mono">
              ★ Concept Project / 概念企劃項目 (非營利商業)
            </span>
          </div>

          {/* Bento grid-like items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONCEPT_PROJECT.map((concept, idx) => (
              <motion.div
                key={concept.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl p-5 border border-brand-caramel/10 shadow-warm-sm flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Photo Concept cover and design badge */}
                  <div className="h-44 rounded-2xl overflow-hidden relative mb-4 bg-brand-beige">
                    <img 
                      src={concept.imageUrl} 
                      alt={concept.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-95"
                    />
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-brand-white/95 text-brand-caramel font-bold text-[10px] rounded-md border border-brand-caramel/10">
                      {concept.badge}
                    </span>
                    <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-brand-cream border border-brand-caramel/20 flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="space-y-1">
                    <h3 className="font-sans font-bold text-md text-brand-dark">
                      {concept.title}
                    </h3>
                    <p className="text-xs uppercase font-mono tracking-widest text-brand-caramel/80 font-bold border-b border-brand-beige pb-2">
                      {concept.subtitle}
                    </p>
                    <p className="text-xs leading-relaxed text-brand-dark/70 font-normal pt-2">
                      {concept.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-brand-beige text-[10px] text-brand-caramel/60 font-bold uppercase font-mono tracking-wider">
                  ✦ Purin Lab Idea Box
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. GUEST WALL SECTION - GUESTBOOK INJECTION */}
      <section id="guestbook" className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <InteractiveBoard />
      </section>

      {/* 10. CONTACT ME SECTION */}
      <section id="contact" className="py-24 bg-white/70 border-t border-brand-caramel/10 relative px-4 md:px-8">
        
        {/* Decor background yellow shape */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-brand-cream/10 rounded-br-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-beige border border-brand-caramel/15 text-xs font-bold text-brand-caramel rounded-full">
              🐾 Get In Touch! / 聯絡千媃
            </span>
            
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark leading-tight font-sans">
              Let’s create meaningful <br className="hidden sm:inline" />
              fan experiences <span className="text-brand-caramel">together.</span>
            </h2>
            
            <p className="text-lg md:text-xl font-bold font-sans text-brand-dark/95">
              讓我們一起，把對角色的喜歡和粉絲的心意，調配成實體驚喜！
            </p>
            
            <p className="text-sm text-brand-dark/60 max-w-xl mx-auto font-normal leading-relaxed">
              不論您是咖啡廳品牌代表、尋求異業角色行銷的 IP 品牌方、社群經營合夥，還是單純喜愛三麗鷗與布丁狗的同好小夥伴，都非常歡迎隨時來信或社群互動，激發無限大靈感！
            </p>
          </div>

          {/* Contact Cards Grid Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Email link box */}
            <a
              href={`mailto:${ABOUT_STORY.email}`}
              className="bg-brand-beige/50 hover:bg-brand-cream/30 p-6 rounded-2xl border border-brand-caramel/20 flex flex-col items-center justify-between group transition-all text-center"
            >
              <div className="w-12 h-12 rounded-full bg-brand-cream text-brand-caramel flex items-center justify-center font-bold text-xl shadow mb-4">
                📧
              </div>
              <div className="space-y-1 pb-4">
                <span className="text-[10px] uppercase font-bold text-brand-caramel/70 font-mono tracking-widest block">Direct Mail / 來信洽談</span>
                <p className="text-sm font-bold text-brand-dark select-all">{ABOUT_STORY.email}</p>
              </div>
              <span className="text-xs font-bold text-brand-caramel group-hover:underline flex items-center gap-1 mt-auto">
                點擊此處寄信 / Send Email <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* Threads link box */}
            <a
              href={ABOUT_STORY.threadsUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-brand-beige/50 hover:bg-brand-cream/30 p-6 rounded-2xl border border-brand-caramel/20 flex flex-col items-center justify-between group transition-all text-center"
            >
              <div className="w-12 h-12 rounded-full bg-brand-cream text-brand-caramel flex items-center justify-center font-bold text-xl shadow mb-4">
                💬
              </div>
              <div className="space-y-1 pb-4">
                <span className="text-[10px] uppercase font-bold text-brand-caramel/70 font-mono tracking-widest block">Threads / 社群互動</span>
                <p className="text-sm font-bold text-brand-dark font-sans">@qianrouxia</p>
              </div>
              <span className="text-xs font-bold text-brand-caramel group-hover:underline flex items-center gap-1 mt-auto">
                前去追蹤動態 / Follow Threads <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>

          {/* Floating cute signature sticker line */}
          <div className="pt-6">
            <span className="inline-block px-4 py-2 bg-brand-cream-light border border-dashed border-brand-caramel/30 text-xs font-semibold text-brand-caramel rounded-xl animate-cute-float max-w-sm">
              💛 每一封來信與留言人都會在 24 小時內收到溫暖回覆！🐾
            </span>
          </div>

        </div>
      </section>

      {/* 11. GENERAL FOOTER SECTION */}
      <footer className="bg-brand-dark text-brand-beige/90 py-12 border-t-2 border-brand-caramel px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-b border-brand-beige/10 pb-8">
          
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-xl">🍮</span>
              <span className="font-extrabold text-white text-md tracking-wider uppercase font-sans">
                Purin Experience Lab
              </span>
            </div>
            <p className="text-xs text-brand-beige/60 max-w-xs font-normal">
              以愛意、策展與角色 IP 為化學反應，為每一份對品牌的喜歡打造值得珍藏的回憶。
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold uppercase tracking-wider">
            <a href="#about" className="hover:text-brand-cream transition-colors">關於我</a>
            <a href="#projects" className="hover:text-brand-cream transition-colors">作品集</a>
            <a href="#journal" className="hover:text-brand-cream transition-colors">靈感誌</a>
            <a href="#gallery" className="hover:text-brand-cream transition-colors">應援藝廊</a>
            <a href="#future-concept" className="hover:text-brand-cream transition-colors">概念店</a>
          </nav>

        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-brand-beige/40">
          <p>© 2026 Purin Experience Lab.</p>
          <div className="flex items-center gap-4">
            <span>Powered by Zooey & Gemini</span>
            <span className="flex items-center gap-1 font-semibold text-brand-cream">
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              布丁狗愛好同好會支援
            </span>
          </div>
        </div>
      </footer>

      {/* 12. DYNAMIC SLIDER MODALS INJECTION & LIGHTBOXES */}
      <InteractiveBoardModalHolder 
        selectedProject={selectedProject}
        onCloseProject={() => setSelectedProject(null)}
        selectedJournal={selectedJournal}
        onCloseJournal={() => setSelectedJournal(null)}
      />

      {/* Lightbox for Zoomed Gallery Item */}
      <AnimatePresence>
        {zoomedGalleryItem && (
          <div className="fixed inset-0 bg-brand-dark/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={() => setZoomedGalleryItem(null)}
            />
            
            {/* Modal Image block */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full text-center z-10 flex flex-col justify-center items-center"
            >
              {/* Image box */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-brand-cream border-opacity-50 max-h-[80vh] flex items-center justify-center bg-transparent shadow-2xl">
                <img
                  src={zoomedGalleryItem.url}
                  alt="Zoomed Image"
                  referrerPolicy="no-referrer"
                  className="max-h-[75vh] object-contain w-full"
                />
              </div>

              {/* Simple Close Button */}
              <button
                onClick={() => setZoomedGalleryItem(null)}
                className="mt-4 px-5 py-2.5 rounded-full bg-brand-white text-brand-dark hover:bg-brand-caramel hover:text-brand-white transition-all text-xs font-bold shadow-md cursor-pointer"
              >
                關閉預覽 / Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

/**
 * Clean wrapper component to manage details portals beautifully 
 */
function InteractiveBoardModalHolder({ 
  selectedProject, 
  onCloseProject, 
  selectedJournal, 
  onCloseJournal 
}: {
  selectedProject: Project | null;
  onCloseProject: () => void;
  selectedJournal: JournalEntry | null;
  onCloseJournal: () => void;
}) {
  return (
    <>
      <ProjectModal project={selectedProject} onClose={onCloseProject} />
      <JournalModal entry={selectedJournal} onClose={onCloseJournal} />
    </>
  );
}
