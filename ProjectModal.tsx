import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { X, Trophy, Rocket, Sparkles, Image as ImageIcon, Calendar } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Stop body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      setActiveImageIdx(0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-brand-dark/50 backdrop-blur-md">
        {/* Backdrop clicks close modal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative bg-brand-beige w-full max-w-4xl rounded-3xl overflow-hidden shadow-warm-lg border border-brand-caramel/15 max-h-[90vh] flex flex-col z-10"
        >
          {/* Close Floating Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 bg-brand-white/80 hover:bg-brand-white text-brand-dark hover:text-brand-caramel transition-colors rounded-full border border-brand-caramel/10 shadow shadow-brand-caramel/5"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal scroll area */}
          <div className="overflow-y-auto flex-grow h-full">
            {/* Header banner image */}
            <div className="relative h-64 md:h-80 bg-brand-cream-light">
              <img
                src={project.coverUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-beige via-brand-beige/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="px-3.5 py-1 bg-brand-cream text-brand-caramel text-xs font-bold rounded-full border border-brand-caramel/20 uppercase tracking-wider">
                  {project.categoryLabel}
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-brand-dark mt-2 drop-shadow-sm font-sans">
                  {project.title}
                </h2>
                <p className="text-sm font-semibold text-brand-caramel tracking-wider uppercase mt-1">
                  {project.subtitle}
                </p>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 md:p-8 space-y-8">
              {/* Flex Grid layout for story and meta */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Story & Specific details */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-brand-caramel/70 mb-2 flex items-center gap-1.5 font-mono">
                      <Sparkles className="w-3.5 h-3.5 text-brand-caramel" />
                      About The Project / 專案簡介
                    </h4>
                    <p className="text-brand-dark/95 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
                      {project.description}
                    </p>
                  </div>

                  {project.details && (
                    <div className="p-5 bg-white rounded-2xl border border-brand-caramel/5 shadow-inner">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brand-caramel/70 mb-2.5 font-mono">
                        Planning Insights / 企劃巧思
                      </h4>
                      <p className="text-brand-dark/80 text-sm leading-relaxed">
                        {project.details}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Side: Metadata box */}
                <div className="bg-brand-cream-light border border-brand-caramel/10 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <h4 className="font-sans text-sm font-bold text-brand-caramel border-b border-brand-caramel/10 pb-2">
                      Project Specs / 專案規格
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-brand-caramel/60 uppercase font-bold flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Date / 策劃日期
                        </div>
                        <div className="text-sm font-semibold text-brand-dark mt-0.5">{project.date}</div>
                      </div>
                      <div>
                        <div className="text-xs text-brand-caramel/60 uppercase font-bold flex items-center gap-1">
                          <Rocket className="w-3 h-3" />
                          Category / 核心分類
                        </div>
                        <div className="text-sm font-semibold text-brand-dark mt-0.5">{project.categoryLabel}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-brand-caramel/80 uppercase font-bold mb-2">專案標籤</div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs px-2.5 py-1 bg-white hover:bg-brand-cream text-brand-dark rounded-full border border-brand-caramel/10 transition-colors">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements Column */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-brand-caramel/10 space-y-4 shadow-warm-sm">
                <h4 className="text-lg font-bold text-brand-dark flex items-center gap-2 border-b border-brand-beige pb-3">
                  <Trophy className="w-5 h-5 text-amber-500 fill-amber-500/20" />
                  Key Achievements / 亮眼成果
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {project.keyAchievements.map((achievement, idx) => {
                    const parts = achievement.split('（');
                    const highlighted = parts[0];
                    const tail = parts[1] ? `（${parts[1]}` : '';
                    
                    return (
                      <div key={idx} className="p-4 bg-brand-beige/40 rounded-xl border border-brand-caramel/5 flex flex-col justify-start">
                        <div className="text-brand-caramel font-bold text-3xl font-mono mb-2">0{idx + 1}</div>
                        <p className="text-sm text-brand-dark/90 leading-relaxed font-normal">
                          <span className="font-semibold text-brand-dark">{highlighted}</span>
                          {tail}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Visual Gallery Showcase */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-brand-dark flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-brand-caramel" />
                    Project Gallery / 現場與設計特典集錦
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Main Focus Image (displays selection or first index) */}
                    <div className="md:col-span-2 rounded-2xl h-96 overflow-hidden border border-brand-caramel/10 relative shadow-inner">
                      <img
                        src={project.gallery[activeImageIdx]?.url}
                        alt="Active zoom view"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/30 to-transparent p-4 text-white">
                        <p className="text-sm font-semibold">{project.gallery[activeImageIdx]?.caption}</p>
                      </div>
                    </div>

                    {/* Thumbnail click Selector */}
                    <div className="grid grid-cols-3 md:grid-cols-1 gap-2.5 md:h-96 md:overflow-y-auto pr-1">
                      {project.gallery.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => setActiveImageIdx(index)}
                          className={`relative cursor-pointer rounded-xl h-24 overflow-hidden border-2 transition-all ${
                            activeImageIdx === index
                              ? 'border-brand-caramel ring-2 ring-brand-cream ring-offset-2'
                              : 'border-brand-caramel/15 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={item.url}
                            alt="thumb"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
