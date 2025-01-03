import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI"
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice"
import IconBtn from "../../../../common/IconBtn"
import NestedView from "./NestedView"

export default function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null)
  const dispatch = useDispatch()

  
  const onSubmit = async (data) => {
    
    setLoading(true)

    let result

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      )
      
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      )
    }
    if (result) {
      
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
    }
    setLoading(false)
  }

  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("You must at least add one section.")
      return
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("You must at least add one lecture in each section.")
      return
    }
    dispatch(setStep(3))
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  return (
    <div style={{
      padding: '1.5rem',
      borderRadius: '0.375rem',
      border: '1px solid #ccc',
      background: '#fff',
      marginBottom: '2rem'
    }}>
      <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#080474' }}>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '2rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', color: '#333' }} htmlFor="sectionName">
            Section Name <sup style={{ color: '#f50057' }}>*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '0.25rem',
              color: '#333',
              backgroundColor: '#fff'
            }}
          />
          {errors.sectionName && (
            <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#f50057' }}>
              Section name is required
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <IoAddCircleOutline size={20} style={{ color: '#ffeb3b' }} />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              style={{ fontSize: '0.875rem', color: '#2196f3', textDecoration: 'underline', cursor: 'pointer' }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}
      {/* Next Prev Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
        <button
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
        <IconBtn disabled={loading} text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  ); 
}