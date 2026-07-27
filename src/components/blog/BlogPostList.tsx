import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlogPostCard from './BlogPostCard';
import { Search, Clock, BookOpen, ArrowRight, Sparkles, Send, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { posts } from '../../data/blogData';

const BlogPostList: React.FC = () => {
  const categories = ['All', 'Development', 'Design', 'Backend', 'Career', 'Data Science'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [emailSub, setEmailSub] = useState('');
  const [subbed, setSubbed] = useState(false);

  // Filter posts based on category and search query
  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' ? true : post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get first post for the spotlight hero banner
  const heroPost = filteredPosts[0];
  // Remaining posts to map in the bento dashboard
  const remainingPosts = filteredPosts.slice(1);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSub) {
      setSubbed(true);
      setTimeout(() => {
        setSubbed(false);
        setEmailSub('');
      }, 3000);
    }
  };

  // Count helper
  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return posts.length;
    return posts.filter(p => p.category === cat).length;
  };

  // Widget 1: Search & Topic Hub Widget
  const renderSearchWidget = () => (
    <div 
      key="search-widget"
      className="rounded-[2.2rem] p-[1.2px] bg-gradient-to-br from-slate-200 via-slate-100/50 to-transparent hover:from-[#F49B21] hover:via-amber-400 hover:to-[#07051d]/20 transition-all duration-500 shadow-[0_12px_40px_rgba(7,5,29,0.035)] hover:shadow-[0_20px_50px_-12px_rgba(244,155,33,0.15)] hover:-translate-y-2 z-10 h-[460px] select-none"
    >
      <div className="h-full w-full bg-white rounded-[2.1rem] overflow-hidden relative p-8 flex flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-to-br from-[#07051d]/05 via-white to-amber-50/15 z-0 pointer-events-none" />
        <div className="absolute inset-0 z-0 opacity-30 bg-[linear-gradient(to_right,#07051d08_1px,transparent_1px),linear-gradient(to_bottom,#07051d08_1px,transparent_1px)] bg-[size:16px_24px] pointer-events-none" />
        
        <div className="space-y-6 relative z-10">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono tracking-widest text-[#F49B21] uppercase font-bold">// filter dashboard</span>
            <BookOpen className="w-4.5 h-4.5 text-slate-400" />
          </div>
          
          <h3 
            className="text-xl font-bold tracking-tight text-[#07051D]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Explore Topics & Tags
          </h3>

          {/* Line-based search bar */}
          <div className="relative group">
            <Search className="absolute left-0 top-2.5 h-4 w-4 text-slate-400 group-focus-within:text-[#F49B21] transition-colors" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search publications..."
              className="w-full bg-transparent border-b border-slate-200 focus:border-[#F49B21] text-slate-900 placeholder-slate-400 focus:outline-none text-xs pb-2 pl-6 transition-all"
            />
          </div>

          {/* Categories Cloud */}
          <div className="flex flex-wrap gap-2 pt-2 max-h-[200px] overflow-y-auto pr-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#07051D] text-white border-[#07051D] shadow-sm' 
                      : 'bg-slate-50 text-slate-500 border-slate-200/80 hover:border-[#F49B21] hover:text-[#07051D] hover:bg-[#F49B21]/5'
                  }`}
                >
                  {cat} ({getCategoryCount(cat)})
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold pt-4 border-t border-slate-100 flex justify-between items-center">
          <span>Click tags to toggle filter</span>
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  // Widget 2: CTO Quote Widget (Dark Theme)
  const renderQuoteWidget = () => (
    <div 
      key="quote-widget"
      className="rounded-[2.2rem] p-[1.2px] bg-gradient-to-br from-slate-200 via-slate-100/50 to-transparent hover:from-[#F49B21] hover:via-amber-400 hover:to-[#07051d]/20 transition-all duration-500 shadow-[0_12px_40px_rgba(7,5,29,0.035)] hover:shadow-[0_20px_50px_-12px_rgba(244,155,33,0.18)] hover:-translate-y-2 z-10 h-[460px] select-none"
    >
      <div className="h-full w-full bg-[#07051D] rounded-[2.1rem] overflow-hidden relative p-8 flex flex-col justify-between text-white">
        <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_24px] pointer-events-none" />
        <div className="absolute -inset-10 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(244,155,33,0.12)_0%,transparent_60%)] blur-2xl z-0" />
        
        <div className="flex justify-between items-center relative z-10">
          <span className="text-[10px] font-mono tracking-widest text-[#F49B21] uppercase font-bold">// developer quote</span>
          <Sparkles className="w-4.5 h-4.5 text-[#F49B21]" />
        </div>

        <div className="relative z-10 space-y-4 my-auto">
          <p 
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100 leading-relaxed italic"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            "We build software not just to solve immediate problems, but to engineer digital craft that stands the test of scale."
          </p>
          <div className="h-[2px] w-8 bg-[#F49B21]/30 rounded-full" />
        </div>

        <div className="relative z-10 text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold pt-4 border-t border-white/5 flex justify-between items-center">
          <span>— CTO, Codes Thinker</span>
          <span className="text-emerald-400">Verified Concept</span>
        </div>
      </div>
    </div>
  );

  // Widget 3: Newsletter Sub console (Dark Theme)
  const renderNewsletterWidget = () => (
    <div 
      key="news-widget"
      className="rounded-[2.2rem] p-[1.2px] bg-gradient-to-br from-slate-200 via-slate-100/50 to-transparent hover:from-[#F49B21] hover:via-amber-400 hover:to-[#07051d]/20 transition-all duration-500 shadow-[0_12px_40px_rgba(7,5,29,0.035)] hover:shadow-[0_20px_50px_-12px_rgba(244,155,33,0.18)] hover:-translate-y-2 z-10 h-[460px] select-none"
    >
      <div className="h-full w-full bg-[#07051D] rounded-[2.1rem] overflow-hidden relative p-8 flex flex-col justify-between text-white">
        <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_24px] pointer-events-none" />
        <div className="absolute -inset-10 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(244,155,33,0.12)_0%,transparent_60%)] blur-2xl z-0" />

        <div className="flex justify-between items-center relative z-10">
          <span className="text-[10px] font-mono tracking-widest text-[#F49B21] uppercase font-bold">// subscription hub</span>
          <Mail className="w-4.5 h-4.5 text-[#F49B21]" />
        </div>

        <div className="relative z-10 space-y-4 my-auto">
          <h3 
            className="text-xl font-bold tracking-tight text-white"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Architectural Insights
          </h3>
          <p className="text-xs leading-relaxed text-slate-300">
            Join 12,000+ tech leaders receiving weekly deep-dives in engineering and SaaS strategy.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-3 pt-2">
            <div className="relative">
              <input 
                type="email"
                value={emailSub}
                onChange={(e) => setEmailSub(e.target.value)}
                placeholder="work email"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#F49B21] focus:ring-1 focus:ring-[#F49B21] text-xs transition-all placeholder-gray-500 shadow-inner text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#F49B21] hover:bg-amber-500 text-[#07051D] font-extrabold rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {subbed ? (
                <><span>Subscribed!</span></>
              ) : (
                <><span>Subscribe Now</span><Send className="w-3 h-3" /></>
              )}
            </button>
          </form>
        </div>

        <div className="relative z-10 text-[8px] font-mono text-slate-500 uppercase tracking-widest font-bold pt-4 border-t border-white/5 text-center">
          We respect privacy. Unsubscribe any time.
        </div>
      </div>
    </div>
  );

  // Construct gridItems by interleaving posts and widgets dynamically
  const gridItems: React.ReactNode[] = [];
  let postIdx = 0;
  
  const totalSlots = remainingPosts.length + 3;
  let searchPlaced = false;
  let quotePlaced = false;
  let newsPlaced = false;

  for (let slot = 0; slot < totalSlots; slot++) {
    if (slot === 1) {
      searchPlaced = true;
      gridItems.push(renderSearchWidget());
    } else if (slot === 4) {
      quotePlaced = true;
      gridItems.push(renderQuoteWidget());
    } else if (slot === 7) {
      newsPlaced = true;
      gridItems.push(renderNewsletterWidget());
    } else {
      if (postIdx < remainingPosts.length) {
        const post = remainingPosts[postIdx];
        gridItems.push(
          <BlogPostCard key={`post-${post.id}`} post={post} index={postIdx + 1} />
        );
        postIdx++;
      }
    }
  }

  // Fallbacks: If list is too short and widgets haven't been rendered yet, append them
  if (!searchPlaced) gridItems.push(renderSearchWidget());
  if (!quotePlaced) gridItems.push(renderQuoteWidget());
  if (!newsPlaced) gridItems.push(renderNewsletterWidget());

  return (
    <div id="blog-posts-list" className="relative w-full pb-32 bg-white font-sans z-10">
      
      {/* Glow Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full filter blur-[120px]" />
        <div className="absolute top-2/3 left-0 w-[500px] h-[500px] bg-blue-900/5 rounded-full filter blur-[100px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 relative z-10">
        
        {/* SECTION HEADER: Luxury Serif Title */}
        <div className="text-center md:text-left mb-16 border-b border-slate-100 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#F49B21] uppercase font-bold block mb-2">// INTELLECTUAL CAPITAL</span>
            <h2 
              className="text-4xl md:text-5xl font-extrabold text-[#07051D] tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Insights & Perspectives
            </h2>
          </div>
          <div className="text-xs text-slate-400 font-extrabold uppercase tracking-widest bg-slate-50 border border-slate-100 px-5 py-2.5 rounded-full">
            Archive / {filteredPosts.length} Publications
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="space-y-8"
          >
            {/* 1. GIANT SPOTLIGHT HERO BANNER (Spans all 3 cols, Horizontal Split) */}
            {heroPost && (
              <Link to={`/blog/${heroPost.slug}`} className="block group">
                <div className="w-full rounded-[2.5rem] p-[1.2px] bg-gradient-to-br from-slate-200 via-slate-100/50 to-transparent hover:from-[#F49B21] hover:via-amber-400 hover:to-[#07051d]/20 transition-all duration-500 shadow-[0_12px_40px_rgba(7,5,29,0.035)] hover:shadow-[0_30px_60px_-15px_rgba(244,155,33,0.22)] hover:-translate-y-2 relative overflow-hidden z-10 lg:h-[450px]">
                  
                  <div className="h-full w-full bg-white rounded-[2.4rem] overflow-hidden relative flex flex-col lg:flex-row items-stretch">
                    
                    {/* Background layers */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#07051d]/05 via-white to-amber-50/15 z-0 pointer-events-none" />
                    <div className="absolute inset-0 z-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none bg-[linear-gradient(to_right,#07051d08_1px,transparent_1px),linear-gradient(to_bottom,#07051d08_1px,transparent_1px)] bg-[size:16px_24px]" />
                    <div className="absolute -inset-10 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(244,155,33,0.12)_0%,transparent_60%)] blur-2xl z-0" />

                    {/* Left: Image (Stretches to cover entire height) */}
                    <div className="w-full lg:w-[55%] h-64 lg:h-full overflow-hidden relative bg-slate-100 flex-shrink-0 z-10">
                      <img 
                        src={heroPost.image} 
                        alt={heroPost.title}
                        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/20 via-transparent to-transparent z-10" />
                      
                      {/* Glass Glare Sheen Sweep Effect on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1000ms] ease-out z-20 pointer-events-none" />

                      <span className="absolute top-6 left-6 z-20 text-[9px] px-4 py-2 rounded-full bg-[#F49B21] text-[#07051D] font-extrabold uppercase tracking-widest shadow-md">
                        Spotlight Hero
                      </span>
                    </div>

                    {/* Right: Typography details */}
                    <div className="w-full lg:w-[45%] p-8 lg:p-12 flex flex-col justify-between flex-grow h-full z-10">
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[9px] text-[#F49B21] font-extrabold uppercase tracking-widest font-mono">
                          <span>{heroPost.category}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F49B21]"></span>
                          <span className="text-slate-500">{heroPost.date}</span>
                        </div>

                        <h3 
                          className="text-2xl lg:text-4xl font-bold tracking-tight leading-snug group-hover:text-[#F49B21] transition-colors duration-300 text-[#07051D]"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {heroPost.title}
                        </h3>

                        {/* Gold separator */}
                        <div className="h-[2px] w-8 bg-[#F49B21]/30 group-hover:w-full transition-all duration-500 ease-out rounded-full" />

                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-4 font-sans">
                          {heroPost.excerpt}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-8">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-[#F49B21] flex items-center justify-center text-white text-[10px] font-black shadow shadow-amber-500/10">
                            {heroPost.author.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800 leading-none">{heroPost.author}</p>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">Contributor</p>
                          </div>
                        </div>

                        <div className="relative overflow-hidden pb-0.5">
                          <span className="text-xs font-bold text-[#F49B21] flex items-center gap-1.5 transition-transform duration-300">
                            Read Story <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F49B21] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </Link>
            )}

            {/* 2. BENTO DASHBOARD GRID (Combines Articles + Custom Interactive Widgets) */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridItems}
              </div>
            ) : (
              <div className="text-center py-32 bg-slate-50 rounded-[2.2rem] border border-dashed border-slate-200">
                <h3 className="text-xl font-bold text-slate-400">No articles matched your criteria.</h3>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
      </div>
    </div>
  );
};

export default BlogPostList;