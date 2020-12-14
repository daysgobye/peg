import React, { useState, useEffect } from "react";
import Keycode from "./keycode";
interface KeycodeOptionsProps {
  keycodes: any;
}
const KeycodeOptions: React.FC<KeycodeOptionsProps> = ({ keycodes }) => {
  return (
    <div style={styles.container}>
      {Object.keys(keycodes).map((keycode) => (
        <Keycode text={keycode} />
      ))}
    </div>
  );
};
const styles = {
  container: {
    width: "100%",
    display: "flex",
    "flex-wrap": "wrap",
  },
  keycode: {
    width: "10%",
    height: 20,
    border: "1px solid black",
    margin: 10,
  },
};
export default KeycodeOptions;
