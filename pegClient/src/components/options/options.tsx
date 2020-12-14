import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Keycode } from "../../keycodes";
import { RootState } from "../../reducers/index";
import KeycodeOptions from "./keycode/keycodeOptions";
const keycode = Keycode.getInstance();

interface OptionProps {}
type OOptionSection = {
  component: React.FC;
  props: any;
};
const Options: React.FC<OptionProps> = ({}) => {
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
  ];
  const optionSections = {
    Basic: {
      component: KeycodeOptions,
      props: { keycodes: keycode.basic },
    },
    Extended: {
      component: KeycodeOptions,
      props: { keycodes: keycode.basicExtended },
    },
    Internal: {
      component: KeycodeOptions,
      props: { keycodes: keycode.internalCodes },
    },
    Audio: {
      component: KeycodeOptions,
      props: { keycodes: keycode.audio },
    },
    BackLight: {
      component: KeycodeOptions,
      props: { keycodes: keycode.backLight },
    },
    BootMagic: {
      component: KeycodeOptions,
      props: { keycodes: keycode.bootmagic },
    },
    BlueTooth: {
      component: KeycodeOptions,
      props: { keycodes: keycode.bluetooth },
    },
    "Dynamic-Macros": {
      component: KeycodeOptions,
      props: { keycodes: keycode.dynamicMacro },
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

export default connect(mapStateToProps, {})(Options);
const styles = {
  container: {
    width: "100vw",
    display: "Flex",
  },
  options: {
    width: "75%",
  },
  sideBar: {
    width: "25%",
    display: "flex",
    "flex-direction": "column",
  },
  sideBarButtons: {
    margin: 3,
  },
};
