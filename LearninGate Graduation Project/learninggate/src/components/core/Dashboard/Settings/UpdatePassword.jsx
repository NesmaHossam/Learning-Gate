import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { changePassword } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (data) => {
    // console.log("password Data - ", data)
    try {
      await changePassword(token, data)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div style={{background: "#FFFFFF", color: "#000000"}} className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-#000000 bg-#000000 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="oldPassword" className="lable-style" style={{ color: "#000000" }}>
                Current Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="form-style border-[1px] border-#000000"
                style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
                {...register("oldPassword", { required: true })}
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#000000" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#000000" />
                )}
              </span>
              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100" style={{ color: "#000000" }}>
                  Please enter your Current Password.
                </span>
              )}
            </div>
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newPassword" className="lable-style" style={{ color: "#000000" }}>
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="form-style border-[1px] border-#000000"
                style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
                {...register("newPassword", { required: true })}
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#000000" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#000000" />
                )}
              </span>
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100" style={{ color: "#000000" }}>
                  Please enter your New Password.
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile");
            }}
            className="cursor-pointer rounded-md bg-#E5E5E5 py-2 px-5 font-semibold text-#000000"
            style={{ backgroundColor: "#080474", color: "#fff" }}
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>
      </form>
    </>
  );
}