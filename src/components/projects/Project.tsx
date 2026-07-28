import { useState, useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { allProjects } from './ProjectsData';

// Types
interface AosAnimation {
  cardAos: string;
  textAos: string;
}

export interface Project {
  id?: number | string;
  title: string;
  description: string;
  featured: string;
  thumbnails: string[];
  link: string;
  category: string;
  duration?: number | string;
  aos?: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  featured: string;
  thumbnails: string[];
  link: string;
  aosAnimation: AosAnimation;
  duration?: number | string;
  [key: string]: any; // Allow remaining project properties spread via {...proj}
}

const categories: string[] = ['All', ...new Set(allProjects.map((p) => p.category))];

// 🎨 Helper function to assign distinct AOS animations based on category
const getAosAnimation = (category: string, index: number): AosAnimation => {
  switch (category) {
    case 'Web Development':
      return { cardAos: 'fade-up', textAos: 'fade-left' };
    case 'Mobile Apps':
      return { cardAos: 'zoom-in-up', textAos: 'zoom-in' };
    case 'UI/UX Design':
      return { cardAos: 'flip-left', textAos: 'fade-right' };
    default:
      // Alternating animations for 'All' or unhandled categories
      return index % 2 === 0
        ? { cardAos: 'fade-right', textAos: 'fade-left' }
        : { cardAos: 'fade-left', textAos: 'fade-right' };
  }
};

function ProjectCard({
  title,
  description,
  featured,
  thumbnails,
  link,
  aosAnimation,
  duration = 800,
}: ProjectCardProps) {
  // Convert string duration to number for type compatibility
  const durationNum = typeof duration === 'string' ? parseInt(duration, 10) : duration;
  const [featuredImage, setFeaturedImage] = useState<string>(featured);

  // Reset featured image when prop changes
  useEffect(() => {
    setFeaturedImage(featured);
  }, [featured]);

  return (
    <div className='bg-white rounded-xl shadow-md overflow-hidden grid grid-cols-1 sm:grid-cols-2 gap-4 transition duration-300 ease-in-out hover:shadow-lg'>
      <img
        src={featuredImage}
        alt={title}
        className='w-full h-full max-h-[300px] object-cover transition duration-300 ease-in-out'
        data-aos={aosAnimation.cardAos}
        data-aos-duration={durationNum}
      />
      <div className='p-4' data-aos={aosAnimation.textAos} data-aos-duration={durationNum}>
        <h2 className='text-xl font-semibold mb-2'>{title}</h2>
        <p className='text-gray-600 mb-4'>{description}</p>
        <div className='flex gap-3 mb-4 flex-wrap'>
          {thumbnails.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumb ${idx}`}
              onClick={() => setFeaturedImage(img)}
              className={`w-24 h-24 object-cover rounded-md cursor-pointer border-2 transition ${
                featuredImage === img ? 'border-[#F69A20]' : 'border-transparent hover:border-[#001196]'
              }`}
            />
          ))}
        </div>
        <a href={link} target='_blank' rel='noopener noreferrer'>
          <button className="mt-2 px-4 py-2 cursor-pointer text-white text-lg font-semibold rounded-full shadow-lg bg-[#07051D] bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-700">
            View Project
          </button>
        </a>
      </div>
    </div>
  );
}

export default function ProjectHome() {
  const [projectCategory, setProjectCategory] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState<number>(5);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const filteredProjects: Project[] = projectCategory === 'All'
    ? allProjects
    : allProjects.filter((p) => p.category === projectCategory);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  // 🔥 IMPORTANT: Recalculate AOS positioning whenever filtered items or visible count changes
  useEffect(() => {
    AOS.refresh();
  }, [projectCategory, visibleCount]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className='p-4 pt-24 overflow-hidden'>
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-4"> 
        <div className="inline-flex items-center gap-2 bg-white ring-1 ring-gray-200 shadow-sm rounded-full px-4 py-1.5">
          <div className="w-2 h-2 rounded-full bg-[#F69A20]"></div>
          <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">
             Our Projects
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
          View{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-800">
            <span className="text-[#F69A20]">Our</span> Projects
          </span>
        </h2>
      </div>

      {/* Category Buttons */}
      <div className='flex justify-center items-center flex-wrap mt-6'>
        {categories.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setProjectCategory(item);
              setVisibleCount(5);
            }}
            className={`font-semibold p-3 rounded-md m-2 transition duration-200 cursor-pointer 
              ${projectCategory === item
                ? 'bg-[#07051D] text-white'
                : 'bg-gray-100 hover:bg-[#07051D] hover:text-white text-gray-700'}`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Projects Grid/List */}
      <div className='mx-auto w-full sm:w-10/12 mt-8 space-y-8'>
        {visibleProjects.map((proj, idx) => {
          const animationProps = getAosAnimation(projectCategory, idx);
          return (
            <ProjectCard
              key={proj.id || `${proj.title}-${idx}`}
              {...proj}
              aosAnimation={animationProps}
            />
          );
        })}
      </div>

      {/* Show More Button */}
      {visibleCount < filteredProjects.length && (
        <div className='text-center mt-8'>
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