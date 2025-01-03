const BASE_URL = "http://localhost:4000/api/v1";

export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
};

// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
};

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  GET_RANDOM_COURSE_API: BASE_URL + "/course/getRandomCourses",
  GET_TOP_COURSE_API: BASE_URL + "/course/getTopEnrollments",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/course/createRating",
};

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
  RANDOM_REVIEWS_API: BASE_URL + "/course/getRandomRating",
  POST_CREATE_REVIEW_API: BASE_URL + "/course/createRating",
};

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",
};

export const categoriesData = {
  CATEGORIESPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
};
// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
};

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
};

// COURSE PROGRESS API
export const courseProgressApi = {
  POST_MARK_SUBSECTION_AS_COMPLETED:
    BASE_URL + "/courseprogress/marksubsectionascompleted",
};

// COURSE API
export const courseApi = {
  GET_GET_ALL_COURSES_API: BASE_URL + "/course/getAllCourses",
  GET_GET_COURSE_DATA_API: BASE_URL + "/course/getcourse", // /courseId
  POST_GET_FULL_DETAILS_OF_COURSE: BASE_URL + "/course/getfullcoursedetails",
  POST_CREATE_COURSE_API: BASE_URL + "/course",
  PUT_EDIT_COURSE_API: BASE_URL + "/course/editcourse",
  DELETE_DELETE_COURSE_API: BASE_URL + "/course/deletecourse",
  POST_GET_ENROLLED_COURSE_DATA: BASE_URL + "/course/getenrolledcoursedata",
};

// OTHER API
export const otherApi = {
  POST_CONTACT_US: BASE_URL + "/other/contactus",
};

// PAYMENT API
export const paymentApi = {
  POST_CREATE_ORDER_API: BASE_URL + "/payments/createOrder",
  POST_VERIFY_PAYMENT_SIGNATURE_API:
    BASE_URL + "/payments/verifypaymentsignature",
  POST_SEND_PAYMENT_SUCCESS_EMAIL_API:
    BASE_URL + "/payments/sendpaymentsuccessemail",
};

// PROFILE API
export const profileApi = {
  PUT_UPDATE_PROFILE_API: BASE_URL + "/profiles ",
};

// REVIEW API
export const reviewApi = {
  GET_GET_ALL_REVIEWS_API: BASE_URL + "/reviews/getallreviews",
  POST_GET_REVIEW_API: BASE_URL + "/reviews/getreview",
  POST_GET_ALL_REVIEWS_OF_COURSE_API: BASE_URL + "/reviews/getreviewsofcourse",
  POST_CREATE_REVIEW_API: BASE_URL + "/course/createRating",
  DELETE_DELETE_REVIEW_API: BASE_URL + "/reviews/deletereview",
};

// SECTION API
export const sectionApi = {
  POST_CREATE_SECTION_API: BASE_URL + "/sections",
  PUT_UPDATE_SECTION_API: BASE_URL + "/sections",
  DELETE_DELETE_SECTION_API: BASE_URL + "/sections",
};

// SUBSECTION API
export const subsectionApi = {
  POST_CREATE_SUBSECTION_API: BASE_URL + "/subsections",
  PUT_UPDATE_SUBSECTION_API: BASE_URL + "/subsections",
  DELETE_DELETE_SUBSECTION_API: BASE_URL + "/subsections",
};

// USER API
export const userApi = {
  GET_GET_ALL_USERS_API: BASE_URL + "/users",
  GET_GET_USER_API: BASE_URL + "/users/getuser", // /userId
  PUT_CHANGE_AVATAR_API: BASE_URL + "/users/changeavatar",
  GET_GET_ENROLLED_COURSES_API: BASE_URL + "/users/getenrolledcourses",
  GET_GET_CREATED_COURSES_API: BASE_URL + "/users/getcreatedcourses",
  GET_GET_INSTRUCTOR_DASHBOARD_DATA_API:
    BASE_URL + "/users/getinstructordashboarddata",
  GET_GET_ALL_REVIEWS_BY_USER_API: BASE_URL + "/users/getallreviews",
  DELETE_DELETE_CURRENT_USER_API: BASE_URL + "/users/deletecurrentuser",
  GET_CURRENT_LOGGED_USER_API: BASE_URL + "/users/currentuser",
};
