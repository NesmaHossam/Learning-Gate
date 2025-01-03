import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getPasswordResetToken } from "../services/operations/authAPI";
import reset1 from "../assets/Images/reset1.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <div className="flex-1 flex justify-center items-center">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div className="max-w-[500px] p-4 lg:p-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4" style={{ color: "#080474" }}>
              {!emailSent ? "Reset Your Password" : "Check Your Email"}
            </h1>
            <p className="text-base text-gray-700 mb-4" style={{ color: "#717171" }}>
              {!emailSent
                ? "Enter your email address below. We'll email you instructions to reset your password."
                : `We have sent the reset email to ${email}.`}
            </p>
            <form onSubmit={handleOnSubmit} className="space-y-4">
              {!emailSent && (
                <div>
                  <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    style={{
                      backgroundColor: "white",
                      border: "2px solid gray",
                      padding: "10px"
                    }}
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
                style={{ backgroundColor: "#080474" }}
              >
                {!emailSent ? "Submit" : "Resend Email"}
              </button>
            </form>
            <div className="mt-4 text-sm text-gray-700">
              <Link to="/login" className="flex items-center space-x-1">
                <BiArrowBack className="text-gray-600" /> Back To Login
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex justify-center items-center">
        <img
          src={reset1}
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

export default ForgotPassword;
