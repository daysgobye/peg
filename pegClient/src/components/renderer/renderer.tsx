import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../reducers/index";
import { changeLayer } from "../../reducers/keyboards";
import { LayerRange } from "../../reducers/types";
import SingleKey from "./singleKey";

interface RendererProps {
  selectedLayout?: any;
  children?: React.ReactNode;
  selectedLayer: LayerRange;
  changeLayer: any;
}
const Renderer: React.FC<RendererProps> = ({
  selectedLayout,
  changeLayer,
  selectedLayer,
}) => {
  if (selectedLayout.length > 0) {
    return (
      <div style={styles.container}>
        <div style={styles.sideBar}>
          {new Array(6 /* 6 is the total number of layers supported right now*/)
            .fill(0)
            .map((_, i) => (
              <button
                onClick={() => changeLayer(i)}
                style={{
                  background: i === selectedLayer ? "lightBlue" : "lightgrey",
                }}
              >
                layer {i}{" "}
              </button>
            ))}
        </div>
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
  selectedLayer: state.keyboards.selectedLayer,
});

export default connect(mapStateToProps, { changeLayer })(Renderer);

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
    display: "flex",
    "flex-direction": "column",
    width: "15%",
  },
};
