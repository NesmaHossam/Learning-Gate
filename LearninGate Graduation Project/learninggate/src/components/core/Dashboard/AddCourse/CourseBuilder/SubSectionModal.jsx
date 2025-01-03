import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"

export default function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm()

  
  
  

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  useEffect(() => {
    if (view || edit) {
      
      setValue("lectureTitle", modalData.title)
      setValue("lectureDesc", modalData.description)
      setValue("lectureVideo", modalData.videoUrl)
    }
  }, [])

  
  const isFormUpdated = () => {
    const currentValues = getValues()
    
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true
    }
    return false
  }

  
  const handleEditSubsection = async () => {
    const currentValues = getValues()
    
    const formData = new FormData()
    
    formData.append("sectionId", modalData.sectionId)
    formData.append("subSectionId", modalData._id)
    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle)
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc)
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo)
    }
    setLoading(true)
    const result = await updateSubSection(formData, token)
    if (result) {
      
      
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  }

  const onSubmit = async (data) => {
    
    if (view) return

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes has been made to the form.")
      } else {
        handleEditSubsection()
      }
      return
    }

    const formData = new FormData()
    formData.append("sectionId", modalData)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("video", data.lectureVideo)
    setLoading(true)
    const result = await createSubSection(formData, token)
    if (result) {
      
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  }

  return (
    <div style={{
      position: 'fixed',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      zIndex: '1000',
      marginTop: '0',
      display: 'grid',
      placeItems: 'center',
      overflow: 'auto',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        margin: '2.5rem auto',
        maxWidth: '700px',
        width: 'calc(100% - 2rem)',
        borderRadius: '0.375rem',
        border: '1px solid #333',
        background: '#fff'
      }}>
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTopLeftRadius: '0.375rem',
          borderTopRightRadius: '0.375rem',
          background: '#333',
          padding: '1.25rem'
        }}>
          <p style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#fff'
          }}>
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 style={{ fontSize: '1.25rem', color: '#fff' }} />
          </button>
        </div>
        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ padding: '1rem 2rem 2.5rem', marginTop: '2rem' }}
        >
          {/* Lecture Video Upload */}
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />
          {/* Lecture Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: '#333' }} htmlFor="lectureTitle">
              Lecture Title {!view && <sup style={{ color: '#f50057' }}>*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #333',
                borderRadius: '0.25rem',
                color: '#333',
                backgroundColor: '#fff'
              }}
            />
            {errors.lectureTitle && (
              <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#f50057' }}>
                Lecture title is required
              </span>
            )}
          </div>
          {/* Lecture Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
            <label style={{ fontSize: '0.875rem', color: '#333' }} htmlFor="lectureDesc">
              Lecture Description {!view && <sup style={{ color: '#f50057' }}>*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #333',
                borderRadius: '0.25rem',
                color: '#333',
                backgroundColor: '#fff',
                resize: 'none',
                minHeight: '130px'
              }}
            />
            {errors.lectureDesc && (
              <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#f50057' }}>
                Lecture Description is required
              </span>
            )}
          </div>
          {!view && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <IconBtn
                disabled={loading}
                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
                style={{
                  padding: '8px 20px',
                  borderRadius: '0.375rem',
                  background: '#555',
                  color: '#fff',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );  
}