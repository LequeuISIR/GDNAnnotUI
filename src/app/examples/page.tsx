"use client";

import { useState } from "react";
import { OpinionAnnotation } from "../annotations/opinions/Opinions";
import { SummariesAnnotation } from "../annotations/summaries/Summaries";
import { useAppContext } from "../AppContext";
import { Opinion } from "../types";
import { colors, type_colors } from "../annotations/opinions/ColorSelector";

const example_opinion_1: Opinion = {
  opinionId: "introductionExample1",
  text: "Globalement l'impôt, quel qu'il soit doit être plus équitable. Il faut limiter les possibilités \
  d'y échapper (évasion fiscale / niches fiscales / fraudes). L'impôt doit être simplifié, en limitant le nombre de \
  prélèvement ou de taxes pour faciliter la compréhension de tous. Les aides sociales doivent également être plus lisibles \
  : exemple, une aide familiale reprenant toutes celles existantes. Les dépenses doivent également être réalisées avec plus \
  d'équité (ne pas faire profiter qu'un petite partie de la population).",
  authorName: "LA_FISCALITE_ET_LES_DEPENSES_PUBLIQUES",
};

const example_opinion_2: Opinion = {
  opinionId: "introductionExample2",
  text: "Il y a urgence ! Nous sommes responsables de ce que nous allons laissé aux générations futures.",
  authorName: "LA_TRANSITION_ECOLOGIQUE",
};

const example_opinion_3: Opinion = {
  opinionId: "introductionExample3",
  text: "-Faire baisser le prix des maisons de retraite -autoriser l'aide à l'euthanasie active pour celui qui le \
  décide pour lui même, dans certains cas -retour de la peine de mort pour les meurtres d'enfants et de mineurs - perte \
  de nationalité pour les bi nationaux récidiviste et les condamnés pour terrorisme -non retour en France des combattants de Daech",
  authorName: "DEMOCRATIE_ET_CITOYENNETE",
};

const small_explanations: Record<string, string> = {
  introductionExample1:
    "Cet exemple illustre une opinion détaillée avec plusieurs arguments liés à la fiscalité et aux dépenses publiques.",
  introductionExample2:
    "Cet exemple illustre une opinion brève et émotionnelle, centrée sur l'urgence climatique.",
  introductionExample3:
    "Cet exemple illustre une opinion qui enchaîne plusieurs propositions fortes, sur des sujets variés liés à la citoyenneté et la justice.",
};


function ExplanationExampleOne() {
    return (
        <div style={{paddingLeft: "1rem", paddingRight: "1rem"}}>
            Cette exemple à des idées plutôt claires sur la fiscalité. Il illustre bien les différences entre affirmation, argument et solution. <br />
            <div style={{ boxShadow: `0 0 0 2px ${Object.keys(colors)[0]}`, marginTop: "2rem", padding:"10px"}}>
                <h3>Unité argumentative 1</h3> <br />
                <p><i>"Globalement l'impôt, quel qu'il soit doit être plus équitable. Il faut limiter les possibilités d'y échapper (évasion fiscale / niches fiscales / fraudes )."</i></p>
                <br />
                <p><strong>Segmentation:</strong> <br />
                - "Globalement l'impôt, quel qu'il soit doit être plus équitable" est un <span style={{color: type_colors["premise"]}}> <strong>Argument</strong> </span>. Cette phrase appuie la phrase suivante, qui est une solution. <br />
                - "Il faut limiter les possibilités d'y échapper (évasion fiscale / niches fiscales / fraudes)." est une<span style={{color: type_colors["solution"]}}> <strong>Solution</strong> </span>: 
                    il faut limiter les possibilités d'échapper aux impôts par soucis d'équitée. 
                </p> <br/>
            </div>
            <div style={{ boxShadow: `0 0 0 2px ${Object.keys(colors)[1]}`, marginTop: "2rem", padding:"10px"}}>
                <h3>Unité argumentative 2</h3> <br />
                <p><i>"L'impôt doit être simplifié, en limitant le nombre de prélèvement ou de taxes pour faciliter la compréhension de tous."</i></p>
                <br />
                <p><strong>Segmentation:</strong> <br />
                - "L'impôt doit être simplifié" est un <span style={{color: type_colors["premise"]}}> <strong>Argument</strong> </span> pour le segment suivant. <br />
                - "en limitant le nombre de prélèvement ou de taxes" est la<span style={{color: type_colors["solution"]}}> <strong>Solution</strong> </span>: une action concrête à appliquer. <br />
                - "pour faciliter la compréhension de tous." est aussi un <span style={{color: type_colors["premise"]}}> <strong>Argument</strong> </span> pour appuyer le fait de limiter le nombre de taxes.
                </p> <br />
            </div>
            <div style={{ boxShadow: `0 0 0 2px ${Object.keys(colors)[2]}`, marginTop: "2rem", padding:"10px"}}>
                <h3>Unité argumentative 3</h3> <br />
                <p><i>"Les aides sociales doivent également être plus lisibles : exemple, une aide familiale reprenant toutes celles existantes."</i></p>
                <br />
                <p><strong>Segmentation:</strong> <br />
                Cette unité argumentative est plus difficile: ce que le citoyen considère comme un exemple est en fait la solution.<br /><br />
                - "Les aides sociales doivent également être plus lisibles" est un <span style={{color: type_colors["premise"]}}> <strong>Argument</strong> </span>. Cette phrase appuie la phrase suivante, qui est une solution <br />
                - "une aide familiale reprenant toutes celles existantes." est une <span style={{color: type_colors["solution"]}}> <strong>Solution</strong> </span> proposée pour avoir des aides sociales plus lisibles. notez qu'il n'y a pas besoin d'annoter le "exemple, ". <br />
                </p> <br/>
            </div>
            <div style={{ boxShadow: `0 0 0 2px ${Object.keys(colors)[3]}`, marginTop: "2rem", padding:"10px"}}>
                <h3>Unité argumentative 4</h3> <br />
                <p><i>"Les dépenses doivent également être réalisées avec plus d'équité (ne pas faire profiter qu'un petite partie de la population)."</i></p>
                <br />
                <p><strong>Segmentation:</strong> <br />
                L'unité argumentative entière est une <span style={{color: type_colors["claim"]}}> <strong>Affirmation</strong> </span>. Elle ne propose pas de solution ou d'argument, mais seulement un ressenti du citoyen.
                </p> <br/>
            </div>
        </div>
    )
}

function ExplanationExampleTwo() {
    return (
        <div style={{paddingLeft: "1rem", paddingRight: "1rem"}}>
            Cette exemple est très simple, mais il montre l'importance de regarder le thème du texte. <br />
            Il ne contient qu'une seule unitée argumentative, qui est une affirmation, mais il faut s'assurer que le système d'IA à compris que le citoyen parle d'écologie. Cela doit être clair dans l'argument généré.
            <div style={{ boxShadow: `0 0 0 2px ${Object.keys(colors)[0]}`, marginTop: "2rem", padding:"10px"}}>
            <h3>Unité argumentative 1</h3> <br />
                <p><i>"Il y a urgence ! Nous sommes responsables de ce que nous allons laissé aux générations futures."</i></p>
                <br />
                <p><strong>Segmentation:</strong> <br />
                - "Il y a urgence ! Nous sommes responsables de ce que nous allons laissé aux générations futures." est une <span style={{color: type_colors["claim"]}}> <strong>Affirmation</strong> </span>. 
                Elle ne propose aucune solution ou argument, mais exprime un sentiment fort (pour l'écologie). 
                </p> <br/>
            </div>
        </div>
    )
}


function ExplanationExampleThree() {
    return (
        <div style={{paddingLeft: "1rem", paddingRight: "1rem"}}>
            Cette exemple est typique de ce que l'on trouve dans les participations citoyennes: le citoyen liste des solutions sur des thèmes variés, sans affirmation ou argument.
            chaque thème une une unité argumentative différente. <br />
            Dans ce cas, les unités argumentatives sont claires et bien exprimées, si ce n'est pour les fautes d'orthographes, de syntaxes et de ponctuations. L'argument validé devra alors être les arguments déjà écrits, mais corrigés.
            <div style={{ boxShadow: `0 0 0 2px ${Object.keys(colors)[0]}`, marginTop: "2rem", padding:"10px"}}>
                <h3>Unité argumentative 1</h3> <br />
                <p><i>"Faire baisser le prix des maisons de retraite"</i></p>
                <br />
                <p><strong>Segmentation:</strong> <br />
                - "Faire baisser le prix des maisons de retraite" est un <span style={{color: type_colors["solution"]}}> <strong>Solution</strong> </span>.<br />
                </p> <br/>
            </div>
            <div style={{ boxShadow: `0 0 0 2px ${Object.keys(colors)[1]}`, marginTop: "2rem", padding:"10px"}}>
                <h3>Unité argumentative 2</h3> <br />
                <p><i>"autoriser l'aide à l'euthanasie active pour celui qui le décide pour lui même, dans certains cas"</i></p>
                <br />
                <p><strong>Segmentation:</strong> <br />
                - "autoriser l'aide à l'euthanasie active pour celui qui le décide pour lui même, dans certains cas" est la<span style={{color: type_colors["solution"]}}> <strong>Solution</strong> </span>. <br />
                </p> <br />
            </div>
            <div style={{ boxShadow: `0 0 0 2px ${Object.keys(colors)[2]}`, marginTop: "2rem", padding:"10px"}}>
                <h3>Unité argumentative 3</h3> <br />
                <p><i>"retour de la peine de mort pour les meurtres d'enfants et de mineurs"</i></p>
                <br />
                <p><strong>Segmentation:</strong> <br />
                - "retour de la peine de mort pour les meurtres d'enfants et de mineurs" est une <span style={{color: type_colors["solution"]}}> <strong>Solution</strong> </span>. <br />
                </p> <br/>
            </div>
            <div style={{ boxShadow: `0 0 0 2px ${Object.keys(colors)[3]}`, marginTop: "2rem", padding:"10px"}}>
                <h3>Unité argumentative 4</h3> <br />
                <p><i>"perte de nationalité pour les bi nationaux récidiviste et les condamnés pour terrorisme"</i></p>
                <br />
                <p><strong>Segmentation:</strong> <br />
                - "perte de nationalité pour les bi nationaux récidiviste et les condamnés pour terrorisme" est une <span style={{color: type_colors["solution"]}}> <strong>Solution</strong> </span>. <br />
                </p> <br/>
            </div>
            <div style={{ boxShadow: `0 0 0 2px ${Object.keys(colors)[4]}`, marginTop: "2rem", padding:"10px"}}>
                <h3>Unité argumentative 5</h3> <br />
                <p><i>"non retour en France des combattants de Daech"</i></p>
                <br />
                <p><strong>Segmentation:</strong> <br />
                - "non retour en France des combattants de Daech" est une <span style={{color: type_colors["solution"]}}> <strong>Solution</strong> </span>. <br />
                </p> <br/>
            </div>
        </div>
    )
}


const big_explanations: Record<string, any> = {
  introductionExample1:
    (<div>
        <ExplanationExampleOne />
    </div>),
  introductionExample2:(<div>
        <ExplanationExampleTwo />
    </div>),
    introductionExample3:(<div>
        <ExplanationExampleThree />
    </div>),
};


  const examples = [
    { id: "introductionExample1", label: "Exemple 1", data: example_opinion_1 },
    { id: "introductionExample2", label: "Exemple 2", data: example_opinion_2 },
    { id: "introductionExample3", label: "Exemple 3", data: example_opinion_3 },
  ]
export default function ExamplesPage() {
  const [opinion, setOpinion] = useState<Opinion>(example_opinion_1);

  const {
    isLoading,
    summaries,
  } = useAppContext();

  return (
    <div>
      <div>Voici quelques exemples pour comprendre la tâche :</div>

      {/* Buttons to switch examples */}
      <div style={{ margin: "1rem 0" }}>
        {examples.map((ex) => (
          <button
            key={ex.id}
            onClick={() => setOpinion(ex.data)}
            style={{
              marginRight: "0.5rem",
              padding: "0.4rem 0.8rem",
              borderRadius: "0.5rem",
              border: opinion.opinionId === ex.id ? "2px solid #ccc" : "1px solid #ccc",
              backgroundColor: opinion.opinionId === ex.id ? "green" : "darkgrey",
              fontWeight: opinion.opinionId === ex.id ? "bold" : "normal",
              cursor: "pointer",
            }}
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* Explanation depending on current opinion */}
      <div style={{ marginBottom: "1rem", fontStyle: "italic", color: "grey" }}>
        {small_explanations[opinion.opinionId]}
      </div>

      <div
        style={{
          border: "2px solid grey",
          padding: "0.5rem",
          borderRadius: "1rem",
          marginBottom: "1rem",
        }}
      >
        <OpinionAnnotation opinion={opinion} />
        {isLoading && (
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <h3>Génération des arguments...</h3>
          </div>
        )}
        {summaries.length > 0 && (
          <SummariesAnnotation opinion={opinion} handleNext={() => {}} />
        )}
      </div>
       <div
        style={{
          border: "2px solid grey",
          padding: "1.5rem",
          borderRadius: "1rem",
          marginBottom: "1rem",
        }}
      >
        <h2>Analyse</h2> <br />
        {big_explanations[opinion.opinionId]}

      </div>
    </div>
  );
}
