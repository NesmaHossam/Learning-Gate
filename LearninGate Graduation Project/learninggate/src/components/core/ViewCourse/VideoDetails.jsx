import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import "video-react/dist/video-react.css";
import { useLocation } from "react-router-dom";
import { BigPlayButton, Player } from "video-react";

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import IconBtn from "../../common/IconBtn";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!courseSectionData.length) return;
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`);
      } else {
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        );

        const filteredVideoData = filteredData?.[0]?.subSection.filter(
          (data) => data._id === subSectionId
        );

        setVideoData(filteredVideoData?.[0]);
        setPreviewSource(courseEntireData.thumbnail);
        setVideoEnded(false);
      }
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
      return true;
    } else {
      return false;
    }
  };

  const goToNextVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length;

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx + 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndx + 1].subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length;

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goToPrevVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndx - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndx - 1].subSection[
          prevSubSectionLength - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        color: "#1f2937",
        marginTop: "3.5rem", // Added margin to push below the navbar
      }}
    >
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          style={{
            height: "60vh", // Reduced height
            width: "100%",
            borderRadius: "0.375rem",
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          style={{
            position: "relative",
            height: "60vh", // Reduced height
            width: "100%",
          }}
        >
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            playsInline
            onEnded={() => setVideoEnded(true)}
            src={videoData?.videoUrl}
          >
            <BigPlayButton position="center" />
            {/* Render When Video Ends */}
            {videoEnded && (
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to top, #000000, rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1))",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 100,
                  display: "grid",
                  placeItems: "center",
                  fontFamily: "Inter",
                }}
              >
                {!completedLectures.includes(subSectionId) && (
                  <IconBtn
                    disabled={loading}
                    onclick={() => handleLectureCompletion()}
                    text={!loading ? "Mark As Completed" : "Loading..."}
                    style={{
                      fontSize: "1.25rem",
                      maxWidth: "max-content",
                      padding: "0.5rem 1rem",
                      margin: "0 auto",
                    }}
                  />
                )}
                <IconBtn
                  disabled={loading}
                  onclick={() => {
                    if (playerRef?.current) {
                      playerRef?.current?.seek(0);
                      setVideoEnded(false);
                    }
                  }}
                  text="Rewatch"
                  style={{
                    fontSize: "1.25rem",
                    maxWidth: "max-content",
                    padding: "0.5rem 1rem",
                    margin: "1rem auto 0",
                  }}
                />
                <div
                  style={{
                    marginTop: "2.5rem",
                    display: "flex",
                    minWidth: "250px",
                    justifyContent: "center",
                    gap: "0.75rem",
                    fontSize: "1.25rem",
                  }}
                >
                  {!isFirstVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToPrevVideo}
                      style={{
                        backgroundColor: "#000000",
                        color: "#ffffff",
                        borderRadius: "0.375rem",
                        padding: "0.5rem 1rem",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Prev
                    </button>
                  )}
                  {!isLastVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToNextVideo}
                      style={{
                        backgroundColor: "#000000",
                        color: "#ffffff",
                        borderRadius: "0.375rem",
                        padding: "0.5rem 1rem",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}
          </Player>
        </div>
      )}

      <h1
        style={{
          marginTop: "1rem",
          fontSize: "1.875rem",
          fontWeight: "600",
        }}
      >
        {videoData?.title}
      </h1>
      <p
        style={{
          paddingTop: "0.5rem",
          paddingBottom: "1.5rem",
        }}
      >
        {videoData?.description}
      </p>
    </div>
  );
};

export default VideoDetails;
