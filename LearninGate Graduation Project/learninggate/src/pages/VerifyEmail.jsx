import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import confirmation_code from "../assets/Images/confirmation_code.png";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    
    if (!signupData) {
      navigate("/signup");
    }
    
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div style={{ maxWidth: "500px", padding: "20px", backgroundColor: "#FFFFFF", borderRadius: "8px" }}>
            <h1 style={{ fontSize: "1.875rem", fontWeight: "600", lineHeight: "2.375rem", color: "#1F2937" }}>
              Verify Email
            </h1>
            <p style={{ margin: "16px 0", fontSize: "1.125rem", lineHeight: "1.625rem", color: "#4B5563" }}>
              A verification code has been sent to you. Enter the code below
            </p>
            <form onSubmit={handleVerifyAndSignup}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="-"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      backgroundColor: '#FFFFFF',
                      border: '2px solid #CCCCCC'
                    }}
                    className="w-[48px] lg:w-[60px] rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                  />
                )}
                containerStyle={{
                  justifyContent: "space-between",
                  gap: "0 6px",
                }}
              />
              <button
                type="submit"
                className="w-full py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-white"
                style={{ backgroundColor: '#080474', border: '2px solid #080474', cursor: 'pointer' }}
              >
                Verify Email
              </button>
            </form>
            <div className="mt-6 flex items-center justify-between">
              <Link to="/signup">
                <p className="text-richblack-5 flex items-center gap-x-2">
                  <BiArrowBack /> Back To Signup
                </p>
              </Link>
              <button
                className="flex items-center gap-x-2"
                style={{ color: '#080474', cursor: 'pointer' }}
                onClick={() => dispatch(sendOtp(signupData.email))}
              >
                <RxCountdownTimer />
                Resend it
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img
          src={confirmation_code}
          alt="Verification Code"
          style={{
            maxHeight: "400px",
            maxWidth: "100%",
            width: "auto",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}

export default VerifyEmail;
