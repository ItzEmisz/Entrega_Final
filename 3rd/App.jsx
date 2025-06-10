import React from "react";
import TextCursor from "./TextCursor";
import PixelCard from "./PixelCard";
import Cube3D from "./Cube3D";
import "./PixelCard.css";

export function TextCursorArea() {
  return (
    <div style={{ width: "100%", height: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <TextCursor
        text="Hello!"
        delay={0.01}
        spacing={80}
        followMouseDirection={true}
        randomFloat={true}
        exitDuration={0.3}
        removalInterval={20}
        maxPoints={10}
      />
    </div>
  );
}

export function PixelCardArea() {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <PixelCard variant="pink" style={{ width: "100%", maxWidth: "100%" }} />
    </div>
  );
}

export function Cube3DArea() {
  return <Cube3D />;
}