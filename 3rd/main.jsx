import React from "react";
import ReactDOM from "react-dom/client";
import { TextCursorArea, PixelCardArea, Cube3DArea } from "./App";
import "./main.css";
import "./TextCursor.css";
import "./PixelCard.css";

ReactDOM.createRoot(document.getElementById("react-root-text")).render(<TextCursorArea />);
ReactDOM.createRoot(document.getElementById("react-root-pixel")).render(<PixelCardArea />);
// Renderiza el modelo 3D como sección abajo del poster 2
const posterP3 = document.querySelector('.poster-container.poster-p3');
if (posterP3) {
  const cubeDiv = document.createElement('div');
  cubeDiv.id = 'react-root-cube3d-section';
  posterP3.insertAdjacentElement('afterend', cubeDiv);
  ReactDOM.createRoot(cubeDiv).render(<Cube3DArea />);
}