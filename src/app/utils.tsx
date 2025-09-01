import { Segment, Color } from "./types";

export const generateSegmentId = (opinionId: string, color: string, hex: string,  segments: { [key: string]: Segment }): string => {
    let baseSegmentId = `${opinionId}-${color}-${hex}`;
    let counter = 1;
    let segmentId = `${baseSegmentId}-${counter}`;

    // Check for existing keys and append -1, -2, etc. until unique
    while (segments.hasOwnProperty(segmentId)) {
        segmentId = `${baseSegmentId}-${counter}`;
        counter++;
    }
    return segmentId   
}