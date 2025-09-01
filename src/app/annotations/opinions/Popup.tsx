import React, { useEffect, useRef, useState } from "react";
import { type_colors } from "./ColorSelector";
import { Segment } from "../../types";

export function PopUpComponent({
    popupPosition,
    popupVisible,
    setPopupVisible,
    handleTypeSelection,
    editingSegmentId,
    segments,
    setSegments
}: {
    popupPosition: { x: number; y: number },
    popupVisible: boolean,
    setPopupVisible: (set: boolean) => void,
    handleTypeSelection: (type: any) => void
    editingSegmentId: string | null,
    segments: {[key: string]: Segment};
    setSegments: (segments: {[key: string]: Segment}) => void;
}): React.ReactElement {

    const handleClick = (type: "Affirmation" | "Argument" | "Solution") => {
    
        let translations = {
            Affirmation: "claim",
            Argument: "premise",
            Solution: "solution"
        }
        console.log("new type:", type)
        handleTypeSelection(translations[type])

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
                {(["Affirmation", "Argument", "Solution"] as const).map((type) => (
                    <div
                        key={type}
                        style={{ padding: "4px 8px", cursor: "pointer", backgroundColor: type_colors[type.toLowerCase()], display: "flex", justifyContent: "center"}}
                        onClick={() => handleClick(type)}
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

