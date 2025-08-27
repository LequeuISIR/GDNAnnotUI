"use client"

import { Opinion, Segment, Summary, summaryResults, Color } from "../../types";
import { useState, useRef, useEffect } from "react";
import {ColorSelector, colors, type_colors} from "./ColorSelector";
import { PopUpComponent } from "./Popup";
import {generateSegmentId} from "../../utils"
import api from "../../api"
import { useAppContext } from "../../AppContext";

export function Opinions({
 } : {}) {
    const {
        opinion
      } = useAppContext();
    
    if (opinion === null) {
        return (
            <div className="opinion-container">
                <h2>Thank you for your responses!</h2>
            </div>
        );
    }

    return (
        <div className="part-container">
            <h1>
                Opinions
            </h1>
            <h2 className="explanation-text" style={{textAlign: "center"}}>
                Segmentez les unités argumentatives de l'opinion, en surlignant de différentes nuances les rôles des phrases de chaque unité. Cliquez ensuite sur "envoyer" <br/>
                Vus pouvez réinitialiser les segments si vous souhaitez recommencer. <br />
            </h2>
            <OpinionAnnotation opinion={opinion}/>
        </div>
    );
}



export function OpinionAnnotation({
    opinion
}: {
    opinion: Opinion
}) {

    const { 
        setSummaries, handleNext,
        segments, setSegments,
        isLoading, setIsLoading,
        selectedColor, setSelectedColor,
        availableColors, setAvailableColors } = useAppContext();

    const [popupVisible, setPopupVisible] = useState<boolean>(false);
    const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
    const [pendingSegment, setPendingSegment] = useState<Segment | null>(null);
    const [editingSegmentId, setEditingSegmentId] = useState<string | null>(null);
    const [showReportMenu, setShowReportMenu] = useState(false);
    
    const textRef = useRef<HTMLParagraphElement>(null);
    const pendingSpanRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (pendingSpanRef.current && pendingSegment) {
            const rect = pendingSpanRef.current.getBoundingClientRect();
            setPopupPosition({
                x: rect.right + window.scrollX + 5,
                y: rect.top + window.scrollY - 20,
            });
            setPopupVisible(true);

            // Clear the pending segment and ref after popup shown
            setPendingSegment(null);
            pendingSpanRef.current = null;
        }
    }, [segments]); // re-run after a new segment is added

    const handleRemoveColor = (color: Color | string) => {
        const newSegments = { ...segments };
        if (typeof color == "string") {
            const matchingKeys = Object.keys(newSegments).filter(key => key.includes(color));
            matchingKeys.map((el) => delete newSegments[el]) 
        }
        else { 
            const matchingKeys = Object.keys(newSegments).filter(key => key.includes(color.hex) && key.includes(color.color));
            matchingKeys.map((el) => delete newSegments[el]) 
        }
        setSegments(newSegments);
    };

    const activeColors = Object.values(segments).reduce((acc, segment) => {
        acc[segment.color + "-" + segment.hex] = true;
        return acc;
    }, {} as {[key: string]: boolean});
    
    if (!opinion) {
            return <div>
                <h2 className="opinion-author" style={{textAlign: "center"}}>
                    Chargement...</h2>
            </div>;
    }

    const handleTypeSelection = (type: "claim" | "premise" | "solution") => {
        // console.log("test")
        // console.log(editingSegmentId)
        if (editingSegmentId) {
            const updated = { ...segments };
            let segment = {... updated[editingSegmentId]}
            let opinionId = segment.segmentId.split("-")[0]
            let newSegmentId = generateSegmentId(opinionId, segment.color, type_colors[type], segments)
            // console.log(segment.segmentId)
            // console.log(newSegmentId)
            segment.type = type
            segment.hex = type_colors[type]
            segment.segmentId = newSegmentId
            
            delete updated[editingSegmentId]
            updated[newSegmentId] = segment

            setSegments(updated);
            setEditingSegmentId(null);
            setPopupVisible(false);
            return;
        }
        if (!pendingSegment) return;

        const { start, end, text } = pendingSegment;

        let segmentId = generateSegmentId(opinion.opinionId, selectedColor.color, selectedColor.hex, segments)
        
        setSegments({
                ...segments,
                [segmentId]: {
                segmentId: segmentId,
                text: text,
                type: selectedColor.type,
                color: selectedColor.color,
                hex: selectedColor.hex,
                start: start,
                end: end
            }});

            setPopupVisible(false);
            setPendingSegment(null);
        };


    const handleHighlight = () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0 || !textRef.current) return;
    
        const range = selection.getRangeAt(0);
        const selectedText = selection.toString();
        const fullText = opinion.text;
    
        const getOffset = (node: Node, offset: number): number => {
            let totalOffset = 0;
            const walker = document.createTreeWalker(textRef.current!, NodeFilter.SHOW_TEXT, null);
            while (walker.nextNode()) {
                const current = walker.currentNode!;
                if (current === node) {
                    return totalOffset + offset;
                }
                totalOffset += current.textContent?.length ?? 0;
            }
            return -1;
        };
    
        let rawStart = getOffset(range.startContainer, range.startOffset);
        let rawEnd = getOffset(range.endContainer, range.endOffset);
    
        if (!selectedText || rawStart === -1 || rawEnd === -1 || rawStart >= rawEnd) return;
    
        // ✅ Find all full word spans
        // regex to find full words, including accents
        const wordRegex = /[\p{L}\p{M}\p{N}]+|[^\s\p{L}\p{M}\p{N}]/gu;


        let match: RegExpExecArray | null;
        const wordSpans: { start: number; end: number }[] = [];
    
        while ((match = wordRegex.exec(fullText)) !== null) {
            wordSpans.push({ start: match.index, end: match.index + match[0].length });
        }
    
        // ✅ Adjust selection to nearest full words
        const adjustedStart = wordSpans.find(w => w.end > rawStart)?.start ?? -1;
        const adjustedEnd = [...wordSpans].reverse().find(w => w.start < rawEnd)?.end ?? -1;
    
        if (adjustedStart === -1 || adjustedEnd === -1 || adjustedStart >= adjustedEnd) return;
    
        // ✅ Check for overlaps if not the same color
    
        const overlaps = Object.values(segments).some(
            seg => !(adjustedEnd <= seg.start || adjustedStart >= seg.end) && seg.color !== selectedColor.hex
        );
    
        if (overlaps) {
            console.warn("Cannot highlight overlapping region.");
            return;
        }
    
        const text = fullText.slice(adjustedStart, adjustedEnd);
        
        let baseSegmentId = `${opinion.opinionId}-${selectedColor.color}-${selectedColor.hex}`;
        let segmentId = baseSegmentId;
        let counter = 1;

        // Check for existing keys and append -1, -2, etc. until unique
        while (segments.hasOwnProperty(segmentId)) {
        segmentId = `${baseSegmentId}-${counter}`;
        counter++;
}       

        setPendingSegment({
                segmentId: segmentId,
                text: text,
                type: selectedColor.type,
                color: selectedColor.color,
                hex: selectedColor.hex,
                start: adjustedStart,
                end: adjustedEnd
            }
        );


        
        setSegments({
            ...segments,
            [segmentId]: {
                segmentId: segmentId,
                text: text,
                type: selectedColor.type,
                color: selectedColor.color,
                hex: selectedColor.hex,
                start: adjustedStart,
                end: adjustedEnd
            }
        });
        
        
        const rect = range.getBoundingClientRect();
        setEditingSegmentId(segmentId)
        setPopupPosition({ x: rect.right + window.scrollX + 20, y: rect.bottom + window.scrollY});
        setPopupVisible(true);

    
        selection.removeAllRanges(); // Optional: clear selection
    };
    
    const handleReport = async (reason:string) => {
        setIsLoading(true);
        try {
            api.post("/report", JSON.stringify({
                "opinion":opinion,
                "reason": reason
            }))
                .catch((error) =>{
                    throw new Error('Failed to send response');
                } )
                .then(() => {
                    setIsLoading(false);
                    setSegments({});
                    setSummaries([]);
                    handleNext();
                })
        } catch (error) {
            console.error('Error sending response:', error);
        }
    };
    
    
    const handleReset = () => {
        setSegments({});
        setSummaries([]);
        setAvailableColors([Object.keys(colors)[0]]);
        setSelectedColor(Object.values(colors)[0][0]);
        console.log("reinitialized")
    };



    const handleSubmit = async (setSummaries: (summaries: Summary[]) => void) => {
        setIsLoading(true);
        try {
            api.post("/opinion-response", JSON.stringify({
                    opinionId: opinion.opinionId,
                    full_text: opinion.text,
                    authorName: opinion.authorName,
                    segments: segments
                }))
                .then((response) =>{ 
                    const data: summaryResults = response.data
                    setSummaries(data["results"]);
                })
                .catch((error) => {
                    throw new Error('Failed to send response');
                })
           
                        // if (!data) {
            //     throw new Error('No data received from server');
            // }
            // Handle both single object and array responses
        
            // if (!Array.isArray(data)) {
            //     throw new Error('Expected array response but received: ' + JSON.stringify(data));
            // }


            

        } catch (error) {
            console.error('Error sending response:', error);
        } finally {
            setIsLoading(false);
        }
    };


    return <div className="opinion-half">
                <div className="color-picker">
                    <ColorSelector 
                        setColor={setSelectedColor} 
                        activeColors={activeColors}
                        onRemoveColor={handleRemoveColor}
                        availableColors={availableColors}
                        setAvailableColors={setAvailableColors}
                        setSelectedColor={setSelectedColor}
                        selectedColor={selectedColor}
                    />
                </div>
                <div>
                <OpinionLayout 
                    opinion={opinion} 
                    onHighlight={handleHighlight}
                    segments={segments}
                    textRef={textRef}
                    selectedColor={selectedColor}
                    setPopupPosition={setPopupPosition}
                    setPopupVisible={setPopupVisible}
                    setEditingSegmentId={setEditingSegmentId}
                    pendingSegment={pendingSegment}
                    pendingSpanRef={pendingSpanRef}
                />
                {popupVisible && popupPosition && (
                    <PopUpComponent popupPosition={popupPosition} 
                                    popupVisible={popupVisible} 
                                    setPopupVisible={setPopupVisible} 
                                    handleTypeSelection={handleTypeSelection}
                                    editingSegmentId={editingSegmentId}
                                    segments={segments}
                                    setSegments={setSegments} />
                )}

                {/* <button
                        onClick={() => handleReport()}
                        disabled={isLoading}
                        className="button button-report"
                    >
                        signaler
                </button> */}
                      {/* -------- Signaler avec menu -------- */}
            <div style={{ position: "relative", display: "inline-block" }}>
                <button
                onClick={() => setShowReportMenu((prev) => !prev)}
                disabled={isLoading}
                className="button button-report"
                >
                Signaler
                </button>

                {showReportMenu && (
                <div
                    style={{
                    position: "absolute",
                    top: "110%",
                    left: 0,
                    backgroundColor: "grey",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                    zIndex: 10,
                    }}
                >
                    {[
                    "discours de haine",
                    "incomprehensible",
                    "trop d'unités argumentatives",
                    "autre",
                    ].map((reason) => (
                    <div
                        key={reason}
                        onClick={() => {
                        handleReport(reason);
                        setShowReportMenu(false);
                        }}
                        style={{
                        padding: "0.5rem 1rem",
                        cursor: "pointer",
                        borderBottom: "1px solid #eee",
                        color: "black"
                        }}
                        onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f5f5f5")
                        }
                        onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "grey")
                        }
                    >
                        {reason}
                    </div>
                    ))}
                </div>
                )}
            </div>
      {/* ----------------------------------- */}

                <div className="button-container">
                    <button
                            onClick={handleReset}
                            disabled={isLoading || Object.keys(segments).length === 0}
                            className="button button-reset"
                        >
                        réinitialiser
                    </button>
                    <button
                        onClick={() => handleSubmit(setSummaries)}
                        disabled={isLoading || Object.keys(segments).length === 0}
                        className="button button-accept"
                    >
                        Envoyer
                    </button>
                    
                </div>
                {/* <div className="opinion-counter">
                    Opinion {currentIndex + 1} of {debate.opinions.length}
                </div> */}
                </div>
            </div>
}

export function OpinionLayout({
    opinion,
    onHighlight,
    segments,
    textRef,
    selectedColor,
    setPopupPosition,
    setPopupVisible,
    setEditingSegmentId,
    pendingSegment,
    pendingSpanRef
}: {
    opinion: Opinion;
    onHighlight: () => void;
    segments: {[key: string]: Segment};
    textRef: React.RefObject<HTMLParagraphElement | null>;
    selectedColor: Color,
    setPopupPosition: (pos: { x: number; y: number } | null) => void,
    setPopupVisible: (arg: boolean) => void,
    setEditingSegmentId: (arg: string | null) => void,
    pendingSegment: Segment | null,
    pendingSpanRef: React.RefObject<HTMLElement | null>
}) {

    


    const renderHighlightedText = () => {
        const { text } = opinion;
        if (Object.keys(segments).length === 0) return <span key={`text`} style={{lineHeight: "150%", fontSize: 18}}>{text}</span>;
    
        const elements: React.ReactElement[] = [];
        let lastIndex = 0;

        
    
        // Sort segments to render from start to end
        const sorted = Object.values(segments).sort((a, b) => a.start - b.start);
        // console.log(sorted)
        sorted.forEach(({ segmentId, start, end, hex, color}, idx) => {
            if (start > lastIndex) {
                elements.push(<span key={`text-${idx}-pre`} style={{fontSize: 18, lineHeight: "150%"}}>{text.slice(lastIndex, start)}</span>);
            }
            elements.push(
                <span
                    key={`highlight-${idx}`}
                    ref={(el) => {
                        // Save the span if it's the pending segment
                        if (
                            pendingSegment &&
                            pendingSegment.start === start &&
                            pendingSegment.end === end
                        ) {
                            pendingSpanRef.current = el;
                        }
                    }}
                    
                    onClick={(e) => {
                        e.stopPropagation(); // prevent global deselect
                        const rect = (e.target as HTMLElement).getBoundingClientRect();
                        setEditingSegmentId(segmentId);
                        
                        setPopupPosition({ x: rect.right + window.scrollX + 5, y: rect.top + window.scrollY - 5 });
                        setPopupVisible(true);
                    }}

                    style={{
                        fontSize: 18,
                        marginLeft: "4px",
                        marginRight: "4px",
                        backgroundColor: selectedColor.color === color ? hex : "grey",
                        boxShadow: (selectedColor.color === color) ? (selectedColor.hex === hex) ? "0 0 0 1px lightgrey" : "none" : `0 0 0 2px ${color}`,
                        position: (selectedColor.color === color && selectedColor.hex === hex) ? "relative" : "unset",
                        zIndex: (selectedColor.color === color && selectedColor.hex === hex) ? 1 : "auto",
                        lineHeight: "150%"
                     }}
                >
                    {text.slice(start, end)}
                </span>
            );
            lastIndex = end;
        });
    
        if (lastIndex < text.length) {
            elements.push(<span key="text-post" style={{fontSize: 18, lineHeight: "150%"}}>{text.slice(lastIndex)}</span>);
        }
    
        return elements;
    };
    

    return (
        <div className="opinion-container">
            <div className="opinion-card">
                <div>
                    <div className="opinion-header">
                        <p className="opinion-author">{opinion.authorName}</p>
                        <p className="opinion-author">id: {opinion.opinionId}</p>
                    </div>
                    <div >
                        <p
                            ref={textRef}
                            className="opinion-text"
                            onMouseUp={onHighlight}
                        >
                            {renderHighlightedText()}
                        </p>
                    </div>
                </div>
            </div>
            
        </div>
    );
    }   

