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
      <div style={styles.container}>
        <div style={styles.sideBar}></div>
        <div
          style={{
            width: "85%",
            position: "relative",
            background: "skyblue",
            height: 60 * 10,
          }}
        >
          {selectedLayout.map((key: any, i: number) => (
            <SingleKey
              key={i}
              index={i}
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

const mapStateToProps = (state: RootState) => ({
  keymap: state.keymap,
  selectedLayout: state.keyboards.selectedLayoutData,
});

export default connect(mapStateToProps, {})(Renderer);

const styles = {
  container: {
    width: "100vw",
    display: "Flex",
  },
  options: {
    position: "relative",
    width: "75%",
  },
  sideBar: {
    width: "15%",
  },
};
