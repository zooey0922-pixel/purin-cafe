export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'fandom' | 'community' | 'design';
  categoryLabel: string;
  coverUrl: string;
  description: string;
  keyAchievements: string[];
  gallery: { url: string; caption: string }[];
  details: string;
  date: string;
  tags: string[];
}

export interface JournalEntry {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: 'Fan Culture' | 'Event Insights' | 'Community Stories' | 'Character IP Trends' | 'Creative Ideas';
  readTime: string;
  coverUrl: string;
}

export interface ConceptItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  badge: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  category: 'events' | 'merch' | 'displays' | 'moments';
  categoryLabel: string;
}
