import { Link } from "react-router-dom";
import img from "./files/director.jpg";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram
} from "react-icons/fa";

const DirectorsMessage = () => {
  return (
    <section className="bg-[#f6faf9] py-12 md:py-16 px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* header */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text- mb-8 md:mb-10 text-center md:text-left">
          Director’s Message
        </h2>

        <div className="bg-white rounded-2xl shadow-md p-6 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-start">

          {/* image mobile first*/}
          <div className="flex flex-col items-center md:order-2">
            <div className="w-48 h-56 md:w-58 md:h-66 bg-gray-200 rounded-lg overflow-hidden mb-4">
              <img
                src={img}
                alt="Director"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-3 ">
              <div className="bg-[#2b7a78] rounded-full" >
                <SocialIcon
                Icon={FaFacebookF}
                add="https://www.facebook.com/profile.php?id=100004631889516&sk=photos"
                className="p-10"
              />
              </div>
              <div className="bg-[#2b7a78] rounded-full">
                <SocialIcon
                Icon={FaInstagram}
                add="https://www.instagram.com/bachpanthelittlekingdom?igsh=c2RnbTJudW51dWQx"
                className="p-10"
              />
              </div>
              <div className="bg-[#2b7a78] rounded-full" >
                <SocialIcon Icon={FaTwitter} className="p-10"/>
              </div>
            </div>
          </div>

          {/* message*/}
          <div className="md:col-span-2 text-gray-700 leading-relaxed space-y-4 md:order-1">

            <p className="md:indent-8">
              Dear Parents and Guardians,
            </p>

            <p className="md:indent-8">
              I, <strong>Chandra Shekhar Giri</strong>, Director of
              <strong> Bachpan, The Little Kingdom, Gumla, Jharkhand</strong>,
              have been serving this institute for several years. I strongly
              believe that education must be provided to all individuals,
              irrespective of their background, as it possesses the power to
              transform lives and uplift society.
            </p>

            <p className="md:indent-8">
              Education is a powerful tool that enlightens the rooms of
              darkness and nurtures wisdom. For this reason, our school ensures
              a safe and secure environment for both students and staff, where
              creativity, curiosity, and confidence can grow with time.
            </p>

            <p className="md:indent-8">
              Our sole aim is to empower pupils to think innovatively by
              focusing on both theoretical and practical aspects of learning.
              In today’s ever-evolving world, technology plays a vital role.
              Therefore, we have well-equipped laboratories and modern
              infrastructure, and we continue investing to keep our students
              aligned with new advancements.
            </p>

            <p className="md:indent-8">
              I firmly believe that motivated educators create empowered
              students. To ensure this, we organize various activities and
              competitions for our faculty and students alike. Such initiatives
              keep them active, confident, and inspired to give their best.
            </p>

            <p className="md:indent-8">
              While academics significantly influence a child’s development,
              extracurricular activities must not be ignored. A balanced
              approach between learning and recreation leads to mindful growth
              and overall excellence.
            </p>

            {/* SIGNATURE */}
            <div className="pt-6">
              <p className="font-semibold text-gray-900">Warm Regards,</p>
              <p className="font-bold text-[#2b7a78]">
                Chandra Shekhar Giri
              </p>
              <p className="text-sm text-gray-600">
                Director<br />
                Bachpan, The Little Kingdom<br />
                Gumla, Jharkhand
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};


function SocialIcon({ Icon, add = "" }) {
  return (
    <Link to={add}>
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-[#4b2a7a] flex items-center justify-center cursor-pointer
        transition transform hover:scale-110 hover:bg-indigo-100 hover:shadow-lg">
        <Icon />
      </div>
    </Link>
  );
}

export default DirectorsMessage;
