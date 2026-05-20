import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlogPostCard from './BlogPostCard';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  gradient: string;
  tags: string[];
  slug: string;
}

const BlogPostList: React.FC = () => {
  const posts: BlogPost[] = [
    {
      id: 1,
      title: 'Mastering Modern React Patterns',
      excerpt: 'Explore the latest React patterns including hook, server components, and state management best practices for building scalable applications.',
      category: 'Development',
      author: 'Sarah Chen',
      date: 'May 10, 2024',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-amber-500/40 to-blue-500/20',
      tags: ['React', 'JavaScript', 'Frontend', 'Web Dev'],
      slug: 'mastering-modern-react-patterns',
    },
    {
      id: 2,
      title: 'The Future of UI/UX Design',
      excerpt: 'From minimalist aesthetics to immersive experiences, discover the design trends shaping the digital landscape this year.',
      category: 'Design',
      author: 'Marcus Rivera',
      date: 'May 8, 2024',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-purple-500/30 to-blue-500/30',
      tags: ['UI/UX', 'Design', 'Figma'],
      slug: 'future-of-ui-ux-design',
    },
    {
      id: 3,
      title: 'Building Scalable Backend Architecture',
      excerpt: 'Learn essential principles for designing backend systems that can handle millions of requests while maintaining performance.',
      category: 'Backend',
      author: 'James Wilson',
      date: 'May 5, 2024',
      readTime: '12 min read',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-blue-500/30 to-indigo-500/30',
      tags: ['Backend', 'Node.js', 'AWS'],
      slug: 'scalable-backend-architecture',
    },
    {
      id: 4,
      title: 'Career Growth in Tech',
      excerpt: 'Navigate your tech career path with proven strategies for skill development, networking, and landing your dream role.',
      category: 'Career',
      author: 'Emily Park',
      date: 'May 2, 2024',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-amber-500/40 to-orange-500/20',
      tags: ['Career', 'Growth', 'Interview'],
      slug: 'career-growth-in-tech',
    },
    {
      id: 5,
      title: 'Data Science Fundamentals',
      excerpt: 'Start your data science journey with core concepts in Python, statistics, and machine learning explained simply.',
      category: 'Data Science',
      author: 'Dr. Alex Kumar',
      date: 'Apr 28, 2024',
      readTime: '15 min read',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-blue-500/40 to-cyan-500/20',
      tags: ['Python', 'ML', 'Data Science'],
      slug: 'data-science-fundamentals',
    },
    {
      id: 6,
      title: 'Creating Effective Design Systems',
      excerpt: 'How to build and maintain design systems that ensure consistency and accelerate product development across teams.',
      category: 'Design',
      author: 'Lisa Chang',
      date: 'Apr 25, 2024',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-indigo-500/30 to-purple-500/30',
      tags: ['Figma', 'Design Systems', 'UI'],
      slug: 'effective-design-systems',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % posts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, posts.length]);

  const handleCardClick = (index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Stack Container */}
      <div className="relative flex flex-col items-center justify-center min-h-[600px]">
        {posts.map((post, index) => {
          const isActive = activeIndex === index;
          const offset = index - activeIndex;
          const isVisible = Math.abs(offset) <= 2;
          
          if (!isVisible) return null;
          
          return (
            <motion.div
              key={post.id}
              initial={false}
              animate={{
                y: offset * 20,
                scale: isActive ? 1 : 0.95,
                opacity: isActive ? 1 : 0.4,
                zIndex: posts.length - Math.abs(offset),
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="absolute cursor-pointer"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => handleCardClick(index)}
            >
              <BlogPostCard 
                post={post} 
                index={index} 
                isActive={isActive}
                onClick={() => handleCardClick(index)}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-8 pt-8">
        {posts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleCardClick(idx)}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === idx 
                ? 'w-8 h-2 bg-gradient-to-r from-amber-500 to-orange-500' 
                : 'w-2 h-2 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`View post ${idx + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:block">
        <button
          onClick={() => handleCardClick((activeIndex - 1 + posts.length) % posts.length)}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-amber-400 transition-all duration-300 flex items-center justify-center"
          aria-label="Previous post"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:block">
        <button
          onClick={() => handleCardClick((activeIndex + 1) % posts.length)}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-amber-400 transition-all duration-300 flex items-center justify-center"
          aria-label="Next post"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(3deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(8px) rotate(-3deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BlogPostList;