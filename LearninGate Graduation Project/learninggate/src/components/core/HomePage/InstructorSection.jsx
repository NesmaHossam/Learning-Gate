import React from 'react';
import { motion } from 'framer-motion';
import CTAButton from "../../../components/core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from './HighlightText';

const InstructorSection = () => {
  return (
    <div className="my-16">
      <div className="flex flex-col lg:flex-row gap-10 items-center">
        <motion.div 
          className="lg:w-1/2 w-full flex justify-center" 
          initial={{ opacity: 0, x: -100 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <img
            src={Instructor}
            alt="Instructor"
            className="w-4/4 lg:w-3/5 rounded-lg shadow-lg"
          />
        </motion.div>
        <motion.div 
          className="lg:w-1/2 flex gap-5 flex-col" 
          initial={{ opacity: 0, x: 100 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold">
            Become an
            <HighlightText text={"instructor"} />
          </h1>
          <p className="font-medium text-lg text-justify text-black">
            Instructors from around the world teach millions of students on Learning Gate. We provide the tools and skills to teach what you love.
          </p>
          <div className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex items-center gap-3">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InstructorSection;
