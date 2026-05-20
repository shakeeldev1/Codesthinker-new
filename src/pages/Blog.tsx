import React from 'react';
import BlogHeader from '../components/blog/BlogHeader';
import BlogPostList from '../components/blog/BlogPostList';

const Blog: React.FC = () => {
  const totalPosts = 6; // This would come from your data source

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#07051D] via-[#0c0838] to-[#07051D] text-white relative overflow-hidden">
      
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-radial from-amber-500/10 via-transparent to-transparent rounded-full blur-[130px] animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-blue-600/10 via-transparent to-transparent rounded-full blur-[130px] animate-pulse-delayed" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-gradient-radial from-purple-500/5 via-transparent to-transparent rounded-full blur-[150px]" />
      </div>

      {/* Grid Pattern Background */}
      <svg
        className="fixed inset-0 pointer-events-none z-0"
        width="1440"
        height="1200"
        viewBox="0 0 1440 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.06 }}
      >
        <defs>
          <pattern id="grid-blog" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#F59C24" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1440" height="1200" fill="url(#grid-blog)" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <BlogHeader totalPosts={totalPosts} />
        <BlogPostList />
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes pulse-delayed {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.15); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-pulse-delayed {
          animation: pulse-delayed 10s ease-in-out infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float-reverse {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(10px) rotate(-5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float-reverse {
          animation: float-reverse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Blog;