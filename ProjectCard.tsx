import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { FolderHeart, ChevronRight } from 'lucide-react';

interface ProjectCardProps {
  key?: string;
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative cursor-pointer bg-white rounded-3xl overflow-hidden shadow-warm-sm hover:shadow-warm-md border border-brand-caramel/10 flex flex-col h-full"
      onClick={onClick}
    >
      {/* Category Tag */}
      <span className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-brand-white/95 backdrop-blur-md text-brand-caramel text-xs font-semibold rounded-full border border-brand-caramel/10 flex items-center gap-1.5 shadow-sm">
        <FolderHeart className="w-3.5 h-3.5" />
        {project.categoryLabel}
      </span>

      {/* Cover Image Wrapper */}
      <div className="relative h-64 overflow-hidden bg-brand-beige">
        <img
          src={project.coverUrl}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform duration-500 scale-100 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-xs font-mono text-brand-caramel/70 mb-1">{project.date}</div>
        <h3 className="font-sans text-xl font-bold text-brand-dark group-hover:text-brand-caramel transition-colors leading-snug">
          {project.title}
        </h3>
        <p className="text-brand-caramel font-semibold text-xs tracking-wider mb-3 uppercase mt-1">
          {project.subtitle}
        </p>
        
        <p className="text-sm text-brand-dark/70 line-clamp-3 mb-6 flex-grow leading-relaxed">
          {project.description}
        </p>

        {/* Footer info & tags */}
        <div className="space-y-4 pt-4 border-t border-brand-beige">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-xs px-2 py-0.5 bg-brand-beige text-brand-caramel/80 rounded-md font-medium">
                #{tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center text-brand-caramel text-sm font-semibold group-hover:gap-1.5 gap-0.5 transition-all">
            <span>探索專案細節</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
