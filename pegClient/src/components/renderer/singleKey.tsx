import React from "react";
//@ts-ignore
interface SingleKeyProps {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label?: string;
}
const SingleKey: React.FC<SingleKeyProps> = ({ x, y, w, h, label }) => {
  const keyUnit = 60;
  const width = keyUnit * (w ? w : 1);
  const height = keyUnit * (h ? h : 1);
  return (
    <div
      style={{
        position: "absolute",
        background: "white",
        width: width,
        height: height,

        left: x * keyUnit,
        top: y * keyUnit,
        border: "1px solid black",
      }}
    >
      {label}
    </div>
  );
};

export default SingleKey;
