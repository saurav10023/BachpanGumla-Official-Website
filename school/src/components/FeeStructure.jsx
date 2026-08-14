import React from "react";

const FeeStructure = () => {
  return (
    <div className="bg-indigo-50 px-4 md:px-10">
      <div className="max-w-5xl mx-auto py-12">

        {/* header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700 tracking-wide">
            Fee Structure
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-600 font-medium">
            New Admission Fee Structure – Session {new Date().getFullYear()}–{new Date().getFullYear()+1}
          </p>
        </div>

        <InfoCard />

        {/*admssion fee section */}
        <Section number="01" title="Admission Fees">
          <FeeRow label="Prospectus & Form" value="₹ 200" />
          <FeeRow label="Admission Fee (One Time)" value="₹ 7,000" />
          <FeeRow label="Annual Activity Fee" value="₹ 4,000" />
          <FeeRow label="Smart Class & School App (Annual)" value="₹ 1,500" />
        </Section>

        

        <Section number="02" title="Monthly Tuition Fee">
          <MonthlyFeeList />
        </Section>

        <Section number="03" title="Additional Charges">
          <FeeRow label="Karate, Dance, Music & Yoga" value="₹ 50 / month" />
          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            Transportation Fee (As per distance):
            <br />
            <span className="font-medium">
              ₹ 750, 800, 850, 950, 1000, 1100
            </span>
          </p>
        </Section>

        <Section number="04" title="Documents Required">
          <DocumentList />
        </Section>

      </div>
    </div>
  );
};

export default FeeStructure;


function InfoCard() {
  return (
    <div className="bg-white rounded-3xl shadow-md p-8 mb-14 text-center space-y-2">
      <h2 className="text-xl md:text-2xl font-bold text-purple-700">
        Bachpan – The Little Kingdom, Gumla
      </h2>
      <p className="text-gray-600 text-sm md:text-base">
        Governed & Managed by KALPATARU Edu. and Charitable Trust
      </p>
      <p className="text-gray-600 text-sm">
        Play School – Behind Old State Bus Depot, Lohardaga Road, Dunduria, Gumla
      </p>
      <p className="text-gray-600 text-sm">
        Primary School – Old DAV Campus, Bank Colony, Dunduria, Gumla, Jharkhand – 835207
      </p>
      <p className="text-gray-600 text-sm pt-2">
        U-DISE: <span className="font-medium">20160819409</span> | Contact:{" "}
        <span className="font-medium">9608881888</span>
      </p>
    </div>
  );
}

function Section({ number, title, children }) {
  return (
    <div className="bg-white rounded-3xl shadow-md p-7 md:p-9 mb-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-700 font-bold">
          {number}
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-purple-700">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function FeeRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-4 border-b last:border-none text-gray-700">
      <span className="text-sm md:text-base leading-relaxed w-2/3">
        {label}
      </span>
      <span className="text-sm md:text-base font-semibold text-gray-900">
        {value}
      </span>
    </div>
  );
}


function MonthlyFeeList() {
  const data = [
    ["Play Group", "2–3 Years", "₹ 1500"],
    ["Nursery", "3–4 Years", "₹ 1550"],
    ["LKG", "4–5 Years", "₹ 1600"],
    ["UKG", "5–6 Years", "₹ 1650"],
    ["Class 1", "6–7 Years", "₹ 1700"],
    ["Class 2", "-", "₹ 1700"],
    ["Class 3", "-", "₹ 1750"],
    ["Class 4", "-", "₹ 1750"],
    ["Class 5", "-", "₹ 1850"],
    ["Class 6", "-", "₹ 1900"],
    ["Class 7", "-", "₹ 1950"],
  ];

  return (
    <div className="space-y-3">
      {data.map(([cls, age, fee], i) => (
        <div
          key={i}
          className="bg-gray-50 rounded-xl p-4 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold text-gray-800">{cls}</p>
            <p className="text-xs text-gray-500">{age}</p>
          </div>
          <p className="font-bold text-purple-700">{fee}</p>
        </div>
      ))}
    </div>
  );
}

function DocumentList() {
  return (
    <ul className="space-y-3 text-gray-700 text-sm md:text-base leading-relaxed">
      <li>• Passport size photographs (Student – 6, Mother – 3, Father – 3)</li>
      <li>• Aadhar Number of Student & Parents</li>
      <li>• Birth Certificate (Govt. Office / Hospital)</li>
      <li>• Blood Group</li>
    </ul>
  );
}
