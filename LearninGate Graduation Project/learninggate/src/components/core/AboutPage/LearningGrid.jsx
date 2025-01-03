import React from "react";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningGridArray = [
  {
    id: 3,
    title: "Innovative Learning Methods",
    description:
      "Utilizing cutting-edge educational technology to deliver an engaging, interactive, and effective learning experience.",
    backgroundColor: "#EDE9FE",
    textColor: "#4B2C81",
  },
  {
    id: 4,
    title: "Global Certification",
    description:
      "Acquire globally recognized certifications that enhance your resume and validate your expertise to employers worldwide.",
    backgroundColor: "#D1FAE5",
    textColor: "#065F46",
  },
  {
    id: 5,
    title: "Automated Grading",
    description:
      "Experience our 'Auto-grading' system for instant feedback and streamlined evaluation processes.",
    backgroundColor: "#FEEBC8",
    textColor: "#8D2B0B",
  },
  {
    id: 6,
    title: "Career-Ready Skills",
    description:
      "Tailored courses designed to equip you with practical skills essential for excelling in your career from day one.",
    backgroundColor: "#D1EDF2",
    textColor: "#0E638F",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid mx-auto max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {LearningGridArray.map((item) => (
        <div
          key={item.id}
          className="rounded-lg overflow-hidden shadow-md bg-white p-6"
          style={{ backgroundColor: item.backgroundColor, color: item.textColor }}
        >
          <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
          <p className="text-base mb-4">{item.description}</p>
          {item.buttonText && (
            <CTAButton active={true} linkto={item.buttonLink}>
              {item.buttonText}
            </CTAButton>
          )}
        </div>
      ))}
    </div>
  );
};

export default LearningGrid;
