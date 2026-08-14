import banner from "./files/aboutbanner.png";

const AboutUs = () => {
  return (
    <section className="bg-[#f6faf9] px-4 sm:px-6 md:px-12">

      {/*  MOBILE HERO */}
      <div className="lg:hidden">
        <div className="relative w-full h-60 rounded-xl overflow-hidden mt-4">
          <img
            src={banner}
            alt="banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-4">
            <h1 className="text-2xl font-bold text-white">
              About Us
            </h1>
          </div>
        </div>
      </div>

      {/* desktop banner */}
      <div className="hidden lg:block">
        <img src={banner} alt="banner" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 py-6">

        {/* left content */}
        <div className="lg:col-span-2 space-y-10">

          <div>
            <h2 className="hidden lg:block text-3xl font-semibold text-[#2b7a78] mb-4">
              About Us
            </h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>Bachpan, The Little Kingdom</strong> is a renowned educational
              institution in Gumla, Jharkhand, committed to shaping young minds
              through quality education and holistic development. Since our
              inception, we have believed that education is not just about
              academics, but about nurturing great human beings in a safe,
              joyful, and inspiring learning environment.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Our student-centric approach encourages curiosity, confidence,
              and creativity, ensuring that learning is engaging, meaningful,
              and aligned with each child’s interests.
            </p>
          </div>

          {/* OUR CURRICULUM */}
          <div>
            <h3 className="text-2xl font-semibold text-[#2b7a78] mb-3">
              Our Curriculum
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Our curriculum is meticulously designed to equip children with
              essential 21st-century skills required for success in an
              interconnected world. It fosters critical thinking,
              problem-solving, creativity, and collaboration, while being
              grounded in strong moral values and sensitivity to India’s rich
              cultural heritage.
            </p>
          </div>

          {/* FACILITIES */}
          <div>
            <h3 className="text-2xl font-semibold text-[#2b7a78] mb-3">
              Our Facilities
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We offer a state-of-the-art, lush green campus with well-ventilated
              classrooms, a library, computer and science laboratories, and a
              spacious playground. Sports facilities include table tennis,
              badminton, volleyball, and track activities, supporting students’
              physical and mental well-being.
            </p>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-8">

          <InfoCard
            title="Our Mission"
            text="To provide a nurturing and stimulating environment that empowers
            students to become confident, creative, and responsible individuals,
            ready to contribute positively to society and the nation."
          />

          <InfoCard
            title="Infrastructure & Technology"
            text="Our school is equipped with modern, technology-based systems that
            promote innovation and smart learning. Continuous investment in
            infrastructure ensures a safe, energetic, and future-ready
            educational environment."
          />

        </div>
      </div>
    </section>
  );
};

export default AboutUs;


function InfoCard({ title, text }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 transition hover:-translate-y-1 hover:shadow-xl">
      <h4 className="text-xl font-semibold text-[#2b7a78] mb-3">
        {title}
      </h4>
      <p className="text-gray-700 leading-relaxed">
        {text}
      </p>
    </div>
  );
}
