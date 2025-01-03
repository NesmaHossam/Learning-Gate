const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getRandomCourses,
  getTopEnrollments,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
  getCourseDetailsForMe,
  getFullCourseDetailsForMe,
} = require("../controllers/Course");

const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category");

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/Subsection");

const {
  createRating,
  getAverageRating,
  getAllRating,
  getRandomRating,
} = require("../controllers/RatingAndReview");

const { updateCourseProgress } = require("../controllers/courseProgress");

const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth");

router.post("/createCourse", auth, isInstructor, createCourse);

router.post("/addSection", auth, isInstructor, createSection);

router.post("/updateSection", auth, isInstructor, updateSection);

router.post("/deleteSection", auth, isInstructor, deleteSection);

router.post("/updateSubSection", auth, isInstructor, updateSubSection);

router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

router.post("/addSubSection", auth, isInstructor, createSubSection);

router.get("/getAllCourses", getAllCourses);

router.get("/getRandomCourses", getRandomCourses);

router.get("/getTopEnrollments", getTopEnrollments);

router.post("/getCourseDetails", getCourseDetails);

router.get("/getCourseDetails/:courseId", getCourseDetailsForMe);

router.get("/getFullCourseDetailsForMe/:courseId", getFullCourseDetailsForMe);

router.post("/getFullCourseDetails", auth, getFullCourseDetails);

router.post("/editCourse", auth, isInstructor, editCourse);

router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);

router.delete("/deleteCourse", deleteCourse);

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);
router.get("/getRandomRating", getRandomRating);

module.exports = router;
