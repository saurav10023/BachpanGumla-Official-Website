import React from "react";
import { Link } from "react-router-dom";

const Admission = () => {
  return (
    <div className="bg-indigo-50  py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-700">
            Admission Procedure
          </h1>
          <p className="mt-2 text-lg font-medium text-gray-600">
            Online & Offline Registration Process
          </p>
        </div>

        {/* Online Admission */}
        <div className="mb-10 text-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Online Admission / Registration
          </h2>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              Complete the online application by submitting the required
              documents. Applicants may be required to attend an entrance test
              and interview for final selection.
            </p>

            <ul className="space-y-3 text-gray-700 text-sm md:text-base leading-relaxed">
              <li>
                • Visit the school website and click on the
                <span className="font-semibold"> “Admissions” </span>tab.
              </li>
              <li>
                • Fill in all required details including student information,
                parent/guardian details, and upload supporting documents.
              </li>
              <li>
                • Upload documents such as birth certificate, passport-size
                photographs, Aadhaar card copies, previous school transcripts,
                and other required records.
              </li>
              <li>
                • Ensure the date of birth and all sensitive information are
                entered correctly before submission.
              </li>
              <li>
                • Pay the application fee online using the secure payment
                gateway.
              </li>
              <li>
                • The admissions team will review your application and contact
                you if additional details are required.
              </li>
              <li>
                • Upon approval, you will receive an email with an admission
                offer letter, fee payment instructions, and document
                verification details.
              </li>
              <li>
                • Complete all formalities within the allotted time to confirm
                admission.
              </li>
              <li>
                • Transportation facilities can also be availed through the
                online helpdesk. Simply raise a query and our team will contact
                you.
              </li>
            </ul>
          </div>
        </div>

        {/* Offline Admission */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Offline Admission / Registration
          </h2>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              Parents may also opt for offline admission by visiting the school
              campus and completing the registration process in person.
            </p>

            <ul className="space-y-3 text-gray-700 text-sm md:text-base leading-relaxed">
              <li>
                • Collect the admission form from the school’s administrative
                office.
              </li>
              <li>
                • Carefully fill in the application form and attach all required
                documents as per the checklist.
              </li>
              <li>
                • Submit the completed form and documents during designated
                admission hours.
              </li>
              <li>
                • Pay the application fee at the administrative office.
              </li>
              <li>
                • The admissions team will review your application and contact
                you if further details are required.
              </li>
              <li>
                • If selected, you will receive an admission offer letter via
                phone call or in-person notification.
              </li>
              <li>
                • Complete fee payment and document verification within the
                given time frame to secure admission.
              </li>
            </ul>
          </div>
        </div>

        {/* Note */}
        <div className="bg-purple-50 rounded-xl p-5 mb-10">
          <p className="text-gray-700 text-sm md:text-base text-center leading-relaxed">
            Please note that the availability of online or offline admission
            may vary depending on the admission period and institutional
            guidelines.
          </p>
        </div>

        {/* Call To Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="https://btlk.scientificstudy.in/online/admissionenquiry?key=btlk&tab=admissionenquiry" >
          <button className="px-8 py-3 rounded-full border-2 border-purple-700 text-purple-700 font-semibold hover:bg-purple-700 hover:text-white transition">
            Admission Enquiry
          </button>
          </Link>

          <Link to="https://btlk.scientificstudy.in/online/registration?key=btlk&tab=registration">
          <button className="px-8 py-3 rounded-full border-2 border-purple-700 text-purple-700 font-semibold hover:bg-purple-700 hover:text-white transition">
            Register Online
          </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Admission;
