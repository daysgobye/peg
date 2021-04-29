import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../reducers/index";
import { updateScreen } from "../../../reducers/keymap";
import { LayerRange, screen, singleScreenLayer } from "../../../reducers/types";
import DropdownList from "react-widgets/lib/DropdownList";
import ScreenExampleRender from "./screenExampleRender";
import ScreenEditor from "./screenEditor";
interface ScreenProps {
  data: screen;
  index: 0 | 1;
  updateScreen: (screen: screen, index: 0 | 1) => void;
  selectedLayer: LayerRange;
}
const Screen: React.FC<ScreenProps> = ({
  selectedLayer,
  index,
  data,
  updateScreen,
}) => {
  const sendOffUpdate = (name: string, value: any) => {
    let copyOfScreen = { ...data };
    //@ts-ignore
    copyOfScreen[name] = value; // lol dirty tricks engage

    updateScreen(copyOfScreen, index);
  };
  const handleSizeChange = (name: "x" | "y", newValue: 32 | 64 | 128) => {
    let copyOfSize = { ...data.size };
    copyOfSize[name] = newValue;
    if (copyOfSize.x !== 128 && copyOfSize.y !== 128) {
      if (name === "x") {
        copyOfSize.y = 128;
      } else {
        copyOfSize.x = 128;
      }
    }
    sendOffUpdate("size", copyOfSize);
  };
  const [screenColor, updateScreenColor] = useState<"white" | "blue">("blue");
  const updateScreenDisplay = (newScreen: singleScreenLayer) => {
    let copyofLayers = [...data.layers];
    copyofLayers[selectedLayer] = newScreen;
    sendOffUpdate("layers", copyofLayers);
  };
  return (
    <div>
      <div>
        <p>size</p>
        <div style={{ display: "flex" }}>
          <label>
            x
            <DropdownList
              value={data.size.x}
              data={[32, 64, 128]}
              onChange={(value) => handleSizeChange("x", value)}
            />
          </label>
          <label>
            y
            <DropdownList
              value={data.size.y}
              data={[32, 64, 128]}
              onChange={(value) => handleSizeChange("y", value)}
            />
          </label>
          <label>
            screen color
            <DropdownList
              value={screenColor}
              data={["blue", "white"]}
              onChange={updateScreenColor}
            />
          </label>
          <label>
            flip
            <input
              type="checkbox"
              onChange={(e) => sendOffUpdate("flip", e.target.checked)}
              checked={data.flip}
            />
          </label>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <ScreenExampleRender
          data={data}
          screen={data.layers[selectedLayer]}
          screenColor={screenColor}
        />
        <ScreenEditor
          updateScreen={updateScreenDisplay}
          data={data}
          screen={data.layers[selectedLayer]}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (state: RootState) => ({
  selectedLayer: state.keyboards.selectedLayer,
});

export default connect(mapStateToProps, {
  updateScreen,
})(Screen);
