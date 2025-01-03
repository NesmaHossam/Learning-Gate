import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../data/countrycode.json";
import { apiConnector } from "../../services/apiConnector";
import { contactusEndpoint } from "../../services/apis";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    try {
      setLoading(true);
      const res = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
      setLoading(false);
      
      console.log("Email Res - ", res);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form className="flex flex-col gap-7">
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="label-style">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
            className="form-style border-[1px] border-#000000"
            {...register("firstname", { required: true })}
            style={{backgroundColor: "#fff" }} />
          {errors.firstname && (
            <span className="-mt-1 text-sm text-yellow-100">
              Please enter your first name.
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="label-style">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter last name"
            className="form-style border-[1px] border-#000000"
            {...register("lastname")}
            style={{backgroundColor: "#fff" }}/>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="label-style">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="form-style border-[1px] border-#000000"
          {...register("email", { required: true })}
          style={{backgroundColor: "#fff" }}/>
        {errors.email && (
          <span className="-mt-1 text-sm text-yellow-100">
            Please enter your email address.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="label-style">
          Phone Number
        </label>

        <div className="flex gap-5">
          <div className="flex w-[81px] flex-col gap-2">
            <select
              name="countrycode"
              id="countrycode"
              className="form-style border-[1px] border-#000000"
              {...register("countrycode", { required: true })}
              style={{backgroundColor: "#fff" }} >
              {CountryCode.map((ele, i) => (
                <option key={i} value={ele.code}>
                  {ele.code} - {ele.country}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="text"
              name="phoneNo"
              id="phoneNo"
              placeholder="12345 67890"
              className="form-style border-[1px] border-#000000"
              {...register("phoneNo", {
                required: "Please enter your phone number.",
                maxLength: {
                  value: 12,
                  message: "Phone number is too long.",
                },
                minLength: {
                  value: 10,
                  message: "Phone number is too short.",
                },
              })}
              style={{backgroundColor: "#fff" }}  />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-sm text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="label-style">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          rows="7"
          placeholder="Enter your message here"
          className="form-style border-[1px] border-#000000"
          {...register("message", { required: true })}
          style={{backgroundColor: "#fff" }} />
        {errors.message && (
          <span className="-mt-1 text-sm text-yellow-100">
            Please enter your message.
          </span>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`rounded-md  px-6 py-3 text-center text-sm font-bold text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-gray-500 sm:text-lg `}
         style={{backgroundColor: "#080474" }}>
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactUsForm;
