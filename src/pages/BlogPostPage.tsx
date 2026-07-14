import React, { useEffect, useState, useRef } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Link as LinkIcon, ChevronRight, Clock, Share2 } from 'lucide-react';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { posts } from '../data/blogData';
import type { BlogPost } from '../data/blogData';
import BlogPostCard from '../components/blog/BlogPostCard';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>('');

  // Pre-process HTML content to inject IDs to h2 tags and generate headings array synchronously
  const { processedContent, headings } = React.useMemo(() => {
    if (!post) return { processedContent: '', headings: [] };
    
    const list: { id: string; text: string }[] = [];
    const html = post.content.replace(/<h2>(.*?)<\/h2>/g, (_, text) => {
      const id = text.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      list.push({ id, text });
      return `<h2 id="${id}">${text}</h2>`;
    });
    
    return { processedContent: html, headings: list };
  }, [post]);

  useEffect(() => {
    // Simulate network request or just find synchronously
    const foundPost = posts.find(p => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
      // Find 2 related posts in the same category
      const related = posts.filter(p => p.category === foundPost.category && p.id !== foundPost.id).slice(0, 2);
      // If not enough related in same category, just grab latest
      if (related.length < 2) {
        const fallback = posts.filter(p => p.id !== foundPost.id).slice(0, 2 - related.length);
        setRelatedPosts([...related, ...fallback]);
      } else {
        setRelatedPosts(related);
      }
    }
    setLoading(false);
    
    // Ensure we start at top of page when navigating to a new post
    window.scrollTo(0, 0);
  }, [slug]);

  // Set first heading active by default when headings change
  useEffect(() => {
    if (headings.length > 0) {
      setActiveId(headings[0].id);
    }
  }, [headings]);

  // Bulletproof Scroll Spy: track active heading based on scroll position
  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 145; // Offset for sticky navbar + padding

      // Set first heading active by default if scrolled near the top
      let currentActive = headings[0]?.id || '';

      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset;
          if (scrollPosition >= top) {
            currentActive = h.id;
          } else {
            break;
          }
        }
      }

      setActiveId(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call to set active state immediately
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] text-[#08061E] font-bold">Loading...</div>;
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Schema.org JSON-LD for rich snippets
  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://codesthinker.com/blog/${post.slug}`
    },
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Codes Thinker",
      "logo": {
        "@type": "ImageObject",
        "url": "https://codesthinker.com/logo.png" 
      }
    },
    "datePublished": post.date,
  };

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const imageReveal = {
    hidden: { opacity: 0, scale: 0.97, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <motion.article 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-[#F9FAFB] text-gray-900 font-sans pb-24"
    >
      {/* SEO Tags */}
      <Helmet>
        <title>{post.title} | Codes Thinker Engineering Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
        
        {/* OpenGraph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://codesthinker.com/blog/${post.slug}`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>
      </Helmet>

      {/* Cinematic Dark Featured Image Hero Header */}
      <motion.header 
        variants={fadeInUp} 
        className="relative w-full min-h-[65vh] pt-40 pb-24 px-6 flex items-center justify-center bg-[#07051D] overflow-hidden"
      >
        {/* Blurred Background Image Layer - Higher visibility, balanced blur */}
        <div className="absolute inset-0 z-0 scale-105">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-50 filter blur-[3px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07051D] via-[#07051D]/75 to-[#07051D]/25" />
        </div>

        {/* Ambient Color Glow matching post theme */}
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br ${post.gradient} rounded-full filter blur-[150px] opacity-25 z-0 pointer-events-none`} />

        <div className="max-w-6xl mx-auto w-full relative z-10 text-left">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-400 mb-8">
            <Link to="/blog" className="hover:text-[#F49B21] transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-500" />
            <span className="text-[#F49B21]">{post.category}</span>
          </nav>

          <div className="max-w-4xl space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              {post.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-light max-w-3xl">
              {post.excerpt}
            </p>

            {/* Elegant Post Meta Section */}
            <div className="flex flex-wrap items-center gap-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-300 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#F49B21] flex items-center justify-center text-[#07051D] text-xs font-extrabold border border-white/20 shadow-md">
                  {post.author.charAt(0)}
                </div>
                <span className="text-white">{post.author}</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F49B21]" />
              <span>{post.date}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F49B21]" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main 3-Column Layout */}
      <div className="max-w-6xl mx-auto px-6 mt-16 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column: Author & Share (Sticky) */}
          {/* Left Column: Author & Share (Sticky) */}
          <motion.div variants={slideInLeft} className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-32 space-y-6">
              
              {/* Author Card */}
              <div className="bg-white border border-gray-100 shadow-md shadow-gray-900/5 rounded-2xl p-5 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Published By</span>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#F49B21] to-amber-400 p-[2px] shadow-sm">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#08061E] font-bold text-lg">
                      {post.author.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#08061E] leading-tight">{post.author}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{post.date}</p>
                  </div>
                </div>
              </div>

              {/* Share Card */}
              <div className="bg-white border border-gray-100 shadow-md shadow-gray-900/5 rounded-2xl p-5 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <Share2 className="w-4 h-4 text-gray-400" />
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Share Article</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 text-gray-500 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/5 border border-gray-100 hover:border-[#1DA1F2]/30 transition-all duration-300 p-2.5 rounded-xl font-semibold text-xs text-left group"
                  >
                    <div className="flex items-center gap-2.5">
                      <FaTwitter className="w-4 h-4 text-gray-400 group-hover:text-[#1DA1F2] transition-colors" />
                      <span>Twitter</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#1DA1F2]" />
                  </a>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 text-gray-500 hover:text-[#0A66C2] hover:bg-[#0A66C2]/5 border border-gray-100 hover:border-[#0A66C2]/30 transition-all duration-300 p-2.5 rounded-xl font-semibold text-xs text-left group"
                  >
                    <div className="flex items-center gap-2.5">
                      <FaLinkedin className="w-4 h-4 text-gray-400 group-hover:text-[#0A66C2] transition-colors" />
                      <span>LinkedIn</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#0A66C2]" />
                  </a>
                  <button 
                    onClick={copyLink} 
                    className="flex items-center justify-between gap-3 text-gray-500 hover:text-[#F49B21] hover:bg-[#F49B21]/5 border border-gray-100 hover:border-[#F49B21]/30 transition-all duration-300 p-2.5 rounded-xl font-semibold text-xs text-left group w-full cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <LinkIcon className="w-4 h-4 text-gray-400 group-hover:text-[#F49B21] transition-colors" />
                      <span>Copy Link</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#F49B21]" />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Center Column: Content */}
          <motion.div variants={fadeInUp} className="lg:col-span-6">
            {/* Mobile Author Info */}
            <div className="flex items-center justify-between lg:hidden mb-12 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-lg text-[#08061E]">{post.author}</p>
                  <p className="text-sm text-gray-500">{post.date} · {post.readTime}</p>
                </div>
              </div>
            </div>

            {/* Prose Container */}
            <div 
              ref={contentRef}
              className="prose prose-lg md:prose-xl max-w-none 
                prose-headings:font-bold prose-headings:text-[#08061E] prose-headings:tracking-tight
                prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100
                prose-p:text-gray-600 prose-p:leading-relaxed
                prose-a:text-amber-500 hover:prose-a:text-amber-600 prose-a:font-semibold prose-a:no-underline
                prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-amber-50/50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl prose-blockquote:font-medium prose-blockquote:text-gray-700 prose-blockquote:not-italic
                prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-10"
              dangerouslySetInnerHTML={{ __html: processedContent }} 
            />

            {/* Tags */}
            <div className="mt-16 pt-8 border-t border-gray-200 flex flex-wrap gap-2">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mr-4 py-2">Tags:</span>
              {post.tags.map(tag => (
                <span key={tag} className="px-4 py-2 rounded-full bg-white text-gray-600 border border-gray-200 text-sm font-medium hover:border-amber-500 hover:text-amber-600 shadow-sm transition-all cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column: TOC (Sticky) */}
          <motion.div variants={slideInRight} className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-32 space-y-6">
              
              {/* Table of Contents Card */}
              <div className="bg-white border border-gray-100 shadow-md shadow-gray-900/5 rounded-2xl p-6 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Table of Contents</h3>
                <div className="relative border-l border-gray-200/80 pl-4 py-1 flex flex-col gap-4">
                  {headings.map((h) => (
                    <a 
                      key={h.id} 
                      href={`#${h.id}`} 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(h.id);
                        if (element) {
                          const yOffset = -95; // Accounts for sticky header + spacing
                          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }}
                      className={`text-xs transition-all duration-300 relative block leading-relaxed group ${
                        activeId === h.id 
                          ? 'text-[#F49B21] font-bold' 
                          : 'text-gray-400 hover:text-gray-900 font-medium'
                      }`}
                    >
                      {activeId === h.id && (
                        <motion.div 
                          layoutId="activeTOC"
                          className="absolute -left-[17px] top-0 bottom-0 w-[3px] bg-[#F49B21] rounded-full shadow-[0_0_8px_#F49B21]"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">
                        {h.text}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Reading Time Card */}
              <div className="bg-white border border-gray-100 shadow-md shadow-gray-900/5 rounded-2xl p-5 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 bg-gradient-to-r from-amber-50/50 to-orange-50/30 rounded-xl p-4 border border-amber-100/30">
                  <div className="p-2.5 rounded-xl bg-[#F49B21] text-white shadow-md shadow-amber-500/20">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Reading Time</span>
                    <span className="text-base font-extrabold text-[#08061E] mt-0.5 block">{post.readTime}</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Read Next Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto px-6 mt-24 pt-16 border-t border-gray-200"
      >
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-[#08061E]">Read Next</h2>
          <Link to="/blog" className="hidden md:flex items-center gap-2 text-amber-500 font-bold hover:text-amber-600 transition-colors">
            View All Articles <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {relatedPosts.map((relatedPost, index) => (
            <BlogPostCard key={relatedPost.id} post={relatedPost} index={index} />
          ))}
        </div>
        <div className="mt-8 md:hidden">
          <Link to="/blog" className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white border border-gray-200 text-[#08061E] font-bold shadow-sm hover:border-amber-500 hover:text-amber-600 transition-colors">
            View All Articles <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>

      {/* Newsletter Block */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto px-6 mt-24"
      >
        <div className="bg-[#08061E] rounded-[2rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2000&q=80')] opacity-5 object-cover mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-blue-500/10 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-left md:w-1/2">
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">Stay ahead of the curve.</h3>
              <p className="text-gray-300 text-lg">
                Join our newsletter to receive the latest engineering insights and design strategies straight to your inbox.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:bg-white/20 transition-all"
                  required
                />
                <button 
                  type="submit"
                  className="w-full px-6 py-4 bg-[#F69A20] hover:bg-amber-500 text-white font-extrabold rounded-xl transition-colors shadow-lg shadow-amber-500/25"
                >
                  Subscribe to Newsletter
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-4 text-center md:text-left">We care about your data. Read our Privacy Policy.</p>
            </div>
          </div>
        </div>
      </motion.div>

    </motion.article>
  );
};

export default BlogPostPage;
