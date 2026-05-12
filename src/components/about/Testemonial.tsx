import React from 'react';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sara Khan",
    role: "CEO, TechNova",
    text: "Transformed our business with innovative solutions that deliver real results.",
    avatar: "https://i.pinimg.com/736x/79/3e/6e/793e6e0a44dc3c6d01ac2730df0bba85.jpg"
  },
  {
    name: "Ali Raza",
    role: "CTO, InnovateLabs",
    text: "Exceptional expertise and cutting-edge technology that exceeds expectations.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Ayesha Malik",
    role: "Founder, GrowthHub",
    text: "Reliable partner delivering scalable solutions with unmatched professionalism.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  }
];

const Testimonial: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#07051D] to-[#07051D]/90">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-[#FEAA00] bg-clip-text text-transparent mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Trusted by industry leaders for innovative solutions and exceptional results
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-[#07051D]/50 backdrop-blur-xl border border-[#FEB100]/20 rounded-2xl p-8 hover:border-[#FEB100]/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#FEB100]/10"
            >
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-2xl ring-2 ring-[#FEB100]/30 group-hover:ring-[#FEB100]/60 transition-all duration-500"
                />
                <div>
                  <h4 className="font-semibold text-white text-lg group-hover:text-[#FEB100] transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-[#FEB100]/80 text-sm font-medium">{testimonial.role}</p>
                </div>
              </div>
              
              <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors">
                "{testimonial.text}"
              </p>

              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-r from-[#FEB100] to-orange-400 rounded-full opacity-20 blur-xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;