import React, { useState } from "react";

const faqs = [
  {
    question: "How can I contact the school office?",
    answer:
      "You can contact the school office by phone or email during regular school hours.",
  },
  {
    question: "Can we meet the school management?",
    answer:
      "Yes, meetings with the school management can be arranged. Please contact the school's office to schedule an appointment.",
  },
  {
    question: "Where can we apply for school jobs?",
    answer:
      'Job applications can be submitted through the "Careers" section on our official website.',
  },
  {
    question: "Where can we apply for admission?",
    answer:
      "Admissions can be applied for online via our official website or in person at the school's admissions office.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-16 max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-indigo-200 rounded-xl shadow-sm bg-white"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-gray-800 hover:bg-indigo-50 rounded-xl transition"
            >
              <span>{faq.question}</span>
              <span className="text-indigo-600 text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600 text-left">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
