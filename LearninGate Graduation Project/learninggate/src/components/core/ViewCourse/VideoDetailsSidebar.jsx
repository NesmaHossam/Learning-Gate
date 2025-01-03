import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";

import IconBtn from "../../common/IconBtn";
import axios from "axios";

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    if (!courseSectionData.length) return;
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndx = courseSectionData?.[
      currentSectionIndx
    ]?.subSection.findIndex((data) => data._id === subSectionId);
    const activeSubSectionId =
      courseSectionData[currentSectionIndx]?.subSection?.[currentSubSectionIndx]
        ?._id;
    setActiveStatus(courseSectionData?.[currentSectionIndx]?._id);
    setVideoBarActive(activeSubSectionId);
  }, [courseSectionData, sectionId, subSectionId]);

  const user = JSON.parse(localStorage.getItem("user"));
  const clickerName = `${user.firstName} ${user.lastName}`;

  const handleWatchOnRoom = async () => {
    try {
      await axios.post("http://localhost:5050/watchOnRoom", {
        courseSectionData,
        clickerName,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 3.5rem)",
        width: "320px",
        maxWidth: "350px",
        borderRight: "1px solid #d1d5db",
        backgroundColor: "#ffffff",
        marginTop: "3.5rem",
      }}
    >
      <div
        style={{
          margin: "0 0.875rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "0.5rem",
          borderBottom: "1px solid #d1d5db",
          padding: "1.25rem 0.625rem",
          fontSize: "1.125rem",
          fontWeight: "bold",
          color: "#1f2937",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            onClick={() => {
              navigate(`/dashboard/enrolled-courses`);
            }}
            style={{
              height: "35px",
              width: "35px",
              borderRadius: "50%",
              backgroundColor: "#f3f4f6",
              padding: "0.25rem",
              color: "#1f2937",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
              ":hover": { transform: "scale(0.9)" },
            }}
            title="back"
          >
            <IoIosArrowBack size={30} />
          </div>
          <IconBtn
            text="Add Review"
            customClasses="ml-auto"
            onclick={() => setReviewModal(true)}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>{courseEntireData?.courseName}</p>
          <p
            style={{
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#6b7280",
            }}
          >
            {completedLectures?.length} / {totalNoOfLectures}
          </p>
        </div>
      </div>

      <div
        style={{
          height: "calc(100vh - 5rem)",
          overflowY: "auto",
        }}
      >
        {courseSectionData.map((course, index) => (
          <div
            key={index}
            onClick={() => setActiveStatus(course?._id)}
            style={{
              marginTop: "0.5rem",
              cursor: "pointer",
              fontSize: "0.875rem",
              color: "#1f2937",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#f3f4f6",
                padding: "1rem 0.625rem",
                borderRadius: "0.375rem",
                marginBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "70%",
                  fontWeight: "600",
                  color: "#1f2937",
                }}
              >
                {course?.sectionName}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    transition: "transform 0.5s",
                    transform:
                      activeStatus === course?._id
                        ? "rotate(0deg)"
                        : "rotate(180deg)",
                    cursor: "pointer",
                  }}
                >
                  <BsChevronDown />
                </span>
              </div>
            </div>

            {activeStatus === course?._id && (
              <div
                style={{
                  transition: "height 0.5s ease-in-out",
                }}
              >
                {course.subSection.map((topic, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                      );
                      setVideoBarActive(topic._id);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.5rem 0.625rem",
                      backgroundColor:
                        videoBarActive === topic._id ? "#fde68a" : "#ffffff",
                      fontWeight:
                        videoBarActive === topic._id ? "600" : "normal",
                      color:
                        videoBarActive === topic._id ? "#1f2937" : "#6b7280",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic?._id)}
                      onChange={() => {}}
                    />
                    {topic.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* <form method="GET" action="http://localhost:5050/watchOnRoom"> */}
      <Link to={"http://localhost:5050/watchOnRoom"}>
        <button
          type="submit"
          onClick={handleWatchOnRoom}
          style={{
            backgroundColor: "#080474",
            color: "#ffffff",
            fontSize: "0.875rem",
            fontWeight: "600",
            padding: "0.75rem 1rem",
            borderRadius: "0.375rem",
            marginTop: "0.5rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease-in-out",
          }}
        >
          Watch on Room
        </button>
      </Link>

      {/* </form> */}
    </div>
  );
}
