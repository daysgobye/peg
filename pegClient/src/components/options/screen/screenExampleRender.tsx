import React, { useState, useEffect } from "react";
import { screen, singleScreenLayer } from "../../../reducers/types";

interface ScreenExampleRenderProps {
  screen: singleScreenLayer;
  data: screen;
  screenColor: "white" | "blue";
}
const ScreenExampleRender: React.FC<ScreenExampleRenderProps> = ({
  screenColor,
  data,
  screen,
}) => {
  const returnPinEdge = () => {
    const { x, y } = data.size;
    const border = "8px solid navy";
    if (y === 32) {
      const value = { borderLeft: border };
      return value;
    } else {
      const value = { borderBottom: border };
      return value;
    }
  };
  if (screen.type === "text") {
    return (
      <div
        style={{
          width: data.size.x,
          height: data.size.y,
          background: "black",
          color: screenColor,
          ...returnPinEdge(),
        }}
      >
        {screen.value.split("/n").map((line) => (
          <p
            style={{
              lineHeight: "10px",
              textAlign: "left",
              marginLeft: 2,
              padding: 0,
              margin: 0,
              fontSize: "10px",
              width: data.size.x,
            }}
          >
            {line}
          </p>
        ))}
      </div>
    );
  } else {
    return (
      <div
        style={{
          width: 128,
          height: 32,
          background: "black",
        }}
      >
        render image here
      </div>
    );
  }
};

export default ScreenExampleRender;
