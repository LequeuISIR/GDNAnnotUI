import React, { useEffect, useRef, useState } from "react";
import { type_colors } from "./ColorSelector";
import { Segment } from "../../types";
import { useAppContext } from "../../AppContext";

export function PopUpComponent({
    popupPosition,
    popupVisible,
    setPopupVisible,
    handleTypeSelection,
    handleColorSelection,
    editingSegmentId,
    segments,
    setSegments
}: {
    popupPosition: { x: number; y: number },
    popupVisible: boolean,
    setPopupVisible: (set: boolean) => void,
    handleTypeSelection: (type: any) => void,
    handleColorSelection: (color: string) => void,
    editingSegmentId: string | null,
    segments: {[key: string]: Segment};
    setSegments: (segments: {[key: string]: Segment}) => void;
}): React.ReactElement {

    const {availableColors} = useAppContext()


    const handleTypeChangeClick = (type: "Affirmation" | "Argument" | "Solution") => {
    
        let translations = {
            Affirmation: "claim",
            Argument: "premise",
            Solution: "solution"
        }

        console.log("new type:", type)
        handleTypeSelection(translations[type])

    }

    const handleColorChangeClick = (color: string) => {
        handleColorSelection(color)
    }


    const popupRef = useRef<HTMLDivElement | null>(null);
    
    const removeSegment = () => {
        console.log(editingSegmentId)
        if (editingSegmentId) {
            let new_segments = {...segments}
            delete new_segments[editingSegmentId]
            setSegments(new_segments)
            setPopupVisible(false)
        }
    }

    
    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            if (editingSegmentId) {
                if (segments[editingSegmentId].type === "unchosed") {
                    removeSegment()
                }
            }
            setPopupVisible(false);
        }
    };


    useEffect(() => {
        if (popupVisible) {
        document.addEventListener("mousedown", handleClickOutside);
        } else {
        document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [popupVisible]);

    return (
        <>
            <div
                ref={popupRef}
                style={{
                    position: "absolute",
                    top: popupPosition.y,
                    left: popupPosition.x,
                    backgroundColor: "grey",
                    border: "1px solid grey",
                    borderRadius: "4px",
                    padding: "6px",
                    zIndex: 1000,
                    boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "8px",
                    justifyContent: "space-between"
                }}
            >   
                <p>Unité argumentative</p>
                <div style={{display: "flex", flexDirection: "row"}}>
                {
                    availableColors.map((color: string) => (
                        <div
                        key={color}
                        style={{ marginRight: "3px", 
                            width: (segments[editingSegmentId as string].color === color ? "22px" : "20px"), 
                            height: (segments[editingSegmentId as string].color === color ? "22px" : "20px"), 
                            cursor: "pointer", 
                            backgroundColor: color,
                            border: (segments[editingSegmentId as string].color === color ? "2px solid white" : "1px solid #ccc"),
                            display: "flex", 
                            justifyContent: "center"}}
                        onClick={() => handleColorChangeClick(color)} />
                    ))
                }
                </div>
                <p>type de segment</p>
                {(["Affirmation", "Argument", "Solution"] as const).map((type) => (
                    <div
                        key={type}
                        style={{ padding: "4px 8px", cursor: "pointer", backgroundColor: type_colors[type.toLowerCase()], display: "flex", justifyContent: "center"}}
                        onClick={() => handleTypeChangeClick(type)}
                    >
                        {type}
                    </div>
                    
                ))}
                <div
                    style={{ padding: "4px 8px", cursor: "pointer", display: "flex", justifyContent: "center"}}
                    onClick={() => removeSegment()}
                    >
                    supprimer
                    </div>
            </div>
        </>
    )
}

