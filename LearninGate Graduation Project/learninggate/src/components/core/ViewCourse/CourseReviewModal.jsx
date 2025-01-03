import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import ReactStars from "react-rating-stars-component"
import { useSelector } from "react-redux"

import { createRating } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ratingChanged = (newRating) => {
    // console.log(newRating)
    setValue("courseRating", newRating)
  }

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )
    setReviewModal(false)
  }

  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      marginTop: 0,
      display: 'grid',
      alignItems: 'center',
      overflow: 'auto',
      backgroundColor: '#ffffff',
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{ 
        margin: '10% auto',
        width: '90%',
        maxWidth: '700px',
        borderRadius: '10px',
        border: '1px solid #d1d5db',
        backgroundColor: '#ffffff'
      }}>
        {/* Modal Header */}
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          backgroundColor: '#f3f4f6',
          padding: '1.25rem'
        }}>
          <p style={{ 
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1f2937'
          }}>Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 style={{ 
              fontSize: '1.25rem',
              color: '#1f2937'
            }} />
          </button>
        </div>
        {/* Modal Body */}
        <div style={{ 
          padding: '1.5rem'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem'
          }}>
            <img
              src={user?.image}
              alt={`${user?.firstName} profile`}
              style={{ 
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
            <div>
              <p style={{ 
                fontWeight: '600',
                color: '#1f2937'
              }}>
                {user?.firstName} {user?.lastName}
              </p>
              <p style={{ 
                fontSize: '0.875rem',
                color: '#1f2937'
              }}>Posting Publicly</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ 
              marginTop: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
            <div style={{ 
              width: '91.66667%', // 11/12 in percentage
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <label
                style={{ 
                  fontSize: '0.875rem',
                  color: '#1f2937'
                }}
                htmlFor="courseExperience"
              >
                Add Your Experience <sup style={{ color: '#f87171' }}>*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add Your Experience"
                {...register("courseExperience", { required: true })}
                style={{ 
                  minHeight: '130px',
                  width: '100%',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  padding: '0.5rem'
                }}
              />
              {errors.courseExperience && (
                <span style={{ 
                  marginLeft: '0.25rem',
                  fontSize: '0.75rem',
                  color: '#f87171'
                }}>
                  Please Add Your Experience
                </span>
              )}
            </div>
            <div style={{ 
              marginTop: '1.5rem',
              width: '91.66667%', // 11/12 in percentage
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.5rem'
            }}>
              <button
                onClick={() => setReviewModal(false)}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  backgroundColor: '#f3f4f6',
                  color: '#1f2937',
                  fontWeight: '600'
                }}
              >
                Cancel
              </button>
              <IconBtn text="Save" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
}