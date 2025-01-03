export const getTopCourses = (courses) => {
  return [...courses].sort((a, b) => b.price - a.price);
};

export const searchCourses = (courses, query) => {
  return [...courses].filter((c) =>
    c.courseName.toLowerCase().includes(query.toLowerCase())
  );
};
