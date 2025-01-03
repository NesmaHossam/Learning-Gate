import React from "react";

const HighlightText = ({text}) => {
  return (
    <span className="bg-gradient-to-b from-[#5b5034] via-[#b6a168] to-[#bdaa77] text-transparent bg-clip-text font-bold">
      {" "}
      {text}
    </span>
  );
};

export default HighlightText;