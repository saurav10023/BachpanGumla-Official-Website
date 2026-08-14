import React from "react";
import heroImage from "./files/hero-boy2.png";
import brain from "./files/brain-logo.avif";
import growth from "./files/growth-icon-flat.avif";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-[#f6f4ff] relative overflow-hidden ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* left*/}
        <div className="flex flex-col justify-center text-center md:text-left">

          <p className="text-indigo-500 font-semibold mb-3 text-base sm:text-lg md:text-2xl">
            ✨ Welcome to Our School
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Nurturing Minds <br />
            <span className="text-indigo-600">
              Academically, Socially and Emotionally
            </span>
          </h1>

          {/* mobile hero */}
          <div className="relative flex justify-center mt-8 mb-6 md:hidden">
            <div className="absolute w-56 h-56 bg-pink-200 rounded-full z-10"></div>
            <div className="absolute w-52 h-64 bg-pink-400 rounded-full z-0 mt-6 ml-8"></div>

            <img
              src={heroImage}
              alt="Happy Student"
              className="relative z-10 max-h-72"
            />
          </div>

          <p className="text-gray-600 mt-5 max-w-md mx-auto md:mx-0 text-sm sm:text-base">
            We believe early childhood education should nurture curiosity,
            creativity, and confidence in a safe and joyful environment.
          </p>

          {/* button*/}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:flex gap-3 justify-center md:justify-start">
            <Link to="courses/playgroup">
              <button className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 transition">
                Play Group
              </button>
            </Link>
            <Link to="courses/nursery">
              <button className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 transition">
                Kindergarten
              </button>
            </Link>
            <Link to="courses/primary">
              <button className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 transition">
                Primary School
              </button>
            </Link>
          </div>

          {/* stats*/}
          <div className="grid grid-cols-3 gap-4 mt-10 text-center md:text-left bg-white/60 md:bg-transparent rounded-xl p-4 md:p-0">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">400+</h3>
              <p className="text-xs md:text-sm text-gray-600">Students</p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">25+</h3>
              <p className="text-xs md:text-sm text-gray-600">Qualified Teachers</p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">30+</h3>
              <p className="text-xs md:text-sm text-gray-600">Support Staff</p>
            </div>
          </div>
        </div>

        {/* desktop hero */}
        <div className="relative hidden md:flex justify-center">

          {/* background circles*/}
          <div className="absolute w-96 h-96 bg-pink-200 rounded-full z-10"></div>
          <div className="absolute w-80 h-96 bg-pink-400 rounded-full z-0 mt-6 ml-10"></div>

          <img
            src={heroImage}
            alt="Happy Student"
            className="relative z-10 max-h-130"
          />

          {/* floating icons for desktop*/}
          <div className="absolute top-10 right-10 bg-white shadow-lg rounded-full p-3 text-indigo-600 text-2xl">
            🎒
          </div>

          <div className="absolute bottom-24 left-6 bg-white shadow-lg rounded-full p-3 text-pink-500 text-3xl">
            📘
          </div>

          <div className="absolute bottom-0 right-6 bg-white shadow-lg rounded-full p-3 h-20 w-20">
            <img src={growth} alt="growth" />
          </div>

          <div className="absolute top-16 left-12 bg-white shadow-lg rounded-full p-3 h-14 w-14">
            <img src={brain} alt="brain" />
          </div>
        </div>
      </div>
    </section>
  );
}
