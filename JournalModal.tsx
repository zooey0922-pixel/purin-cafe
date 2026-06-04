import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { JournalEntry } from '../types';
import { X, Calendar, BookOpen, Bookmark } from 'lucide-react';

interface JournalModalProps {
  entry: JournalEntry | null;
  onClose: () => void;
}

export default function JournalModal({ entry, onClose }: JournalModalProps) {
  // Disable body scroll when modal is active
  useEffect(() => {
    if (entry) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [entry]);

  if (!entry) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-brand-dark/50 backdrop-blur-md">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative bg-brand-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-warm-lg border border-brand-caramel/15 max-h-[85vh] flex flex-col z-10"
        >
          {/* Close Action */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 bg-brand-white/90 hover:bg-brand-white text-brand-dark hover:text-brand-caramel transition-colors rounded-full border border-brand-caramel/10 shadow"
            aria-label="Close reader"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Reader Area */}
          <div className="overflow-y-auto flex-grow h-full">
            {/* Entry Hero Top Cover */}
            <div className="relative h-60 bg-brand-cream-light">
              <img
                src={entry.coverUrl}
                alt={entry.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-white via-brand-white/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-3 py-1 bg-brand-cream hover:bg-brand-cream/80 text-brand-caramel text-xs font-bold rounded-full border border-brand-caramel/20">
                  {entry.category}
                </span>
              </div>
            </div>

            {/* Core Body Container */}
            <div className="p-6 md:p-10 space-y-6">
              {/* Journal Title */}
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-brand-dark font-sans leading-snug">
                  {entry.title}
                </h2>
                
                {/* Meta details bar */}
                <div className="flex items-center gap-6 text-xs text-brand-caramel/80 font-semibold border-b border-brand-beige pb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{entry.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>{entry.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bookmark className="w-4 h-4" />
                    <span>{entry.category}</span>
                  </div>
                </div>
              </div>

              {/* Parsed Custom Article Content */}
              <div className="text-brand-dark/95 leading-relaxed text-sm md:text-base space-y-6 font-normal">
                {entry.content.split('\n\n').map((paragraph, pIdx) => {
                  const trimmed = paragraph.trim();
                  
                  // Check headings
                  if (trimmed.startsWith('###')) {
                    return (
                      <h4 key={pIdx} className="text-lg md:text-xl font-bold text-brand-caramel pt-4 pb-1 border-b border-brand-beige">
                        {trimmed.replace('###', '').trim()}
                      </h4>
                    );
                  }
                  
                  // Check bullet lists
                  if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
                    const listItems = trimmed.split('\n');
                    return (
                      <ul key={pIdx} className="list-disc pl-5 space-y-2 text-brand-dark/90 py-2">
                        {listItems.map((li, liIdx) => {
                          const liText = li.replace(/^[-*]\s*/, '').trim();
                          
                          // Match bold tags if present
                          const boldMatch = liText.match(/^\*\*(.*?)\*\*(.*)/);
                          if (boldMatch) {
                            return (
                              <li key={liIdx}>
                                <strong>{boldMatch[1]}</strong>
                                {boldMatch[2]}
                              </li>
                            );
                          }
                          return <li key={liIdx}>{liText}</li>;
                        })}
                      </ul>
                    );
                  }

                  // Check numbered lists
                  if (/^\d+\./.test(trimmed)) {
                    const listItems = trimmed.split('\n');
                    return (
                      <ol key={pIdx} className="list-decimal pl-5 space-y-2 text-brand-dark/90 py-2">
                        {listItems.map((li, liIdx) => {
                          const liText = li.replace(/^\d+\.\s*/, '').trim();
                          const boldMatch = liText.match(/^\*\*(.*?)\*\*(.*)/);
                          if (boldMatch) {
                            return (
                              <li key={liIdx}>
                                <strong>{boldMatch[1]}</strong>
                                {boldMatch[2]}
                              </li>
                            );
                          }
                          return <li key={liIdx}>{liText}</li>;
                        })}
                      </ol>
                    );
                  }

                  // Regular paragraph
                  return (
                    <p key={pIdx} className="whitespace-pre-line leading-relaxed tracking-normal">
                      {trimmed}
                    </p>
                  );
                })}
              </div>

              {/* End of article signature */}
              <div className="pt-8 border-t border-brand-beige flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center font-bold text-brand-caramel shadow-sm">
                    布
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-dark">千媃 Zooey</p>
                    <p className="text-[10px] text-brand-caramel/70 uppercase font-bold tracking-wider">布丁體驗實驗室創辦人</p>
                  </div>
                </div>
                <div className="text-xs text-brand-caramel/60 italic">
                  Thanks for supporting! 💛
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
