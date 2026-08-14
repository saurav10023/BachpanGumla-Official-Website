import React from "react";
import banner from "./files/bannernursery.png";

const Nursery = () => {
  return (
    <div className="bg-indigo-50 px-4 md:px-10">

      {/*mobile header*/}
      <div className="lg:hidden">
        <div className="relative w-full h-55 rounded-xl overflow-hidden mt-4">
          <img
            src={banner}
            alt="banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-2xl font-bold text-white">
              Kindergarten (Foundational -1)
            </h1>
            <p className="mt-1 text-sm font-medium text-white/90">
              Nursery • LKG • UKG
            </p>
          </div>
        </div>
      </div>

      {/* desktop header */}
      <div className="hidden lg:block">
        <div className="w-full h-auto">
          <img src={banner} alt="banner" />
        </div>
      </div>

      <div className="max-w-6xl py-5 mx-auto">

        {/*  title desktop*/}
        <div className="hidden lg:block text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-700">
            Kindergarten (Foundational -1)
          </h1>
          <p className="mt-2 text-lg font-medium text-gray-600">
            Nursery • LKG • UKG
          </p>
        </div>


        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            At <span className="font-semibold">BTLK</span>, we believe that every
            child is unique and develops at their own pace. Our activities are
            designed to cater to different learning styles and provide all
            children with the support they need to succeed.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We encourage parents to actively participate in their children's
            development by playing, reading books, exploring nature, and
            building strong bonds through positive daily interactions.
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Curriculum Overview
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Language & Literacy (English / हिंदी)",
                desc:
                  "Children develop reading, writing, speaking, and listening skills through phonics and मात्रा (ध्वनि)."
              },
              {
                title: "EVS / Social Studies",
                desc:
                  "Children explore surroundings, life skills, and harmony with nature."
              },
              {
                title: "Mathematics",
                desc:
                  "Basic concepts like big-small, more-less, and numbers 0–9."
              },
              {
                title: "Science",
                desc:
                  "Encourages questioning, observation, and independent discovery."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-5">
                <h3 className="text-lg font-semibold text-purple-700 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* activities */}
        <div className="bg-purple-50 rounded-2xl p-6 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Learning Through Activities
          </h2>

          <ul className="space-y-3 text-gray-700 text-sm md:text-base">
            <li><strong>Circle Time:</strong> Vocabulary & discussions</li>
            <li><strong>Art & Craft:</strong> Creativity & fine motor skills</li>
            <li><strong>Music & Dance:</strong> Emotional expression</li>
            <li><strong>ICT:</strong> Age-appropriate digital exposure</li>
          </ul>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Special Initiatives
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="text-lg font-semibold text-purple-700 mb-2">
                Saturday – No Bag Day
              </h3>
              <p className="text-gray-700 text-sm">
                Creativity-filled experiential learning.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="text-lg font-semibold text-purple-700 mb-2">
                Kalpvriksh – Social Service
              </h3>
              <p className="text-gray-700 text-sm">
                Building compassion and responsibility.
              </p>
            </div>
          </div>
        </div>

        {/* health */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Physical Education & Health
          </h2>
          <p className="text-gray-700 mb-3">
            Yoga, drills, karate, and sports by trained specialists.
          </p>
          <p className="text-gray-700">
            <strong>Healthy School Campaign:</strong> Regular health check-ups.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Nursery;
