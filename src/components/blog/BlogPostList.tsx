import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
      excerpt: 'Navigate your tech career path with proven strategies for skills development, networking, and landing your dream role.',
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

  return (
    <div className="relative w-full py-8">
      {/* Grid Container */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <BlogPostCard 
              post={post} 
              index={index} 
              isActive={false}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BlogPostList;