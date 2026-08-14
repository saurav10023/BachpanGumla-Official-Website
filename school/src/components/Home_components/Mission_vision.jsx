import React from "react";
import { FaEye, FaBullseye, FaAward } from "react-icons/fa";
import clip from "./files/clip-removebg-preview.png"
export default function VisionMission() {
  return (
    <section className="bg-[#f6f4ff] py-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* title */}
        <div className="text-center mb-15">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-700">
            Our Foundation
          </h2>
          <p className="text-gray-600 mt-3 mb-3 text-xl">
            Building young minds with purpose, passion, and principles
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <Card
            icon={<FaEye />}
            title="Vision"
            text="To create a nurturing and inspiring learning environment that empowers children to become confident, compassionate, and lifelong learners."
          />

          <Card
            icon={<FaBullseye />}
            title="Mission"
            text="Our mission is to provide holistic education through innovative teaching, moral values, and a child-centric approach to learning."
          />

          <Card
            icon={<FaAward />}
            title="Values"
            text="We value integrity, respect, creativity, inclusiveness, and excellence in every aspect of a child’s development."
          />

        </div>
      </div>
    </section>
  );
}

function Card({ icon, title, text }) {
  return (
    <div className="relative bg-white rounded-xl shadow-lg pt-14 pb-10 px-6 text-center transition hover:-translate-y-2 hover:shadow-2xl">

      {/* CLIP / PIN */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-6 bg-gray-900 rounded-md"></div>
      <div className="absolute -top-15 left-1/2 -translate-x-1/2 text-gray-700 text-2xl h-30 w-30 z-10">
        <img src={clip} alt="clip" />
      </div>

      <div className="absolute top-0 left-0 w-full h-2 bg-indigo-500 rounded-t-xl"></div>

      <div className="text-indigo-500 text-4xl mb-4 flex justify-center">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {title}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed">
        {text}
      </p>
    </div>
  );
}
