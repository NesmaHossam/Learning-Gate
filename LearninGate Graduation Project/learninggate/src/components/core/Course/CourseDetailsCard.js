import React, { useState } from "react";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToWishlist } from "../../../slices/wishlistSlice";
import { addToCart } from "../../../slices/cartSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bookmark, setBookmark] = useState(false);

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course;

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You can't buy a course as you are an instructor.");
      return;
    }
    if (token) {
      dispatch(addToCart(course));
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleAddToWishlist = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.");
      return;
    }
    if (token) {
      dispatch(addToWishlist(course));
      setBookmark(true);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        borderRadius: "0.375rem",
        background: "#080474",
        padding: "1rem",
        color: "#fff",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Course Image */}
      <img
        src={ThumbnailImage}
        alt={course?.courseName}
        style={{
          maxHeight: "300px",
          minHeight: "180px",
          width: "100%",
          borderRadius: "0.5rem",
          objectFit: "cover",
        }}
      />

      <div style={{ padding: "1rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#fff",
          }}
        >
          EGP {CurrentPrice}
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={
              user && course?.studentsEnrolled.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
            style={{
              flex: 1,
              padding: "0.75rem 1.5rem",
              borderRadius: "0.375rem",
              background: "#082C74",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              border: "none",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
            }}
          >
            {user && course?.studentsEnrolled.includes(user?._id)
              ? "Go To Course"
              : "Buy Now"}
          </button>
          <button
            onClick={handleAddToCart}
            className="blackButton"
            style={{
              flex: 1,
              padding: "0.75rem 1.5rem",
              borderRadius: "0.375rem",
              background: "#b6a168",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
              marginLeft: "1rem", // Add margin to separate from the previous button
            }}
          >
            Add to Cart
          </button>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
          <button
            onClick={handleAddToWishlist}
            style={{
              flex: 1,
              padding: "0.75rem 1.5rem",
              borderRadius: "0.375rem",
              background: "#b6a168", // Yellow background color
              color: "#fff", // White text color
              cursor: "pointer",
              border: "none",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "1rem", // Add margin to separate from the next button
            }}
          >
            {bookmark ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
            <span style={{ marginLeft: "0.5rem" }}>Bookmark</span>
          </button>
          <button
            onClick={handleShare}
            className="mx-auto flex items-center gap-2 py-2 px-4 text-yellow-100"
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "0.375rem",
              background: "#FFFFFF",
              color: "#b6a168",
              cursor: "pointer",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
            }}
          >
            <FaShareSquare size={15} /> Share
          </button>
        </div>
        <div
          style={{ textAlign: "center", marginTop: "1rem", color: "#ccc" }}
        ></div>

        <div>
          <p
            style={{
              margin: "1rem 0",
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#a38f5c",
            }}
          >
            Course Includes:
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              fontSize: "0.875rem",
              color: "#ccc",
            }}
          >
            {course?.instructions?.map((item, i) => (
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
                key={i}
              >
                <BsFillCaretRightFill style={{ color: "#0ff" }} />{" "}
                {/* Assuming Caribbean green color */}
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailsCard;
