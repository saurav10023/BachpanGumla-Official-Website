import React from "react";
import banner from "./files/primarybanner.jpg";
import banner2 from "./files/primarybanner2.webp"
const Primary = () => {
  return (
    <div className="bg-indigo-50 px-4 md:px-10">

      {/* mobile */}
      <div className="lg:hidden">
        <div className="relative w-full  rounded-xl overflow-hidden mt-4">
          <img
            src={banner2}
            alt="banner"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center align-bottom px-4 ">
            <h1 className="text-xl font-bold text-white">
              Primary School
            </h1>
            <p className="mt-1 text-sm font-medium text-white/90 max-w-xs">
              Strong Foundations for Lifelong Learning
            </p>
          </div>
        </div>
      </div>

      {/* desktop banner*/}
      <div className="hidden lg:block w-full h-auto">
        <img src={banner} alt="banner" />
      </div>

      <div className="max-w-6xl mx-auto py-5">

        {/* desktop header */}
        <div className="hidden lg:block text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-700">
            Primary School
          </h1>
          <p className="mt-2 text-lg font-medium text-gray-600">
            Strong Foundations for Lifelong Learning
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Curriculum
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <InfoCard
              title="Language & Literature (English / हिंदी)"
              text="Language and literature are treated as life skills, not just
              subjects. We focus on listening, speaking, reading, and writing
              to help children communicate confidently and express themselves
              creatively."
            />

            <InfoCard
              title="Mathematics"
              text="Our holistic math approach emphasizes hands-on learning,
              critical thinking, real-world connections, collaboration, and
              differentiated instruction to build deep conceptual
              understanding."
            />

            <div className="bg-white rounded-xl shadow p-5 md:col-span-2">
              <h3 className="text-lg font-semibold text-purple-700 mb-2">
                Environmental Science & Social Studies
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm leading-relaxed">
                <li>• Developing self-help and life-saving skills</li>
                <li>• Promoting empathy, understanding, and global citizenship</li>
                <li>• Cultivating love for nature and environmental stewardship</li>
                <li>• Understanding Earth’s systems and sustainable choices</li>
              </ul>
            </div>

          </div>
        </div>

        {/* stem */}
        <div className="bg-purple-50 rounded-2xl p-6 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            STEM, Robotics & Technology
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <InfoCard
              title="STEM Education"
              text="STEM ignites curiosity through hands-on learning, teamwork,
              and real-world problem-solving to nurture future innovators."
            />

            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="text-lg font-semibold text-purple-700 mb-2">
                Robotics
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm leading-relaxed">
                <li>• Introduction to robotics and programming basics</li>
                <li>• Hands-on exploration and experimentation</li>
                <li>• Critical thinking and creative problem-solving</li>
                <li>• Teamwork and collaboration through projects</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow p-5 md:col-span-2">
              <h3 className="text-lg font-semibold text-purple-700 mb-2">
                ICT / Computer Education
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm leading-relaxed">
                <li>• Nurturing responsible digital citizens</li>
                <li>• Safe and ethical technology usage</li>
                <li>• Digital literacy for learning and creativity</li>
                <li>• Balanced screen time and healthy habits</li>
              </ul>
            </div>

          </div>
        </div>

        {/* initiatives */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Special Initiatives
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <InfoCard
              title="Kalpvriksh – Social Service Initiative"
              text="Helping Hands inspires social responsibility and empathy,
              guiding children to become agents of positive change."
            />
            <InfoCard
              title="Saturday – No Bag Day"
              text="A joyful learning experience beyond textbooks, promoting
              creativity, fun, and experiential learning every Saturday."
            />
          </div>
        </div>

        {/* health */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Health & Physical Education
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            The Healthy School Campaign is conducted in collaboration with the
            local Health Department to organize regular health check-up camps.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Physical education includes Yoga, Pranayama, Karate, and diverse
            sports led by specialists.
          </p>
        </div>

        {/* creativity */}
        <div className="bg-purple-50 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Creativity, Arts & Entrepreneurship
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4 text-center">
            Art & craft activities and project-based learning ignite imagination
            and experiential understanding.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <InfoCard
              title="Music & Dance"
              text="Music and dance foster joy, emotional expression, cultural
              values, and appreciation of India’s rich heritage."
            />
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="text-lg font-semibold text-purple-700 mb-2">
                Entrepreneurship Education
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm leading-relaxed">
                <li>• Problem identification and solution building</li>
                <li>• Creativity, innovation, and originality</li>
                <li>• Confidence, self-expression, and resilience</li>
                <li>• Developing self-sufficient individuals</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Primary;


function InfoCard({ title, text }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="text-lg font-semibold text-purple-700 mb-2">
        {title}
      </h3>
      <p className="text-gray-700 text-sm leading-relaxed">
        {text}
      </p>
    </div>
  );
}
