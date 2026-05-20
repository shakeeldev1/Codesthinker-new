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
        "Codes Thinker completely transformed my learning journey with practical experience.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Ali Raza",
      role: "MERN Stack Intern",
      review:
        "Amazing internship experience. Real projects boosted my confidence.",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    },
  ]);

  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
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
    <section className="py-14 bg-white text-[#0B1C3D]">
      <div className="max-w-7xl mx-auto px-4 lg:px-10">

        {/* HEADER */}
        <div className="text-center mb-14" data-aos="fade-up">

          <p className="uppercase tracking-[4px] text-xs font-semibold text-[#FEAA00]">
            Testimonials
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mt-4 text-[#0B1C3D]">
            What Our Community Says
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Real feedback from students and developers growing with us.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT IMAGE PANEL */}
          <div
            data-aos="fade-right"
            className="relative rounded-3xl overflow-hidden shadow-xl border h-[560px]"
          >
            <img
              src="https://i.pinimg.com/1200x/e1/c5/15/e1c5157514f9a5819b4e9ec0ce25c5cd.jpg"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C3D]/90 via-[#0B1C3D]/40 to-transparent"></div>

            <div className="absolute bottom-0 p-8 text-white">
              <p className="text-[#FEAA00] text-xs tracking-[3px] uppercase">
                Trusted Platform
              </p>

              <h3 className="text-3xl font-bold mt-3">
                Building Developers Through Practice
              </h3>

              <p className="text-gray-200 mt-3 text-sm">
                Real-world learning experiences shared by our community.
              </p>

              <div className="flex gap-10 mt-6">
                <div>
                  <h4 className="text-2xl font-bold text-[#FEAA00]">5K+</h4>
                  <p className="text-xs text-gray-300">Students</p>
                </div>

                <div>
                  <h4 className="text-2xl font-bold text-[#FEAA00]">4.9</h4>
                  <p className="text-xs text-gray-300">Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM PANEL (WHITE CARD ONLY) */}
          <div
            data-aos="fade-left"
            className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 md:p-8 flex flex-col h-[560px]"
          >

            {/* FORM HEADER */}
            <div>
              <h3 className="text-2xl font-bold text-[#0B1C3D]">
                Share Your Experience
              </h3>

              <p className="text-gray-600 text-sm mt-2">
                Your feedback helps others learn better.
              </p>

              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Write your review..."
                className="w-full mt-5 border border-gray-300 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FEAA00]"
              />

              {/* RATING + BUTTON */}
              <div className="flex justify-between items-center mt-5 flex-wrap gap-4">

                {/* STAR RATING */}
                <div>
                  <p className="text-xs font-semibold text-gray-700 mb-2">
                    Rating
                  </p>

                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onClick={() => setRating(star)}>
                        <Star
                          className={`${
                            star <= rating
                              ? "text-[#FEAA00] fill-[#FEAA00]"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleAddReview}
                  className="bg-[#FEAA00] text-[#0B1C3D] font-semibold px-6 py-3 rounded-2xl flex items-center gap-2 hover:scale-105 transition"
                >
                  Submit <Send size={16} />
                </button>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="my-6 h-[1px] bg-gray-200"></div>

            {/* REVIEWS */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">

              {reviews.map((item, index) => (
                <div
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-4 hover:shadow-md transition"
                >
                  <div className="flex gap-3">

                    <img
                      src={item.image}
                      className="w-12 h-12 rounded-xl object-cover"
                    />

                    <div className="flex-1">

                      <div className="flex justify-between flex-wrap">

                        <div>
                          <h4 className="font-bold text-[#0B1C3D]">
                            {item.name}
                          </h4>

                          <p className="text-xs text-gray-500">
                            {item.role}
                          </p>
                        </div>

                        <div className="flex gap-[2px]">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className="text-[#FEAA00] fill-[#FEAA00]"
                            />
                          ))}
                        </div>

                      </div>

                      <p className="text-gray-600 text-sm mt-3">
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