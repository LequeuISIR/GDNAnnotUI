export interface Opinion {
    opinionId: string;
    text: string;
    authorName: string;
  }
  

export interface SegmentArgument {
    segment: Segment;
    argument: string;
}
export interface OpinionResults {
    opinion: Opinion;
    results: Summary[];
}

export interface Segment {
    segmentId: string;
    text: string;
    type: "claim"|"premise"|"solution"|"unchosed"; 
    color: string;
    hex: string;
    start: number;
    end: number;
}       

export interface summaryResults {
    results: Summary[];
}
    
export interface Summary {
    segments: Segment[];
    color: string;
    LLMtext: string;
    text: string;
}

export interface Color {
    color: string;
    hex: string;
    type: "claim"|"premise"|"solution"|"unchosed";
}

export interface UserInformation {
    token: string,
    current_annotation: string,
    current_annotation_text: string,
    done_annotations: {[opinionid: string]: string}
}