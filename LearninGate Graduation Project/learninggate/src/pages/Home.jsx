import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
import HighlightText from "../components/core/HomePage/HighlightText";
import HomePagePic from "../assets/Images/HomePage.png";
import { useNavigate } from "react-router-dom";
import { MdOutlineRateReview } from "react-icons/md";
import {
  getRandomCourses,
  getTopEnrollments,
  getRandomReviews,
} from "../services/operations/courseDetailsAPI";
const Home = () => {
  const navigate = useNavigate();
  const [randomReviews, setRandomReviews] = useState([]);
  const [randomCourses, setRandomCourses] = useState([]);
  const [topCourses, setTopCourses] = useState([]);

  useEffect(() => {
    const randomReviews = async () => {
      const Reviews = await getRandomReviews();
      setRandomReviews(Reviews);
    };

    const getRandom = async () => {
      const courses = await getRandomCourses();
      setRandomCourses(courses);
    };

    const getTop = async () => {
      const courses = await getTopEnrollments();

      setTopCourses(courses);
    };
    randomReviews();
    getRandom();
    getTop();
  }, []);

  return (
    <React.Fragment>
      <div className="mx-auto box-content w-full max-w-maxContentTab py-12 lg:max-w-maxContent flex items-center justify-between gap-8 mt-16">
        <motion.div
          className="w-1/2"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-black text-4xl font-bold">
            Step forward for
            <HighlightText text={"your future"} />
          </h2>
          <p className="text-black mt-4 text-lg">
            Learn new skills for your present and your future. Explore courses
            that fit your passion and peace.
          </p>
        </motion.div>
        <motion.div
          className="w-2/5"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={HomePagePic}
            className="w-full rounded-lg shadow-lg"
            alt="Homepage"
          />
        </motion.div>
      </div>

      <div className="mx-auto box-content w-full max-w-maxContentTab py-12 lg:max-w-maxContent">
        <h2 className="text-black mb-6 text-3xl font-bold">
          Courses to get started
        </h2>
        <div className="flex flex-wrap -mx-4">
          {randomCourses?.map((course, index) => (
            <motion.div
              key={index}
              className="w-full md:w-1/3 p-4"
              whileHover={{ scale: 1.05 }}
            >
              <div
                onClick={() => navigate(`/courses/${course._id}`)}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={course.thumbnail}
                  alt={course.courseName}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {course.courseName}
                  </h3>
                  <h5 className="text-lg font-semibold mb-2">
                    {course.instructor?.firstName} {course.instructor?.lastName}
                  </h5>
                  <div className="flex items-center">
                    <span className="ml-2 text-gray-600">
                      EGP {course.price}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mx-auto box-content w-full max-w-maxContentTab py-12 lg:max-w-maxContent">
        <h2 className="text-black mb-6 text-3xl font-bold">Top Enrollments</h2>
        <div className="flex flex-wrap -mx-4">
          {topCourses?.map((course, index) => (
            <motion.div
              key={index}
              className="w-full md:w-1/3 p-4"
              whileHover={{ scale: 1.05 }}
            >
              <div
                onClick={() => navigate(`/courses/${course._id}`)}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={course.thumbnail}
                  alt={course.courseName}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {course.courseName}
                  </h3>
                  <h5 className="text-lg font-semibold mb-2">
                    {course.instructor?.firstName} {course.instructor?.lastName}
                  </h5>
                  <div className="flex items-center">
                    <span className="ml-2 text-gray-600">
                      EGP {course.price}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-14 w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-black">
        <InstructorSection />

        {/* Reviews Section */}
        <h1 className="text-center text-3xl lg:text-4xl font-bold mt-8 flex justify-center items-center gap-x-3">
          Reviews from other learners{" "}
          <MdOutlineRateReview className="text-yellow-500" />
        </h1>
        <div className="review-slider">
          <ReviewSlider reviews={randomReviews} />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </React.Fragment>
  );
};

export default Home;
