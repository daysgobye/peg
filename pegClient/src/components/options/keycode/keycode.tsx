import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
interface KeycodeProps {
  keycode: any;
}

const Keycode: React.FC<KeycodeProps> = ({ keycode }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: "KEYCODE", code: keycode },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div
      ref={drag}
      style={{
        background: isDragging ? "green" : "white",
        cursor: "move",
        width: "10%",
        height: 20,
        border: "1px solid black",
        margin: 10,
      }}
    >
      {keycode.title}
    </div>
  );
};
export default Keycode;
