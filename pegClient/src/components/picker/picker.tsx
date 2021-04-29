import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../../reducers/index";
import {
  compileKeyMap,
  getKeyboardsList,
  getKeyboardLayout,
} from "../../reducers/keyboards";
import { exportJson, importJson } from "../../reducers/keymap";
import DropdownList from "react-widgets/lib/DropdownList";

interface PickerProps {
  getKeyboardsList?: any;
  getKeyboardLayout?: any;
  children?: React.ReactNode;
  keyboardsList?: string[];
  compileKeyMap: any;
  exportJson: any;
  importJson: any;
}
const Picker: React.FC<PickerProps> = ({
  getKeyboardsList,
  getKeyboardLayout,
  keyboardsList,
  compileKeyMap,
  exportJson,
  importJson,
}) => {
  const [gotKeybords, setGotKeyboards] = useState(false);
  useEffect(() => {
    if (keyboardsList && keyboardsList.length === 0 && !gotKeybords) {
      getKeyboardsList();
      setGotKeyboards(true);
    }
  });
  const getlayout = (selectedKeyboard: string) => {
    getKeyboardLayout(selectedKeyboard);
  };
  return (
    <div style={{ width: "100vw", display: "flex" }}>
      <div style={{ width: "50%" }}>
        <h3>keyboards</h3>
        <DropdownList data={keyboardsList} onChange={getlayout} />
        <h3>layout</h3>
      </div>
      <div>
        <h3>save</h3>
        <button onClick={() => compileKeyMap()}>compile</button>
        <button onClick={exportJson}>saveJson</button>
        <input
          type="file"
          onChange={(file: any) => importJson(file.target.files[0])}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  keyboardsList: state.keyboards.keyboardsList,
});

export default connect(mapStateToProps, {
  getKeyboardsList,
  getKeyboardLayout,
  compileKeyMap,
  exportJson,
  importJson,
})(Picker);
