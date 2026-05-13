import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Star, Send } from "lucide-react";

interface ReviewType {
  id: number;
  name: string;
  role: string;
  review: string;
  rating: number;
  image: string;
}

function Testimonial() {
  const [reviews, setReviews] = useState<ReviewType[]>([
    {
      id: 1,
      name: "Sarah Ahmed",
      role: "Frontend Developer",
      review:
        "Codes Thinker completely transformed my learning journey. The practical approach and mentorship helped me gain confidence in real-world development.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
    },

    {
      id: 2,
      name: "Ali Raza",
      role: "MERN Stack Intern",
      review:
        "The internship experience was amazing. I worked on real projects and improved my skills much faster than expected.",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    },
  ]);

  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const handleAddReview = () => {
    if (!newReview.trim()) return;

    const reviewObj: ReviewType = {
      id: Date.now(),
      name: "New User",
      role: "Student",
      review: newReview,
      rating,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    };

    setReviews([reviewObj, ...reviews]);

    setNewReview("");
    setRating(5);
  };

  return (
    <section className="py-6 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-10">

        {/* Heading */}
        <div className="text-center mb-12" data-aos="fade-up">

          <p className="uppercase tracking-[3px] text-xs font-semibold text-[#1e3a8a]">
            Testimonials
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-[#1e3a8a] mt-3">
            What Our Community Says
          </h2>

          <p className="text-gray-500 mt-4 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Real feedback from students, interns, and developers
            learning with Codes Thinker.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* LEFT SIDE */}
          <div
            data-aos="fade-right"
            className="relative rounded-[28px] overflow-hidden border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.06)] h-[560px]"
          >

            {/* Image */}
            <img
              src="https://i.pinimg.com/1200x/e1/c5/15/e1c5157514f9a5819b4e9ec0ce25c5cd.jpg"
              alt="Testimonials"
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/90 via-[#1e3a8a]/40 to-transparent"></div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-8 text-white z-10">

              <p className="uppercase tracking-[3px] text-xs font-semibold text-blue-200">
                Trusted Learning Platform
              </p>

              <h3 className="text-3xl md:text-4xl font-bold mt-4 leading-tight">
                Building Developers <br />
                Through Experience
              </h3>

              <p className="text-gray-200 mt-4 leading-relaxed text-sm md:text-base max-w-md">
                Students and interns share their experiences
                after learning practical development skills.
              </p>

              {/* Stats */}
              <div className="flex gap-8 mt-7">

                <div>
                  <h4 className="text-2xl font-bold">5K+</h4>
                  <p className="text-xs text-gray-300 mt-1">
                    Happy Students
                  </p>
                </div>

                <div>
                  <h4 className="text-2xl font-bold">4.9</h4>
                  <p className="text-xs text-gray-300 mt-1">
                    Average Rating
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div
            data-aos="fade-left"
            className="bg-white rounded-[28px] border border-gray-200 p-6 md:p-7 flex flex-col h-[560px] shadow-[0_10px_40px_rgba(0,0,0,0.05)]"
          >

            {/* Form Header */}
            <div>

              <p className="uppercase tracking-[3px] text-xs font-semibold text-[#1e3a8a]">
                Leave Review
              </p>

              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3">
                Share Your Experience
              </h3>

              <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                Your feedback helps future learners grow.
              </p>

              {/* Input */}
              <textarea
                placeholder="Write your review..."
                rows={3}
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="w-full mt-6 border border-gray-200 rounded-2xl px-5 py-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition-all"
              ></textarea>

              {/* Rating + Button */}
              <div className="mt-5 flex items-center justify-between flex-wrap gap-4">

                {/* Rating */}
                <div>
                  <p className="text-xs font-semibold text-gray-700 mb-2">
                    Rating
                  </p>

                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="transition-all duration-300 hover:scale-110"
                      >
                        <Star
                          size={22}
                          className={`${
                            star <= rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={handleAddReview}
                  className="bg-[#1e3a8a] hover:bg-[#162a70] text-white px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-xl flex items-center gap-2"
                >
                  Submit Review
                  <Send size={16} />
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 h-[1px] bg-gray-200"></div>

            {/* Reviews */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">

              {reviews.map((item, index) => (
                <div
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-4 transition-all duration-300 hover:shadow-md"
                >

                  <div className="flex gap-3">

                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />

                    {/* Content */}
                    <div className="flex-1">

                      {/* Top */}
                      <div className="flex items-center justify-between gap-3 flex-wrap">

                        <div>
                          <h4 className="font-bold text-[#1e3a8a] text-base">
                            {item.name}
                          </h4>

                          <p className="text-xs text-gray-500 mt-[2px]">
                            {item.role}
                          </p>
                        </div>

                        {/* Rating */}
                        <div className="flex gap-[2px]">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className="fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Review */}
                      <p className="text-gray-600 text-sm leading-relaxed mt-3">
                        “{item.review}”
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
export default Testimonial;