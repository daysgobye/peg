import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../reducers/index";
import {
  addScreen,
  disableScreens,
  enableScreens,
  removeScreen,
} from "../../../reducers/keymap";
import { keymapPartsName, screen } from "../../../reducers/types";
import Screen from "./screen";
interface ScreenOptionsProps {
  screenState: any;
  enableScreens: () => void;
  disableScreens: () => void;
  addScreen: () => void;
  removeScreen: () => void;
}
const ScreenOptions: React.FC<ScreenOptionsProps> = ({
  screenState,
  enableScreens,
  disableScreens,
  addScreen,
  removeScreen,
}) => {
  const renderAddButton = () => {
    if (screenState.data.length <= 1) {
      return <button onClick={addScreen}>addScreen</button>;
    }
  };
  const renderRemoveButton = () => {
    if (screenState.data.length === 2) {
      return <button onClick={removeScreen}>removeScreen</button>;
    } else if (screenState.data.length === 1) {
      return <button onClick={disableScreens}>disableScreens</button>;
    }
  };
  if (screenState === undefined) {
    return (
      <div>
        <button onClick={enableScreens}> enable Screens</button>
      </div>
    );
  } else {
    return (
      <div>
        {screenState.data.map((screen: screen, index: 0 | 1) => (
          <Screen index={index} data={screen} />
        ))}
        {renderAddButton()}
        {renderRemoveButton()}
      </div>
    );
  }
};
const mapStateToProps = (state: RootState) => ({
  screenState: state.keymap.keymapParts.find(
    (part) => part.name === keymapPartsName.SCREENS
  ),
});

export default connect(mapStateToProps, {
  enableScreens,
  disableScreens,
  addScreen,
  removeScreen,
})(ScreenOptions);
