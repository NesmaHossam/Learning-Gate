import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { resetPassword } from "../services/operations/authAPI";
import reset2 from "../assets/Images/reset2.png";

function UpdatePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div style={{ maxWidth: "500px", padding: "20px", backgroundColor: "#FFFFFF", borderRadius: "8px" }}>
            <h1 style={{ fontSize: "1.875rem", fontWeight: "600", lineHeight: "2.375rem", color: "#1F2937" }}>
              Choose new password
            </h1>
            <p style={{ margin: "16px 0", fontSize: "1.125rem", lineHeight: "1.625rem", color: "#4B5563" }}>
              Almost done. Enter your new password and you're all set.
            </p>
            <form onSubmit={handleOnSubmit}>
              <label style={{ position: "relative" }}>
                <p style={{ marginBottom: "4px", fontSize: "0.875rem", lineHeight: "1.375rem", color: "#1F2937" }}>
                  New Password <sup style={{ color: "#F472B6" }}>*</sup>
                </p>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter Password"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "2px solid #CCCCCC",
                    backgroundColor: "#FFFFFF",
                  }}
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{ position: "absolute", right: "10px", top: "38px", zIndex: "10", cursor: "pointer" }}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </label>
              <label style={{ position: "relative", marginTop: "12px", display: "block" }}>
                <p style={{ marginBottom: "4px", fontSize: "0.875rem", lineHeight: "1.375rem", color: "#1F2937" }}>
                  Confirm New Password <sup style={{ color: "#F472B6" }}>*</sup>
                </p>
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Confirm Password"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "2px solid #CCCCCC",
                    backgroundColor: "#FFFFFF",
                  }}
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  style={{ position: "absolute", right: "10px", top: "38px", zIndex: "10", cursor: "pointer" }}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </label>

              <button
                type="submit"
                className="mt-6 w-full rounded-[12px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                style={{ backgroundColor: "#080474", border: "2px solid #080474", color: "#fff", cursor: "pointer" }}
              >
                Reset Password
              </button>
            </form>
            <div className="mt-6 flex items-center justify-between">
              <Link to="/login">
                <p className="flex items-center gap-x-2 text-richblack-5">
                  <BiArrowBack /> Back To Login
                </p>
              </Link>
            </div>
          </div>
        )}
      </div>

      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img
          src={reset2}
          alt="Reset Password"
          style={{
            maxHeight: "400px", // Adjusted maximum height
            maxWidth: "100%", // Ensures image scales proportionally
            width: "auto", // Allows the image to resize proportionally to its parent width
            display: "block", // Ensures the image does not create extra space
          }}
        />
      </div>
    </div>
  );
}

export default UpdatePassword;
