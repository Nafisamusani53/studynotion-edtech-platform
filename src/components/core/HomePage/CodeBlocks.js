import React from "react";
import HighlightText from "./HighlightText";
import CtnButton from "./CtnButton";
import Editor from "./Editor";

const CodeBlocks = ({ left, sequence, button1, button2, arrow, gradient,s1,s2,s3,s4,color }) => {
  return (
    <div
      className={`flex 
      ${left ? "flex-row" : "flex-row-reverse"} 
      mx-auto gap-10 justify-between my-12`}
    >
      <div className="flex flex-col gap-8 w-[46%]">
        <p className="text-4xl font-semibold">
          {s1}
          <HighlightText
            text={s2}
            style={
              "bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent font-bold"
            }
          />
          {s3}
        </p>
        <p className="-mt-3 w-[90%] text-md font-bold text-richblack-300">
          {s4}
        </p>
        <div>
          <div className="flex gap-7 mx-auto mt-5">
            <CtnButton text={button1} flag={true} arrow={arrow} />
            <CtnButton text={button2} flag={false} />
          </div>
        </div>
      </div>
      <Editor sequence={sequence} gradient={gradient} color={color} />
    </div>
  );
};

export default CodeBlocks;
