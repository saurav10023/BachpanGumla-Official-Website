import React from "react";
import banner from "./files/playgroup.jpg";

const PlayGroup = () => {
  return (
    <div className="bg-indigo-50 px-4 md:px-10">

      {/* MOBILE */}
      <div className="lg:hidden">
        <div className="relative w-full  rounded-xl overflow-hidden mt-4">
          <img
            src={banner}
            alt="banner"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-2xl font-bold text-white">
              Play Group
            </h1>
            <p className="mt-1 text-sm font-medium text-white/90">
              Age 1.5 to 3 Years
            </p>
          </div>
        </div>
      </div>

      {/* DESKTOP BANNER */}
      <div className="hidden lg:block w-full h-auto">
        <img src={banner} alt="banner" />
      </div>

      <div className="max-w-6xl py-5 mx-auto">

        {/* desktop header */}
        <div className="hidden lg:block text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-700">
            Play Group
          </h1>
          <p className="mt-2 text-lg font-medium text-gray-600">
            Age 1.5 to 3 Years
          </p>
        </div>

        
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            We believe that at this early age, children should experience
            balanced development of all parts of their body, including
            strengthening large muscles, bones, and fine muscles.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Proper coordination between hands, feet, fingers, eyes, and the
            brain is essential for healthy growth and overall balance.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our activities are carefully designed to meet the unique needs of
            children aged 1.5 to 3 years, fostering holistic growth and
            well-being in a joyful learning environment.
          </p>
        </div>

        {/* activities*/}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Developmental Activities
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <ActivityCard
              title="Gross Motor Skill Development"
              items={[
                "Climbing, crawling, and sliding to strengthen large muscles",
                "Throwing and catching balls for balance and coordination",
                "Dancing and singing to encourage movement and rhythm"
              ]}
            />

            <ActivityCard
              title="Fine Motor Skill Development"
              items={[
                "Building blocks and puzzles for hand-eye coordination",
                "Coloring and drawing to boost creativity",
                "Playing with dough and clay for sensory exploration"
              ]}
            />

            <ActivityCard
              title="Cognitive Development"
              items={[
                "Storytelling and drama to enhance language skills",
                "Puzzles and board games for logical thinking",
                "Nature exploration to build curiosity and observation"
              ]}
            />

            <ActivityCard
              title="Social & Emotional Development"
              items={[
                "Cooperative play to develop sharing and teamwork",
                "Identifying and expressing emotions",
                "Building self-confidence and self-regulation"
              ]}
            />

          </div>
        </div>

        
        <div className="bg-purple-50 rounded-2xl p-6 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Recognition of Letters & Numbers
          </h2>
          <p className="text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
            Integrated seamlessly into our daily activities is the introduction
            of alphabets, numbers, vowel sounds, स्वर–व्यंजन, and more. These
            concepts are presented through engaging, hands-on methods that help
            children recognize and identify the foundational elements of
            language and numeracy, preparing them confidently for future
            learning.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PlayGroup;


function ActivityCard({ title, items }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="text-lg font-semibold text-purple-700 mb-3">
        {title}
      </h3>
      <ul className="space-y-2 text-gray-700 text-sm leading-relaxed">
        {items.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
