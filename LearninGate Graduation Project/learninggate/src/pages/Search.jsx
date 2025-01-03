import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { courseApi } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import { searchCourses } from "../utils/coursesOperations";
import { motion } from "framer-motion";
import { FaRegStar, FaStar } from "react-icons/fa";

function Search() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const { query } = useParams();

  const StarRating = ({ rating }) => {
    const stars = Array.from({ length: 5 }, (_, index) =>
      index < rating ? (
        <FaStar key={index} className="text-yellow-500" />
      ) : (
        <FaRegStar key={index} className="text-yellow-500" />
      )
    );
    return <div className="flex">{stars}</div>;
  };

  useEffect(() => {
    const getCourses = async () => {
      const res = await apiConnector("GET", courseApi.GET_GET_ALL_COURSES_API);
      const data = res?.data?.data;
      data.map((c) => (c.fakeRating = Math.floor(Math.random() * 3) + 3));
      setCourses(data);
    };
    getCourses();
  }, []);

  const filteredCourses = searchCourses(courses, query);

  return (
    <div className="mx-auto box-content w-full max-w-maxContentTab py-12 lg:max-w-maxContent">
      <h2 className="text-black mb-6 text-3xl font-bold">Popular Courses</h2>
      <div className="flex flex-wrap -mx-4">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={index}
            className="w-full md:w-1/3 p-4"
            whileHover={{ scale: 1.05 }}
          >
            <div
              onClick={() => navigate(`/courses/${course._id}`)}
              className="bg-white shadow-lg rounded-lg cursor-pointer overflow-hidden transition-transform duration-300"
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
                <div className="flex items-center">
                  <StarRating rating={course.fakeRating} />
                  <span className="ml-2 text-gray-600">
                    ({course.fakeRating}/5)
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Search;
