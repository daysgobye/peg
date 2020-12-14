import React from "react";
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
  const onDrop = (data: any) => {
    const keycode = data.code;
    replaceKey(keycode, selectedLayer, index);
  };
  const [{ isOver }, drop] = useDrop({
    accept: "KEYCODE",
    drop: onDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const keyUnit = 60;
  const width = keyUnit * (w ? w : 1);
  const height = keyUnit * (h ? h : 1);
  const getValue = () => {
    if (keymap && keymap.data) {
      return keymap.data[selectedLayer][index];
    } else {
      return label;
    }
  };
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
      {getValue()}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  keymap: state.keymap.keymapParts.find((part) => part.name === "layers"),
  selectedLayer: state.keyboards.selectedLayer,
});

export default connect(mapStateToProps, { replaceKey })(SingleKey);
