import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';

export default function Instructor() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const instructorApiData = await getInstructorData(token);
        const result = await fetchInstructorCourses(token);
        if (instructorApiData) setInstructorData(instructorApiData);
        if (result) setCourses(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    })();
  }, [token]);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  return (
    <div>
      <div style={{ marginBottom: '0.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
          Hi {user?.firstName}
        </h1>
        <p style={{ fontWeight: '500', color: '#4b5563' }}>
          Let's start something new
        </p>
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : courses.length > 0 ? (
        <div>
          <div style={{ marginTop: '1rem', display: 'flex', height: '450px', gap: '1rem' }}>
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={instructorData} />
            ) : (
              <div style={{ flex: '1', borderRadius: '0.375rem', backgroundColor: '#f3f4f6', padding: '1.5rem' }}>
                <p style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1f2937' }}>
                  Visualize
                </p>
                <p style={{ marginTop: '1rem', fontSize: '1.5rem', fontWeight: '500', color: '#6b7280' }}>
                  Not Enough Data To Visualize
                </p>
              </div>
            )}
            <div style={{ minWidth: '250px', display: 'flex', flexDirection: 'column', borderRadius: '0.375rem', backgroundColor: '#f3f4f6', padding: '1.5rem' }}>
              <p style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1f2937' }}>
                Statistics
              </p>
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <p style={{ fontSize: '1.125rem', color: '#4b5563' }}>
                    Total Courses
                  </p>
                  <p style={{ fontSize: '1.875rem', fontWeight: '600', color: '#6b7280' }}>
                    {courses.length}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '1.125rem', color: '#4b5563' }}>
                    Total Students
                  </p>
                  <p style={{ fontSize: '1.875rem', fontWeight: '600', color: '#6b7280' }}>
                    {totalStudents}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '1.125rem', color: '#4b5563' }}>
                    Total Income
                  </p>
                  <p style={{ fontSize: '1.875rem', fontWeight: '600', color: '#6b7280' }}>
                    EGP {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderRadius: '0.375rem', backgroundColor: '#f3f4f6', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1f2937' }}>
                Your Courses
              </p>
              <Link to="/dashboard/my-courses">
                <p style={{ fontSize: '0.75rem', fontWeight: '600', color: '#fbbf24' }}>
                  View All
                </p>
              </Link>
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'start', gap: '1.5rem' }}>
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} style={{ width: '33.33%' }}>
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    style={{ height: '201px', width: '100%', borderRadius: '0.375rem', objectFit: 'cover' }}
                  />
                  <div style={{ marginTop: '0.75rem', width: '100%' }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4b5563' }}>
                      {course.courseName}
                    </p>
                    <div style={{ marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <p style={{ fontSize: '0.75rem', fontWeight: '500', color: '#6b7280' }}>
                        {course.studentsEnroled.length} students
                      </p>
                      <p style={{ fontSize: '0.75rem', fontWeight: '500', color: '#6b7280' }}>
                        |
                      </p>
                      <p style={{ fontSize: '0.75rem', fontWeight: '500', color: '#6b7280' }}>
                        EGP {course.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: '2.5rem', borderRadius: '0.375rem', backgroundColor: '#f3f4f6', padding: '1.5rem', paddingBottom: '5rem' }}>
          <p style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
            You have not created any courses yet
          </p>
          <Link to="/dashboard/add-course">
            <p style={{ marginTop: '0.25rem', textAlign: 'center', fontSize: '1.125rem', fontWeight: '600', color: '#fbbf24' }}>
              Create a course
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
