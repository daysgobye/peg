import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../reducers/index";
interface Props {}

const Settings: React.FC = (props: Props) => {
  return (
    <div>
      <p>hi</p>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({});

export default connect(mapStateToProps, {})(Settings);
