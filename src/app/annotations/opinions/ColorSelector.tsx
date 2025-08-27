"use client"

import { setMaxIdleHTTPParsers } from "http";
import React, { useState, useEffect } from "react";
import {Color} from '../../types';

export const type_colors : { [type: string]: string} = {
  claim: "#D32F2F",
  premise: "#1976D2",
  solution: "#388E3C",
  affirmation: "#D32F2F",
  argument: "#1976D2",
}

export const colors: { [color: string]: Color[] } = {
  // red: [
  //   { color: "red", hex: type_colors["claim"], type: "claim" },
  //   { color: "red", hex: type_colors["premise"], type: "premise" },
  //   { color: "red", hex: type_colors["solution"], type: "solution" }
  // ],
  // blue: [
  //   { color: "blue", hex: type_colors["claim"], type: "claim" },
  //   { color: "blue", hex: type_colors["premise"], type: "premise" },
  //   { color: "blue", hex: type_colors["solution"], type: "solution" }
  // ],
  // green: [
  //   { color: "green", hex: type_colors["claim"], type: "claim" },
  //   { color: "green", hex: type_colors["premise"], type: "premise" },
  //   { color: "green", hex: type_colors["solution"], type: "solution" }
  // ],

  orange: [
    { color: "orange", hex: type_colors["claim"], type: "claim" },
    { color: "orange", hex: type_colors["premise"], type: "premise" },
    { color: "orange", hex: type_colors["solution"], type: "solution" }
  ],
  teal: [
    { color: "teal", hex: type_colors["claim"], type: "claim" },
    { color: "teal", hex: type_colors["premise"], type: "premise" },
    { color: "teal", hex: type_colors["solution"], type: "solution" }
  ],
  purple: [
    { color: "purple", hex: type_colors["claim"], type: "claim" },
    { color: "purple", hex: type_colors["premise"], type: "premise" },
    { color: "purple", hex: type_colors["solution"], type: "solution" }
  ],
  brown: [
    { color: "brown", hex: type_colors["claim"], type: "claim" },
    { color: "brown", hex: type_colors["premise"], type: "premise" },
    { color: "brown", hex: type_colors["solution"], type: "solution" }
  ],
  indigo: [
    { color: "indigo", hex: type_colors["claim"], type: "claim" },
    { color: "indigo", hex: type_colors["premise"], type: "premise" },
    { color: "indigo", hex: type_colors["solution"], type: "solution" }
  ],
  yellow: [
    { color: "yellow", hex: type_colors["claim"], type: "claim" },
    { color: "yellow", hex: type_colors["premise"], type: "premise" },
    { color: "yellow", hex: type_colors["solution"], type: "solution" }
  ],
    magenta: [
    { color: "magenta", hex: type_colors["claim"], type: "claim" },
    { color: "magenta", hex: type_colors["premise"], type: "premise" },
    { color: "magenta", hex: type_colors["solution"], type: "solution" }
  ],
  cyan: [
    { color: "cyan", hex: type_colors["claim"], type: "claim" },
    { color: "cyan", hex: type_colors["premise"], type: "premise" },
    { color: "cyan", hex: type_colors["solution"], type: "solution" }
  ],
  lime: [
    { color: "lime", hex: type_colors["claim"], type: "claim" },
    { color: "lime", hex: type_colors["premise"], type: "premise" },
    { color: "lime", hex: type_colors["solution"], type: "solution" }
  ],
  olive: [
    { color: "olive", hex: type_colors["claim"], type: "claim" },
    { color: "olive", hex: type_colors["premise"], type: "premise" },
    { color: "olive", hex: type_colors["solution"], type: "solution" }
  ],
  maroon: [
    { color: "maroon", hex: type_colors["claim"], type: "claim" },
    { color: "maroon", hex: type_colors["premise"], type: "premise" },
    { color: "maroon", hex: type_colors["solution"], type: "solution" }
  ]
};




function ColorButtonGroup({
  currentColor,
  currentId,
  setAllColors,
  selectedColor,
  activeColors,
  onRemoveColor,
  availableColors,
  setAvailableColors
  
}: {
  currentColor: string,
  currentId: number,
  setAllColors: (hex: Color) => void,
  selectedColor: Color,
  activeColors: {[key: string]: boolean},
  onRemoveColor: (color: Color | string) => void,
  availableColors: string[], // now stores color keys, not hexes
  setAvailableColors: (colors: string[]) => void,
}): React.ReactElement {


  const RemoveColorGroup = (color: string) => {
    onRemoveColor(color)
    let newAvailableColors = [...availableColors]
    const index = newAvailableColors.indexOf(color);
    if (index > -1) { // only splice array when item is found
        newAvailableColors.splice(index, 1); // 2nd parameter means remove one item only
      }
    setAvailableColors(newAvailableColors)
    
  }

  return (
    <div key={currentColor + currentId} 
          style={{borderColor: currentColor, 
                  borderWidth: (selectedColor.color === currentColor) ?"3px": "2px", 
                  borderStyle: "solid",
                  borderRadius: "1rem",
                  margin: "2px",
                  padding: "0.4rem",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent:" center",
                  position: "relative",
                  }}>
      {colors[currentColor].map((color, idx) => (
        <div key={color.hex} style={{position: "relative", display: "inline-block", margin: '0.4rem'}}>
          <button
            onClick={() => setAllColors(color)}
            style={{
              backgroundColor: (selectedColor.color === color.color) ? color.hex : "grey",
              border: (selectedColor.hex === color.hex && selectedColor.color === color.color) ? "3px solid white" : "1px solid #ccc",
              width: (selectedColor.hex === color.hex && selectedColor.color === color.color) ? "70px" : "60px",
              height: (selectedColor.hex === color.hex && selectedColor.color === color.color) ? "40px" : "35px",
              cursor: "pointer",
              borderRadius: "0.5rem",
            }}
            title={`${currentColor} shade ${idx + 1}`}
          >
            {idx === 0 ? "Affirm." : idx === 1 ? "Argum." : "Solution"}
          </button>
          
          {activeColors[color.color + "-" + color.hex] && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveColor(color);
              }}
              className="remove-color-button"
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',  
                width: '18px',
                height: '18px',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
              }}
              title={`Remove ${currentColor} shade ${idx + 1} highlights`}
            >
              <span style={{ fontSize: "12px", color: "black" }}>×</span>
            </button>
          )}
        </div>
      ))}
      <button
              onClick={(e) => {
                e.stopPropagation();
                RemoveColorGroup(currentColor);
              }}
              className="remove-color-button"
              style={{
                position: 'absolute',
                top: '-10px',
                left: '-10px',  
                width: '20px',
                height: '20px',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
              }}
              title={`Remove ${currentColor} highlights`}
            >
              <span style={{ fontSize: "12px", color: "black" }}>×</span>
            </button>
    </div>

  )
}


export function ColorSelector({
  setColor,
  activeColors,
  onRemoveColor,
  availableColors,
  setAvailableColors,
  setSelectedColor,
  selectedColor
}: {
  setColor: (color: Color) => void,
  activeColors: {[key: string]: boolean},
  onRemoveColor: (color: Color | string) => void,
  availableColors: string[], // now stores color keys, not hexes
  setAvailableColors: (colors: string[]) => void,
  setSelectedColor: (color: Color) => void,
  selectedColor: Color
}): React.ReactElement {
  // Update available colors when activeColors changes

  // useEffect(() => {
  //   const activeColorCount = Object.values(activeColors).filter(Boolean).length;
  //   // console.log("Active colors count:", activeColorCount);
  //   const colorKeys = Object.keys(colors);
  //   if (availableColors.length < activeColorCount + 1 && availableColors.length < 3*colorKeys.length) {
  //     const nextColorKey = colorKeys[activeColorCount] as keyof typeof colors;
  //     setAvailableColors(colorKeys.slice(0, activeColorCount + 1));
  //     setSelectedColor(colors[nextColorKey][0]);
  //   }
  // }, [activeColors]);

  const setAllColors = (color: Color) => {
    setColor(color);
    setSelectedColor(color);
  }

  // console.log("availableColors:", availableColors);

  // Flatten availableColors to all hexes for rendering
  const colorSquares = availableColors
    .filter((colorKey) => colors[colorKey as keyof typeof colors])
    .flatMap((colorKey) =>
      (colors[colorKey as keyof typeof colors] || []).map((hex, idx) => ({
        hex,
        colorKey,
        shadeIdx: idx
      }))
    );

    // console.log("Color squares:", availableColors);


  return (
    <div style={{ fontFamily: "sans-serif", padding: "1rem",  justifyContent: "center", display: "flex", flexDirection: "column" }}>
      {/* <h2 style={{fontSize: "1rem"}}>🎨 Segment Color</h2> */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "1rem", justifyContent: "center", alignItems: "center" }}>
        {availableColors.map((color, idx) => (
          <ColorButtonGroup key={color} currentColor={color} currentId={idx} 
          setAllColors={setAllColors} selectedColor={selectedColor} 
          activeColors={activeColors} onRemoveColor={onRemoveColor}
          setAvailableColors={setAvailableColors} availableColors={availableColors}/>
        ))}
        {availableColors.length < Object.keys(colors).length && (
          <button
            onClick={() => {
              const colorKeys = Object.keys(colors);
              const nextColorKey = colorKeys[availableColors.length];
              setAvailableColors([...availableColors, nextColorKey]);
              setAllColors(colors[nextColorKey][0]);
            }}
            style={{
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              width: "35px",
              height: "35px",
              cursor: "pointer",
              borderRadius: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              color: "#666",
            }}
            title="Add new color"
          >
            +
          </button>
        )}
      </div>
    </div>
  );
};
