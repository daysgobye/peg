import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../reducers/index";
import SingleKey from "./singleKey";

interface RendererProps {
  selectedLayout?: any;
  children?: React.ReactNode;
}
const Renderer: React.FC<RendererProps> = ({ selectedLayout }) => {
  if (selectedLayout.length > 0) {
    return (
      <div>
        <div></div>
        <div
          style={{
            width: 60 * 30,
            position: "relative",
            background: "skyblue",
            height: 60 * 10,
          }}
        >
          {selectedLayout.map((key: any) => (
            <SingleKey
              x={key.x}
              y={key.y}
              h={key.h}
              w={key.w}
              label={key.label}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <div> select a keyboards</div>;
  }
};

const mapStateToProps = (state: any) => ({
  selectedLayout: state.keyboards.selectedLayoutData,
});

export default connect(mapStateToProps, {})(Renderer);
