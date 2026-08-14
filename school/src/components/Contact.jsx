import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import FAQSection from "./Faq";

const ContactUs = () => {
  return (
    <section className="w-full bg-indigo-50 py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-700">
            Contact Us
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-base sm:text-lg">
            If you have any questions, simply use the following contact details
          </p>
        </div>

        {/* Contact*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Address */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-7">
            <div className="flex items-center gap-3 mb-5">
              <MapPin className="text-indigo-600 w-6 h-6" />
              <h3 className="text-lg sm:text-xl font-semibold text-indigo-700">
                Campuses
              </h3>
            </div>

            <p className="text-gray-700 mb-4 text-sm sm:text-base leading-relaxed">
              <span className="font-semibold">Play School Campus:</span><br />
              Old State Bus Depot, Dunduria,<br />
              Lohardaga Road, Gumla
            </p>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              <span className="font-semibold">Primary School Campus:</span><br />
              Bank Colony, Dunduria,<br />
              Lohardaga Road, Gumla
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-7">
            <div className="flex items-center gap-3 mb-5">
              <Mail className="text-indigo-600 w-6 h-6" />
              <h3 className="text-lg sm:text-xl font-semibold text-indigo-700">
                Email
              </h3>
            </div>
            <p className="text-gray-700 text-sm sm:text-lg wrap-break-word">
              bachpangumla@gmail.com
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-7">
            <div className="flex items-center gap-3 mb-5">
              <Phone className="text-indigo-600 w-6 h-6" />
              <h3 className="text-lg sm:text-xl font-semibold text-indigo-700">
                Phone
              </h3>
            </div>
            <p className="text-gray-700 text-sm sm:text-lg">
              1. +91 96088 81888
            </p>
            <p className="text-gray-700 text-sm sm:text-lg mt-1">
              2. +91 65243 18721
            </p>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            We’re happy to help you with admissions, queries, and visits.
          </p>

          <Link
            to="https://btlk.scientificstudy.in/online/admissionenquiry?key=btlk&tab=admissionenquiry"
            className="inline-block"
          >
            <button className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-8 py-3 sm:px-10 sm:py-4 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
              Get in Touch
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-16 sm:mt-20">
        <FAQSection />
      </div>
    </section>
  );
};

export default ContactUs;
