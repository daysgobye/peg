import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../../reducers/index";
import { getKeyboardsList, getKeyboardLayout } from "../../reducers/keyboards";
import DropdownList from "react-widgets/lib/DropdownList";

interface PickerProps {
  getKeyboardsList?: any;
  getKeyboardLayout?: any;
  children?: React.ReactNode;
  keyboardsList?: string[];
}
const Picker: React.FC = (props: PickerProps) => {
  const [gotKeybords, setGotKeyboards] = useState(false);
  useEffect(() => {
    if (
      props &&
      props.keyboardsList &&
      props.keyboardsList.length === 0 &&
      !gotKeybords
    ) {
      props.getKeyboardsList();
      setGotKeyboards(true);
    }
  });
  const getlayout = (selectedKeyboard: string) => {
    props.getKeyboardLayout(selectedKeyboard);
  };
  return (
    <div>
      <h3>keyboards</h3>
      <DropdownList data={props.keyboardsList} onChange={getlayout} />
      <h3>layout</h3>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  keyboardsList: state.keyboards.keyboardsList,
});

export default connect(mapStateToProps, {
  getKeyboardsList,
  getKeyboardLayout,
})(Picker);
