import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className="text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center" style={{ color: "#9E9E9E" }}>
      Our mission is to transform education through innovation. By{" "}
      <HighlightText text={"leveraging technology"} />,{" "}
      <span style={{ backgroundImage: "linear-gradient(to bottom, #FF512F, #F09819)", WebkitBackgroundClip: "text", backgroundClip: "text", fontWeight: "bold" }}>
        expert knowledge
      </span>
      , and a strong community, we aim to provide an
      <span style={{ backgroundImage: "linear-gradient(to bottom, #E65C00, #F9D423)", WebkitBackgroundClip: "text", backgroundClip: "text", fontWeight: "bold" }}>
        exceptional learning experience.
      </span>
    </div>
  );
}

export default Quote;
