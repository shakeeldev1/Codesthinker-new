import React from 'react';

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
}

const BlogPostList: React.FC = () => {
  const posts: BlogPost[] = [
    {
      id: 1,
      title: 'Mastering Modern React Patterns',
      excerpt: 'Explore the latest React patterns including hooks, server components, and state management best practices for building scalable applications.',
      category: 'Development',
      author: 'Sarah Chen',
      date: 'May 10, 2024',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-amber-500/40 to-blue-500/20',
      tags: ['React', 'JavaScript']
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
      tags: ['UI/UX', 'Design']
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
      tags: ['Backend', 'Node.js']
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
      tags: ['Career', 'Growth']
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
      tags: ['Python', 'ML']
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
      tags: ['Figma', 'Design Systems']
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16 w-full max-w-6xl border-b border-white/10 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <h2 className="text-2xl font-bold text-amber-500">Latest Articles</h2>
          </div>
          <p className="text-gray-400 text-sm mt-2">Thoughts, Tutorials, and industry insights</p>
        </div>
        <span className="text-sm font-mono text-gray-500 uppercase tracking-widest mt-4 md:mt-0">
          {posts.length} articles
        </span>
      </div>

      {/* Bento Grid */}
      <div className="flex flex-wrap justify-center gap-8">
        {posts.map((card, index) => (
          <div
            key={card.id}
            className="group relative w-[320px] h-[480px] flex items-center justify-center"
          >
            {/* Gradient Background */}
            <div
              className={`absolute inset-0 rounded-xl bg-gradient-to-br ${card.gradient} skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:translate-x-[-15px]`}
            ></div>

            {/* Blur Glow */}
            <div
              className={`absolute inset-0 rounded-xl bg-gradient-to-br ${card.gradient} skew-x-[15deg] blur-3xl opacity-60 transition-all duration-500 group-hover:skew-x-0 group-hover:translate-x-[-15px]`}
            ></div>

            {/* Floating Glass Squares */}
            <span className="absolute inset-0 z-10 pointer-events-none overflow-visible">
              <span className="absolute w-0 h-0 rounded-lg bg-white/10 backdrop-blur-md opacity-0 shadow-lg border border-white/10 transition-all duration-300 group-hover:w-[70px] group-hover:h-[70px] group-hover:top-[-25px] group-hover:left-[25px] animate-float"></span>
              <span className="absolute w-0 h-0 rounded-lg bg-white/10 backdrop-blur-md opacity-0 shadow-lg border border-white/10 transition-all duration-500 delay-100 group-hover:w-[70px] group-hover:h-[70px] group-hover:bottom-[-25px] group-hover:right-[25px] animate-float-reverse"></span>
            </span>

            {/* Content Card */}
            <div className="relative z-20 bg-[#0a0835]/80 backdrop-blur-md rounded-xl shadow-xl border border-white/10 px-5 py-6 text-white transition-all duration-500 group-hover:-translate-x-6 group-hover:shadow-amber-500/20 w-[90%] h-[90%] flex flex-col">
              {/* Image */}
              <div className="relative h-44 overflow-hidden rounded-lg mb-3 -mx-1">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07051D] via-[#07051D]/60 to-transparent" />
                <span className="absolute top-2 left-2 text-[10px] px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-[#07051D] font-black uppercase tracking-wider shadow-lg">
                  {card.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-base font-bold mb-2 line-clamp-2 leading-tight group-hover:text-amber-300 transition-colors tracking-tight">
                {card.title}
              </h2>

              {/* Excerpt */}
              <p className="text-sm leading-relaxed mb-3 text-gray-300 line-clamp-3 flex-1">
                {card.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {card.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 -mx-1 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500/30 to-blue-500/30 border border-white/20 flex items-center justify-center text-[10px] font-bold">
                    {card.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white line-clamp-1">{card.author}</p>
                    <p className="text-[10px] text-gray-500">{card.date}</p>
                  </div>
                </div>
                <span className="text-[10px] text-amber-500/80 font-medium">{card.readTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPostList;
