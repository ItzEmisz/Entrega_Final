import React from "react";
import ReactDOM from "react-dom/client";
import { GsapEffects } from "./GsapEffects";
import { TextCursorArea, PixelCardArea, Cube3DArea } from "./App";
import "./main.css";
import "./TextCursor.css";
import "./PixelCard.css";

// Montar GsapEffects para asegurar que las animaciones se apliquen al DOM base
GsapEffects();

ReactDOM.createRoot(document.getElementById("react-root-text")).render(<TextCursorArea />);
ReactDOM.createRoot(document.getElementById("react-root-pixel")).render(<PixelCardArea />);
ReactDOM.createRoot(document.getElementById("react-root-cube3d-section")).render(<Cube3DArea />);