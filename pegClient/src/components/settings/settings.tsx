import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../reducers/index";
interface Props {}

const Settings: React.FC = (props: Props) => {
  const onCheck = (e: React.SyntheticEvent, functionToCall: () => void) => {
    console.log(e, "event");
  };
  return (
    <div>
      <label>test</label>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({});

export default connect(mapStateToProps, {})(Settings);
