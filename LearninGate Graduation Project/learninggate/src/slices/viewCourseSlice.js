import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courseSectionData: [],
  courseEntireData: [],
  completedLectures: [],
  totalNoOfLectures: 0,
  courseData: null,
  completedVideos: [],
  totalNoOfVideos: 0,
};

const viewCourseSlice = createSlice({
  name: 'viewCourse',
  initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload;
    },
    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload;
    },
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload;
    },
    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload;
    },
    updateCompletedLectures: (state, action) => {
      state.completedLectures = [...state.completedLectures, action.payload];
    },
    setCourseData: (state, action) => {
      state.courseData = action.payload;
    },
    setCompletedVideos: (state, action) => {
      state.completedVideos = action.payload;
    },
    setTotalNoOfVideos: (state, action) => {
      state.totalNoOfVideos = action.payload;
    },
  },
});

export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
  setCourseData,
  setCompletedVideos,
  setTotalNoOfVideos,
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;
