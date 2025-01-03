import React, { useEffect, useState } from "react";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import Quote from "../components/core/AboutPage/Quote";
import ReviewSlider from "../components/common/ReviewSlider";
import Footer from "../components/common/Footer";

import { getRandomReviews } from "../services/operations/courseDetailsAPI";

const About = () => {
  const [randomReviews, setRandomReviews] = useState([]);

  useEffect(() => {
    const randomReviews = async () => {
      const Reviews = await getRandomReviews();
      setRandomReviews(Reviews);
    };
    randomReviews();
  }, []);

  return (
    <div style={{ backgroundColor: "#FFFFFF", color: "#000000" }}>
      <section style={{ borderBottom: "1px solid #E0E0E0" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
            padding: "40px 20px",
            textAlign: "center",
          }}
        >
          <Quote />
        </div>
      </section>

      <section
        style={{ maxWidth: "1200px", margin: "auto", padding: "40px 20px" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <div style={{ textAlign: "left", width: "100%" }}>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                background:
                  "-webkit-linear-gradient(#4A00E0, #8E2DE2, #4A00E0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Our Inspirational Journey
            </h1>
            <p style={{ fontSize: "18px", color: "#555555" }}>
              Learning Gate was founded by a collective of forward-thinking
              educators and technology enthusiasts committed to redefining
              educational paradigms through digital platforms. Our mission is to
              dismantle barriers and democratize top-tier education.
            </p>
            <p style={{ fontSize: "18px", color: "#555555" }}>
              The insights gleaned from conventional educational models
              underscored the imperative for a more adaptable and
              all-encompassing approach. Learning Gate symbolizes our proactive
              response, offering a dynamic conduit for growth and unrestricted
              learning.
            </p>
          </div>
          <div style={{ textAlign: "left", width: "100%" }}>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                background:
                  "-webkit-linear-gradient(#FF8A00, #FFC400, #FF8A00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Vision for the Future
            </h1>
            <p style={{ fontSize: "18px", color: "#555555" }}>
              Our aspiration is to redefine the educational landscape by
              seamlessly integrating cutting-edge technology with inventive
              pedagogical methodologies. Our goal is to forge an educational
              platform that not only imparts knowledge but also ignites and
              empowers learners to achieve their fullest potential.
            </p>
          </div>
          <div style={{ textAlign: "left", width: "100%" }}>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                background:
                  "-webkit-linear-gradient(#00BFFF, #1E90FF, #00BFFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Commitment to Excellence
            </h1>
            <p style={{ fontSize: "18px", color: "#555555" }}>
              Our mission transcends conventional online courses. We are
              dedicated to cultivating a vibrant community of learners who
              engage, collaborate, and evolve collectively. Through interactive
              forums, live sessions, and networking opportunities, we foster a
              culture of perpetual learning and mutual enrichment.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{ maxWidth: "1200px", margin: "auto", padding: "40px 20px" }}
      >
        <LearningGrid />
      </section>

      <section
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "40px 20px",
          textAlign: "center",
          backgroundColor: "#F8F8F8",
        }}
      >
        <h1
          style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}
        >
          Reviews from Our Learners
        </h1>
        <ReviewSlider reviews={randomReviews} />
      </section>

      <Footer />
    </div>
  );
};

export default About;
