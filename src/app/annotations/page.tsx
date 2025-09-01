"use client";

import { Opinions } from "./opinions/Opinions";
import { Summaries } from "./summaries/Summaries";
import { useAppContext } from "../AppContext";
import { useEffect } from "react";
import { type_colors } from '../annotations/opinions/ColorSelector';
import { ExplainCorrection, ExplainTask } from "../welcome/page";



export default function AnnotationsPage() {
  
  const {
    handleNext, setHasStarted, hasStarted
  } = useAppContext();

  useEffect(() => {
          if (hasStarted) {
          setHasStarted(false)
          }
      }, [hasStarted]);

  
  useEffect(() => {
  (async () => {
    await handleNext();
  })();
  }, []);

  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
      <div style={{display: "flex", flexDirection: "row", marginBottom: "3rem"}}>
        <Opinions/>
        <Summaries/>
      </div>
      <div>
      <h2 style={{marginBottom: "1rem"}}>Rappel de la tâche</h2>
        <ExplainTask />
        <ExplainCorrection />
      </div>
    </div>
  );
}


