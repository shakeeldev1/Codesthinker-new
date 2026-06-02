import React from 'react';
import BlogHeader from '../components/blog/BlogHeader';
import BlogPostList from '../components/blog/BlogPostList';

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900 relative overflow-hidden font-sans">
      
      {/* Background Decor matching home page style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gray-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-15"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-15"></div>
      </div>

      <div >
        <BlogHeader />
        <div className='px-12'>  <BlogPostList /></div>
      </div>
    </div>
  );
};

export default Blog;