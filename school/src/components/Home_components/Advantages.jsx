import React from "react";
import {
  FaBookOpen,
  FaRunning,
  FaChalkboardTeacher,
  FaPuzzlePiece,
  FaBus,
  FaLeaf
} from "react-icons/fa";
import { Baby, BookOpen, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import clip from "./files/clip-removebg-preview.png";

export default function Advantages() {
  return (
    <section className="bg-linear-to-b from-[#f6f4ff] to-white py-2">
      <div className="max-w-6xl mx-auto px-6">

        {/* TITLE */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-600">
            Our Advantages
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            Why parents trust us for their child’s future
          </p>
        </div>

        {/* ADVANTAGES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          <AdvCard
            icon={<FaBookOpen />}
            title="Focused on Co-Curricular Activities"
            gradient="from-blue-500 to-indigo-600"
            border="border-blue-500"
          />

          <AdvCard
            icon={<FaLeaf />}
            title="Safe , Healthy and Healpful Environment"
            gradient="from-purple-500 to-fuchsia-600"
            border="border-purple-500"
          />

          <AdvCard
            icon={<FaRunning />}
            title="Boost Physical Activities"
            gradient="from-yellow-400 to-orange-500"
            border="border-yellow-400"
          />

          <AdvCard
            icon={<FaChalkboardTeacher />}
            title="Effective Learning Experience"
            gradient="from-red-500 to-rose-600"
            border="border-red-500"
          />

          <AdvCard
            icon={<FaPuzzlePiece />}
            title="Activity-Based Learning"
            gradient="from-green-400 to-emerald-600"
            border="border-green-400"
          />

          <AdvCard
            icon={<FaBus />}
            title="Comfortable Transport Service"
            gradient="from-violet-500 to-indigo-600"
            border="border-violet-500"
          />

        </div>
      </div>

    {/* courses */}
<section className="bg-white py-16 md:py-24">
  <div className="max-w-6xl mx-auto px-6">

    {/* Heading */}
    <div className="text-center mb-14 md:mb-20">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        Courses Offered
      </h2>
      <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
        Learning opportunities designed specifically for each stage of early education
      </p>
    </div>

    <div className="relative">

      {/* Desktop center line */}
      <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-gray-200" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">

        <CourseStep
          icon={<Baby size={28} />}
          title="Play Group"
          subtitle="Age Group 1.5+"
          text="The Play Group course offers a safe, playful environment that supports early learning and social development"
          path="/courses/playgroup"
        />

        <CourseStep
          icon={<BookOpen size={28} />}
          title="Nursery • LKG • UKG"
          subtitle="Age-- Nursery-3+ • LKG-4+ • UKG-5+"
          text="Designed to build strong early learning foundations through age-appropriate activities, creativity, and guided play."
          path="/courses/nursery"
        />

        <CourseStep
          icon={<GraduationCap size={28} />}
          title="Primary School"
          subtitle="Age-6+"
          text="A well-rounded primary program that builds strong academic foundations while nurturing curiosity, confidence, and character."
          path = "/courses/primary"
        />

      </div>
    </div>
  </div>
</section>



  </section>
  );
}

function AdvCard({ icon, title, gradient, border }) {
  return (
    <div
      className="
        group
        bg-white
        rounded-xl
        shadow-sm
        transition-all duration-300

        /* MOBILE */
        flex items-center gap-4 p-4

        /* DESKTOP */
        md:flex-col md:text-center md:p-6
        md:rounded-2xl
        md:shadow-md md:hover:shadow-xl md:hover:-translate-y-2
      "
    >
      <div
        className={`
          shrink-0
          w-12 h-12
          rounded-full
          bg-linear-to-br ${gradient}
          flex items-center justify-center
          shadow

          md:w-20 md:h-20
          md:mb-3
          md:group-hover:scale-110
          transition
        `}
      >
        <span className="text-white text-xl md:text-3xl">
          {icon}
        </span>
      </div>

      <div
        className={`
          px-2 py-1
          border ${border}
          rounded-lg
          font-medium
          text-gray-800
          text-sm

          md:px-4 md:py-3
          md:border-2
          md:rounded-xl
          md:text-base
        `}
      >
        {title}
      </div>
    </div>
  );
}




function CourseStep({ icon, title, subtitle, text, path }) {
  return (
    <div className="relative md:text-center">

      {/* Mobile vertical line */}
      <div className="md:hidden absolute left-5 top-12 bottom-0 w-px bg-gray-200" />

      {/* Icon */}
      <div className="relative z-10 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center md:mx-auto shadow-md">
        {icon}
      </div>

      {/* Content */}
      <div className="mt-4 pl-14 md:pl-0">
        <h3 className="text-lg font-semibold text-gray-900">
          {title}
        </h3>

        <p className="text-sm font-medium text-indigo-600 mt-1">
          {subtitle}
        </p>

        <p className="text-sm text-gray-600 mt-3 leading-relaxed max-w-sm md:mx-auto">
          {text}
        </p>

        {/* CTA */}
        <Link
          to={path}
          className="
            inline-flex items-center gap-2
            mt-4
            text-sm font-semibold
            text-indigo-600
            hover:text-indigo-700
            transition
          "
        >
          See more
          <span className="text-lg">→</span>
        </Link>
      </div>
    </div>
  );
}


