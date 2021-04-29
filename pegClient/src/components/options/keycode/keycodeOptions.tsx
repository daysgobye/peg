import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Keycode } from "../../../keycodes";
import { RootState } from "../../../reducers/index";
import KeycodeGrid from "./keycodeGrid";
const keycode = Keycode.getInstance();

interface KeycodeOptionProps {}
type OptionSection = {
  component: React.FC;
  props: any;
};
const KeycodeOptions: React.FC<KeycodeOptionProps> = ({}) => {
  const [selectedOption, setSelectedOption] = useState("Basic");
  const sectionTitles = [
    "Basic",
    "Extended",
    "Internal",
    "Audio",
    "BackLight",
    "BootMagic",
    "BlueTooth",
    "Dynamic-Macros",
    "Layers",
  ];
  const optionSections = {
    Basic: {
      component: KeycodeGrid,
      props: { keycodes: keycode.basic },
    },
    Extended: {
      component: KeycodeGrid,
      props: { keycodes: keycode.basicExtended },
    },
    Internal: {
      component: KeycodeGrid,
      props: { keycodes: keycode.internalCodes },
    },
    Audio: {
      component: KeycodeGrid,
      props: { keycodes: keycode.audio },
    },
    BackLight: {
      component: KeycodeGrid,
      props: { keycodes: keycode.backLight },
    },
    BootMagic: {
      component: KeycodeGrid,
      props: { keycodes: keycode.bootmagic },
    },
    BlueTooth: {
      component: KeycodeGrid,
      props: { keycodes: keycode.bluetooth },
    },
    "Dynamic-Macros": {
      component: KeycodeGrid,
      props: { keycodes: keycode.dynamicMacro },
    },
    Layers: {
      component: KeycodeGrid,
      props: { keycodes: keycode.layerKeys },
    },
  };
  //@ts-ignore
  const renderOption = () => {
    //@ts-ignore
    const SelectedOption = optionSections[selectedOption];
    return <SelectedOption.component {...SelectedOption.props} />;
  };
  return (
    <div style={styles.container}>
      <div style={styles.sideBar}>
        {sectionTitles.map((title) => (
          <button
            onClick={() => setSelectedOption(title)}
            style={styles.sideBarButtons}
          >
            {title}
          </button>
        ))}
      </div>
      <div style={styles.options}>{renderOption()}</div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({});

export default connect(mapStateToProps, {})(KeycodeOptions);
const styles = {
  container: {
    width: "100vw",
    display: "Flex",
  },
  options: {
    width: "85%",
  },
  sideBar: {
    width: "15%",
    display: "flex",
    "flex-direction": "column",
  },
  sideBarButtons: {
    margin: 3,
  },
};
