import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../../reducers/index";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ScreenOptions from "./screen/screenOptions";
import KeycodeOptions from "./keycode/keycodeOptions";
interface OptionProps {}
const Options: React.FC<OptionProps> = ({}) => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>KeyCodes</Tab>
        <Tab>Screens</Tab>
      </TabList>
      <TabPanel>
        <KeycodeOptions />
      </TabPanel>
      <TabPanel>
        <ScreenOptions />
      </TabPanel>
    </Tabs>
  );
};
const mapStateToProps = (state: RootState) => ({});

export default connect(mapStateToProps, {})(Options);
