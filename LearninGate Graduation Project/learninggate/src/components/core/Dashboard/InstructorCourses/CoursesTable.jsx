import { useDispatch, useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"

import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import { formatDate } from "../../../../services/formatDate"
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../common/ConfirmationModal"

export default function CoursesTable({ courses, setCourses }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 30

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }


  return (
    <>
    <Table style={{ 
      borderRadius: '0.375rem',
      border: '1px solid #d1d5db',
    }}>
      <Thead>
        <Tr style={{ 
          display: 'flex',
          gap: '2.5rem', 
          borderRadius: '0.375rem 0.375rem 0 0', 
          borderBottom: '1px solid #d1d5db', 
          padding: '1rem 1.5rem' ,
          backgroundColor: '#b6a168',
          color: 'white' 
        }}>
          <Th style={{ 
            flex: '1',
            textAlign: 'left',
            fontSize: '0.875rem', 
            fontWeight: '500', 
            textTransform: 'uppercase', 
            
          }}>
            Courses
          </Th>
          <Th style={{ 
            textAlign: 'left',
            fontSize: '0.875rem', 
            fontWeight: '500', 
            textTransform: 'uppercase', 
            
          }}>
            Duration
          </Th>
          <Th style={{ 
            textAlign: 'left',
            fontSize: '0.875rem', 
            fontWeight: '500', 
            textTransform: 'uppercase', 
            
          }}>
            Price
          </Th>
          <Th style={{ 
            textAlign: 'left',
            fontSize: '0.875rem', 
            fontWeight: '500', 
            textTransform: 'uppercase', 
            
          }}>
            Actions
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {courses?.length === 0 ? (
          <Tr>
            <Td style={{ 
              padding: '2.5rem 1.5rem', 
              textAlign: 'center',
              fontSize: '1.875rem', 
              fontWeight: '500', 
              color: '#6b7280' 
            }}>
              No courses found
              {/* TODO: Need to change this state */}
            </Td>
          </Tr>
        ) : (
          courses?.map((course) => (
            <Tr
              key={course._id}
              style={{ 
                display: 'flex',
                gap: '2.5rem', 
                borderBottom: '1px solid #d1d5db', 
                padding: '1.5rem' 
              }}
            >
              <Td style={{ 
                display: 'flex',
                flex: '1',
                gap: '1rem' 
              }}>
                <img
                  src={course?.thumbnail}
                  alt={course?.courseName}
                  style={{ 
                    height: '148px', 
                    width: '220px', 
                    borderRadius: '0.375rem', 
                    objectFit: 'cover' 
                  }}
                />
                <div style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <p style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: '600', 
                    color: '#1f2937' 
                  }}>
                    {course.courseName}
                  </p>
                  <p style={{ 
                    fontSize: '0.75rem', 
                    color: '#6b7280' 
                  }}>
                    {course.courseDescription.split(" ").length > TRUNCATE_LENGTH
                      ? course.courseDescription
                          .split(" ")
                          .slice(0, TRUNCATE_LENGTH)
                          .join(" ") + "..."
                      : course.courseDescription}
                  </p>
                  <p style={{ 
                    fontSize: '0.75rem', 
                    color: '#ffffff' 
                  }}>
                    Created: {formatDate(course.createdAt)}
                  </p>
                  {course.status === COURSE_STATUS.DRAFT ? (
                    <p style={{ 
                      display: 'flex',
                      gap: '0.5rem', 
                      alignItems: 'center',
                      borderRadius: '1rem', 
                      backgroundColor: '#080474', 
                      padding: '0.25rem 0.5rem', 
                      fontSize: '0.75rem', 
                      fontWeight: '500', 
                      color: '#fbbf24' 
                    }}>
                      <HiClock style={{ fontSize: '0.875rem' }} /> Drafted
                    </p>
                  ) : (
                    <p style={{ 
                      display: 'flex',
                      gap: '0.5rem', 
                      alignItems: 'center',
                      borderRadius: '1rem', 
                      backgroundColor: '#080474', 
                      padding: '0.25rem 0.5rem', 
                      fontSize: '0.75rem', 
                      fontWeight: '500', 
                      color: '#fbbf24' 
                    }}>
                      <div style={{ 
                        display: 'flex',
                        height: '0.75rem', 
                        width: '0.75rem', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '0.375rem', 
                        backgroundColor: '#fbbf24', 
                        color: '#1f2937' 
                      }}>
                        <FaCheck style={{ fontSize: '0.5rem' }} />
                      </div>
                      Published
                    </p>
                  )}
                </div>
              </Td>
              <Td style={{ 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                color: '#6b7280' 
              }}>
                EGP {course.price}
              </Td>
              <Td style={{ 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                color: '#6b7280' 
              }}>
                <button
                  disabled={loading}
                  onClick={() => {
                    navigate(`/dashboard/edit-course/${course._id}`)
                  }}
                  title="Edit"
                  style={{ 
                    padding: '0.5rem', 
                    transition: 'all 0.2s', 
                    cursor: 'pointer', 
                    color: '#3b82f6' 
                  }}
                >
                  <FiEdit2 style={{ fontSize: '1.25rem' }} />
                </button>
                <button
                  disabled={loading}
                  onClick={() => {
                    setConfirmationModal({
                      text1: "Do you want to delete this course?",
                      text2: "All the data related to this course will be deleted",
                      btn1Text: !loading ? "Delete" : "Loading...  ",
                      btn2Text: "Cancel",
                      btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => {},
                      btn2Handler: !loading ? () => setConfirmationModal(null) : () => {},
                    })
                  }}
                  title="Delete"
                  style={{ 
                    padding: '0.25rem',
                    transition: 'all 0.2s', 
                    cursor: 'pointer', 
                    color: '#ef4444'
                  }}
                >
                  <RiDeleteBin6Line style={{ fontSize: '1.25rem' }} />
                </button>
              </Td>
            </Tr>
          ))
        )}
      </Tbody>
    </Table>
    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
  </>
  
  )
}