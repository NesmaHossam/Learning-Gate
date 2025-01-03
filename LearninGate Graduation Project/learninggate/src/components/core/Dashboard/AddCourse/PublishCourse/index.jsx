import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async () => {
    
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      
      
      goToCourses()
      return
    }
    const formData = new FormData()
    formData.append("courseId", course._id)
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT
    formData.append("status", courseStatus)
    setLoading(true)
    const result = await editCourseDetails(formData, token)
    if (result) {
      goToCourses()
    }
    setLoading(false)
  }

  const onSubmit = (data) => {
    
    handleCoursePublish()
  }

  return (
    <div style={{
      borderRadius: '0.375rem',
      border: '1px solid #333',
      background: '#fff',
      padding: '1.5rem'
    }}>
      <p style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#080474'
      }}>
        Publish Settings
      </p>
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '1rem' }}>
        {/* Checkbox */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="public" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '1rem', color: '#333' }}>
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              style={{
                border: '1px solid #ccc',
                height: '1rem',
                width: '1rem',
                borderRadius: '0.25rem',
                background: '#333',
                color: '#ccc',
                marginRight: '0.5rem',
                verticalAlign: 'middle'
              }}
            />
            <span style={{ color: '#333' }}>
              Make this course as public
            </span>
          </label>
        </div>
  
        {/* Next Prev Button */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '8px 20px',
              borderRadius: '0.375rem',
              background: '#080474',
              color: '#fff',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Back
          </button>
          <IconBtn disabled={loading} text="Save Changes" />
        </div>
      </form>
    </div>
  );
  
}