"use client";

import { Opinions } from "./opinions/Opinions";
import { Summaries } from "./summaries/Summaries";
import { useAppContext } from "../AppContext";
import { useEffect } from "react";
import { type_colors } from '../annotations/opinions/ColorSelector';

function Explanation() {
  return (
    <div className="welcome-content" style={{ marginLeft: '3rem', marginTop: '2rem' }}>
              <h2>Rappel de la tâche</h2>
              <br/>
              <p>Chaque opinion contient une ou plusieurs <strong>unités argumentatives</strong> (chaque idée exprimée correspond à une unité argumentative). Dans chaque unité, vous pouvez trouver trois types de segments:</p>
              <ul>
                  <li>🗣️ <span style={{color: type_colors["claim"]}}> <strong>Affirmation(s)</strong> </span> — l’auteur exprime son opinion sans donné d'argument ou de solution. (“je pense que…”, “il n’est pas normal que…”).</li>
                  <li>💡 <span style={{color: type_colors["solution"]}}> <strong>Solution(s)</strong> </span> — une proposition concrète pour résoudre un problème.</li>
                  <li>📌 <span style={{color: type_colors["premise"]}}> <strong>Argument(s)</strong> </span> — une justification ou un exemple qui soutient une affirmation ou une solution.</li>
              </ul>
              <p>
              ⚠️ Toutes les unités argumentatives n’ont pas forcément les trois rôles. Il peut aussi y avoir plusieurs segments d’un même type (souvent plusieurs arguments).
              </p>
              <br />
              <p> Votre tâche est de <strong>trouver les différentes unités argumentatives des opinions</strong>, et d'<strong>annoter leurs sous-segments de texte selon les trois types</strong> ci-dessus. </p> 
              <p>Ensuite, chaque unité argumentative sera réécrite par une intelligence artificielle générative. <strong>Vous devez vérifier et modifier ces textes générés par IA</strong> pour qu'ils représentent
              parfaitement l'unité argumentative.</p> 
      </div>
  )
}


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
      <div style={{display: "flex", flexDirection: "row"}}>
        <Opinions/>
        <Summaries/>
      </div>
        <Explanation />
    </div>
  );
}


