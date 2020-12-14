import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "react-widgets/dist/css/react-widgets.css";
import "./App.css";
import Picker from "./components/picker/picker";
import Renderer from "./components/renderer/renderer";
import Settings from "./components/settings/settings";
import Options from "./components/options/options";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Picker />
        <Renderer />
        <Settings />
        <Options />
      </DndProvider>
    </div>
  );
}

export default App;
