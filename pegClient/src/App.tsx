import React from "react";
import logo from "./logo.svg";
import "react-widgets/dist/css/react-widgets.css";
import "./App.css";
import Picker from "./components/picker/picker";
import Renderer from "./components/renderer/renderer";
import Settings from "./components/settings/settings";
import Options from "./components/options/options";

function App() {
  return (
    <div className="App">
      <Picker />
      <Renderer />
      <Settings />
      <Options />
    </div>
  );
}

export default App;
