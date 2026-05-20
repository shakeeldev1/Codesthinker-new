import { useState, useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { allProjects } from './ProjectsData';

const categories = ['All', ...new Set(allProjects.map(p => p.category))];

function ProjectCard({ title, description, featured, thumbnails, link, aos, duration }) {
  const [featuredImage, setFeaturedImage] = useState(featured);

  // 🔥 FIX: Reset featured image when category or project changes
  useEffect(() => {
    setFeaturedImage(featured);
  }, [featured]);

  return (
    <div className='bg-white rounded-xl shadow-md overflow-hidden grid grid-cols-1 sm:grid-cols-2 gap-4 transition duration-300 ease-in-out hover:shadow-lg'>
      <img
        src={featuredImage}
        alt='Featured Project'
        className='w-full h-full max-h-[300px] transition duration-300 ease-in-out'
        data-aos={aos}
      />
      <div className='p-4' data-aos='fade-left' data-aos-duration={duration}>
        <h2 className='text-xl font-semibold mb-2'>{title}</h2>
        <p className='text-gray-600 mb-4'>{description}</p>
        <div className='flex gap-3 mb-4 flex-wrap'>
          {thumbnails.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumb ${idx}`}
              onClick={() => setFeaturedImage(img)}
              className='w-24 h-24 object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-[#001196] transition'
            />
          ))}
        </div>
        <a href={link} target='_blank' rel='noopener noreferrer'>
          <button
            className="mt-2 px-4 py-2 cursor-pointer text-white text-lg font-semibold rounded-full shadow-lg bg-[#07051D] bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-700"
          >
            View Project
          </button>
        </a>
      </div>
    </div>
  );
}

export default function ProjectHome() {
  const [projectCategory, setProjectCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const filteredProjects = projectCategory === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === projectCategory);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  return (
    <div className='p-4 pt-24'>
      <div className="flex flex-col items-center text-center space-y-4"> 
  {/* The badge/pill */}
  <div className="inline-flex items-center gap-2 bg-white ring-1 ring-gray-200 shadow-sm rounded-full px-4 py-1.5">
    <div className="w-2 h-2 rounded-full bg-[#F69A20]"></div>
    <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">
       Our Projects
    </span>
  </div>

  {/* The Heading */}
  <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
    View{" "}
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-800">
      <span className="text-[#F69A20]">Our</span> Projects
    </span>
  </h2>
</div>

      {/* Category Buttons */}
      <div className='flex justify-center items-center flex-wrap'>
        {categories.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setProjectCategory(item);
              setVisibleCount(5); // Reset on category change
            }}
            className={`font-semibold p-3 rounded-md m-2 transition duration-200 
              ${projectCategory === item
                ? 'bg-[#07051D] bg-[length:200%_100%] bg-left text-white'
                : 'hover:bg-[#07051D] bg-[length:200%_100%] bg-left hover:text-white'}`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Projects */}
      <div className='mx-auto w-full sm:w-10/12 mt-6 space-y-8'>
        {visibleProjects.map((proj, idx) => (
          <ProjectCard key={idx} {...proj} />
        ))}
      </div>

      {/* Show More Button */}
      {visibleCount < filteredProjects.length && (
        <div className='text-center mt-6'>
          <button
            onClick={handleShowMore}
            className="px-6 py-3 cursor-pointer text-white font-semibold rounded-full shadow-md bg-[#07051D] bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-700"
          >
            Explore More
          </button>
        </div>
      )}
    </div>
  );
}
