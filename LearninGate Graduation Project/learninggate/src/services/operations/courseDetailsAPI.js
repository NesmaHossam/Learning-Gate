import { toast } from "react-hot-toast";

import { updateCompletedLectures } from "../../slices/viewCourseSlice";
// import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { courseEndpoints, ratingsEndpoints } from "../apis";

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  GET_RANDOM_COURSE_API,
  GET_TOP_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints;

const { RANDOM_REVIEWS_API } = ratingsEndpoints;

export const getRandomReviews = async () => {
  try {
    const response = await apiConnector("GET", RANDOM_REVIEWS_API);
    if (!response?.data?.success) {
      throw new Error("Could not fetch random reviews.");
    }
    return response?.data?.data;
  } catch (error) {
    console.log("RANDOM_REVIEWS_API API ERROR", error);
    toast.error(error.message);
  }
};

export const getTopEnrollments = async () => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_TOP_COURSE_API);
    if (!response?.data?.success) {
      throw new Error("Could not fetch TOP course.");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_TOP_COURSE_API API ERROR", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getRandomCourses = async () => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_RANDOM_COURSE_API);
    if (!response?.data?.success) {
      throw new Error("Could not fetch random courses.");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_RANDOM_COURSE_API API ERROR", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getAllCourses = async () => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API);
    if (!response?.data?.success) {
      throw new Error("Could not fetch course categories.");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_ALL_COURSE_API API ERROR", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...");
  //   dispatch(setLoading(true));
  let result = null;
  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      courseId,
    });
    console.log("COURSE_DETAILS_API API RESPONSE", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
  } catch (error) {
    console.log("COURSE_DETAILS_API API ERROR", error);
    result = error.response.data;
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  //   dispatch(setLoading(false));
  return result;
};

// fetching the available course categories
export const fetchCourseCategories = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API);
    console.log("COURSE_CATEGORIES_API API RESPONSE", response);
    if (!response?.data?.success) {
      throw new Error("Could not fetch course categories.");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("COURSE_CATEGORY_API API ERROR", error);
    toast.error(error.message);
  }
  return result;
};

// add the course details
export const addCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE COURSE API RESPONSE", response);
    if (!response?.data?.success) {
      throw new Error("Could not add course details.");
    }
    toast.success("Course details has been added successfully.");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE COURSE API ERROR", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// edit the course details
export const editCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("EDIT COURSE API RESPONSE", response);
    if (!response?.data?.success) {
      throw new Error("Could not update course details.");
    }
    toast.success("Course details has been updated successfully.");
    result = response?.data?.data;
  } catch (error) {
    console.log("EDIT COURSE API ERROR", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// create a section
export const createSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE SECTION API RESPONSE", response);
    if (!response?.data?.success) {
      throw new Error("Could not create the section.");
    }
    toast.success("Course section has been created.");
    result = response?.data?.updatedCourse;
  } catch (error) {
    console.log("CREATE SECTION API ERROR", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// create a subsection
export const createSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE SUB-SECTION API RESPONSE", response);
    if (!response?.data?.success) {
      throw new Error("Could not add lecture.");
    }
    toast.success("Lecture has been added.");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// update a section
export const updateSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE SECTION API RESPONSE", response);
    if (!response?.data?.success) {
      throw new Error("Could not update the section.");
    }
    toast.success("Course section has been updated.");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE SECTION API ERROR", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// update a subsection
export const updateSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE SUB-SECTION API RESPONSE", response);
    if (!response?.data?.success) {
      throw new Error("Could not update the lecture.");
    }
    toast.success("Lecture has been updated.");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// delete a section
export const deleteSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE SECTION API RESPONSE", response);
    if (!response?.data?.success) {
      throw new Error("Could not delete the section.");
    }
    toast.success("Course section has been deleted.");
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE SECTION API ERROR", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
// delete a subsection
export const deleteSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE SUB-SECTION API RESPONSE", response);
    if (!response?.data?.success) {
      throw new Error("Could not delete the lecture.");
    }
    toast.success("Lecture has been succesfully deleted.");
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// fetching all courses under a specific instructor
export const fetchInstructorCourses = async (token) => {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("INSTRUCTOR COURSES API RESPONSE", response);
    if (!response?.data?.success) {
      throw new Error("Could not fetch instructor courses.");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("INSTRUCTOR COURSES API ERROR", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// delete a course
export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE COURSE API RESPONSE", response);
    if (!response?.data?.success) {
      throw new Error("Could not delete the course.");
    }
    toast.success("Course has been succesfully deleted.");
  } catch (error) {
    console.log("DELETE COURSE API ERROR", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
};

// get full details of a course
export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...");
  //   dispatch(setLoading(true));
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("COURSE_FULL_DETAILS_API API RESPONSE", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR", error);
    result = error.response.data;
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  //   dispatch(setLoading(false));
  return result;
};

// mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
  let result = null;
  console.log("mark complete data", data);
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("MARK_LECTURE_AS_COMPLETE_API API RESPONSE", response);

    if (!response.data.message) {
      throw new Error(response.data.error);
    }
    toast.success("Lecture has been completed.");
    result = true;
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR", error);
    toast.error(error.message);
    result = false;
  }
  toast.dismiss(toastId);
  return result;
};

// create a rating for course
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE RATING API RESPONSE", response);
    if (!response?.data?.success) {
      throw new Error(
        "Could not assign rating for an unknown reason. Try again later."
      );
    }
    toast.success("Rating has been created. Thank you!");
    success = true;
  } catch (error) {
    success = false;
    console.log("CREATE RATING API ERROR", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return success;
};
