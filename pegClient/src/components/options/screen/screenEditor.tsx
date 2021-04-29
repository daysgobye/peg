import React, { useState, useEffect } from "react";
import { screen, singleScreenLayer } from "../../../reducers/types";
import DropdownList from "react-widgets/lib/DropdownList";
interface ScreenEditorProps {
  screen: singleScreenLayer;
  data: screen;
  updateScreen: (screen: singleScreenLayer) => void;
}
const ScreenEditor: React.FC<ScreenEditorProps> = ({
  data,
  screen,
  updateScreen,
}) => {
  const renderTextEdit = () => {
    const returnSplitValue = (index: 0 | 1 | 2) => {
      const splitValue = screen.value.split(" /n");
      if (splitValue.length > 1) {
        return splitValue[index].replace(" /n", "");
      } else {
        return "";
      }
    };
    if (screen.type === "text") {
      return (
        <div>
          <input
            type="text"
            value={returnSplitValue(0)}
            onChange={(e) => {
              let splitOldValue = [...screen.value.split(" /n")];
              splitOldValue[0] = `${e.target.value}`;
              const newValue = splitOldValue.join(" /n");
              updateScreen({
                ...screen,
                value: newValue,
              });
            }}
          />
          <br />
          <input
            type="text"
            value={returnSplitValue(1)}
            onChange={(e) => {
              let splitOldValue = [...screen.value.split(" /n")];
              console.log(splitOldValue);
              splitOldValue[1] = `${e.target.value}`;
              console.log(splitOldValue);
              const newValue = splitOldValue.join(" /n");
              updateScreen({
                ...screen,
                value: newValue,
              });
            }}
          />
          <br />
          <input
            type="text"
            value={returnSplitValue(2)}
            onChange={(e) => {
              let splitOldValue = [...screen.value.split(" /n")];
              console.log(splitOldValue);
              splitOldValue[2] = `${e.target.value}`;
              console.log(splitOldValue);
              const newValue = splitOldValue.join(" /n");
              updateScreen({
                ...screen,
                value: newValue,
              });
            }}
          />
        </div>
      );
    }
  };
  return (
    <div>
      <label>
        Screen type
        <DropdownList
          value={screen.type}
          data={["text", "image"]}
          onChange={(value) => updateScreen({ ...screen, type: value })}
        />
      </label>
      {renderTextEdit()}
    </div>
  );
};

export default ScreenEditor;
