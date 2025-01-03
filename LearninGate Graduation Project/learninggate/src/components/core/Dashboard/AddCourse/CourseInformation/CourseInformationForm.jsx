import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"
import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementField"

export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      if (categories.length > 0) {
        
        setCourseCategories(categories)
      }
      setLoading(false)
    }
    
    if (editCourse) {
      
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
    getCategories()

    
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true
    }
    return false
  }

  
  const onSubmit = async (data) => {
    

    if (editCourse) {
      
      
      
      
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }
        
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes has been made to the form.")
      }
      return
    }

    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)
    setLoading(true)
    const result = await addCourseDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        margin: '0',
        padding: '1.5rem',
        borderRadius: '0.375rem',
        border: '1px solid #ccc',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}
    >
      {/* Course Title */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', color: '#333' }} htmlFor="courseTitle">
          Course Title <sup style={{ color: '#f50057' }}>*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #ccc',
            borderRadius: '0.25rem',
            color: '#333',
            backgroundColor: '#fff'
          }}
        />
        {errors.courseTitle && (
          <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#f50057' }}>
            Course title is required
          </span>
        )}
      </div>
      {/* Course Short Description */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', color: '#333' }} htmlFor="courseShortDesc">
          Course Short Description <sup style={{ color: '#f50057' }}>*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #ccc',
            borderRadius: '0.25rem',
            color: '#333',
            backgroundColor: '#fff',
            resize: 'none',
            minHeight: '130px'
          }}
        />
        {errors.courseShortDesc && (
          <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#f50057' }}>
            Course Description is required
          </span>
        )}
      </div>
      {/* Course Price */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', color: '#333' }} htmlFor="coursePrice">
          Course Price <sup style={{ color: '#f50057' }}>*</sup>
        </label>
        <div style={{ position: 'relative' }}>
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/
              }
            })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '0.25rem',
              color: '#333',
              backgroundColor: '#fff'
            }}
          />
        </div>
        {errors.coursePrice && (
          <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#f50057' }}>
            Course Price is required
          </span>
        )}
      </div>
      {/* Course Category */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', color: '#333' }} htmlFor="courseCategory">
          Course Category <sup style={{ color: '#f50057' }}>*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #ccc',
            borderRadius: '0.25rem',
            color: '#333',
            backgroundColor: '#fff'
          }}
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#f50057' }}>
            Course Category is required
          </span>
        )}
      </div>
      {/* Course Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      {/* Course Thumbnail Image */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
      {/* Benefits of the course */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', color: '#333' }} htmlFor="courseBenefits">
          Benefits of the course <sup style={{ color: '#f50057' }}>*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #ccc',
            borderRadius: '0.25rem',
            color: '#333',
            backgroundColor: '#fff',
            resize: 'none',
            minHeight: '130px'
          }}
        />
        {errors.courseBenefits && (
          <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#f50057' }}>
            Benefits of the course is required
          </span>
        )}
      </div>
      {/* Requirements/Instructions */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />
      {/* Next Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.25rem' }}>
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              background: '#080474',
              color: '#fff',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
  
}