"use client";

import { Opinions } from "./opinions/Opinions";
import { Summaries } from "./summaries/Summaries";
import { useAppContext } from "../AppContext";
import { useEffect } from "react";
import { type_colors } from '../annotations/opinions/ColorSelector';
import { ExplainCorrection, ExplainTask } from "../welcome/components/explanations";
import Link from "next/link";



export default function AnnotationsPage() {
  
  const {
    handleNext, setHasStarted, hasStarted, token, setToken
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

  if (!token) {
	return(
    <div>
      Veuillez retourner sur la page de toturiel et entrez votre token d'identification

      <Link href="/welcome" style={{ color: "white", marginLeft: "1rem", textDecoration: "none", backgroundColor: "red"}}>
                Retour au tutoriel
        </Link>

    </div>
)
  }

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


