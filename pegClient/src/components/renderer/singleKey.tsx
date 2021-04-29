import React, { useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../../reducers/index";
import { LayerRange } from "../../reducers/types";
import { replaceKey } from "../../reducers/keymap";
import { useDrop } from "react-dnd";

interface SingleKeyProps {
  index: number;
  x: number;
  y: number;
  w?: number;
  h?: number;
  label?: string;
  keymap: any;
  selectedLayer: LayerRange;
  replaceKey: (newKeycode: string, layer: LayerRange, index: number) => void;
}
const SingleKey: React.FC<SingleKeyProps> = ({
  x,
  y,
  w,
  h,
  label,
  index,
  selectedLayer,
  keymap,
  replaceKey,
}) => {
  const [_, update] = useState(1);
  const keyUnit = 60;
  const width = keyUnit * (w ? w : 1);
  const height = keyUnit * (h ? h : 1);

  // need a better regex this one will match ")"
  const pattern = new RegExp(/[A-Z]*_*[A-Z]*_*\)/, "gm");

  const hasSubKey = () => {
    const match = pattern.exec(getValue());
    return match && match[0] !== ")";
  };

  const getValue = () => {
    if (keymap && keymap.data) {
      return keymap.data[selectedLayer][index];
    } else {
      return label;
    }
  };

  const returnInnerValue = () => {
    const fullValue = getValue();
    const innerValue = fullValue.match(pattern);
    return innerValue && innerValue[0] ? innerValue[0].slice(0, -1) : "ERROR";
  };

  const onDrop = (data: any) => {
    const keycode = data.code.code;
    const currentKeyHasSub = hasSubKey();
    const newCodeHasSub = pattern.test(keycode);
    if (currentKeyHasSub && !newCodeHasSub) {
      const currentValue = getValue();
      const oldSubKeycode = returnInnerValue();
      const newKeycode = currentValue.replace(oldSubKeycode, keycode);
      replaceKey(newKeycode, selectedLayer, index);
    } else {
      replaceKey(keycode, selectedLayer, index);
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: "KEYCODE",
    drop: onDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const clearKey = () => replaceKey("KC_TRNS", selectedLayer, index);
  const renderClearButton = () => <button onClick={clearKey}>x</button>;
  if (hasSubKey()) {
    return (
      <div
        style={{
          position: "absolute",
          width: width,
          height: height,
          background: "white",
          left: x * keyUnit,
          top: y * keyUnit,
          border: "1px solid black",
        }}
      >
        {renderClearButton()}
        {getValue()}
        <div
          ref={drop}
          style={{
            width: "100%",
            height: "calc(100% - 1em)",

            background: isOver ? "teal" : "lightgrey",
          }}
        >
          {returnInnerValue()}
        </div>
      </div>
    );
  } else {
    return (
      <div
        ref={drop}
        style={{
          position: "absolute",
          background: isOver ? "teal" : "white",
          width: width,
          height: height,

          left: x * keyUnit,
          top: y * keyUnit,
          border: "1px solid black",
        }}
      >
        {renderClearButton()}
        {getValue()}
      </div>
    );
  }
};

const mapStateToProps = (state: RootState) => ({
  keymap: state.keymap.keymapParts.find((part) => part.name === "layers"),
  selectedLayer: state.keyboards.selectedLayer,
});

export default connect(mapStateToProps, { replaceKey })(SingleKey);
