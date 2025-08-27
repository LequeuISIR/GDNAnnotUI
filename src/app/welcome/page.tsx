"use client";

import { Opinion } from '../types';
import { OpinionAnnotation } from '../annotations/opinions/Opinions';
import { SummariesAnnotation } from '../annotations/summaries/Summaries';
import { type_colors, colors } from '../annotations/opinions/ColorSelector';
import { useAppContext } from "../AppContext";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

const example_opinion: Opinion = {
  opinionId: "introductionExample",
  text: "Qu'on arret de faire des pôles d'enseigments loin des eleves qui sont obligés de faires des heures (des km) de trajets "
    + "pour apprendre un metier ou simplement venir en cursus classique, comme c'est le cas pour mon fils. pour cela il faut "
    + "developper les transports publics (train, bus ) "
    + "avec des chemins de traverse plutot que de passer toujours par des capitales departementales ou regionnales. Que ces transports "
    + "soient gratuits pour les mineurs, etudiant, chomeur et handicapé. que l'on recrute du personnel dans les hopitaux car ils sont tout aussi "
    + "epuisé que leur travail soit vraiement reconnu ! et qu'on arrete de faire une operation une rentabilité !",
  authorName: "ORGANISATION_DE_LETAT_ET_DES_SERVICES_PUBLICS",
}

export default function Welcome() {
  const router = useRouter();
  const { hasStarted } = useAppContext();

  useEffect(() => {
    if (hasStarted) {
      router.push("/annotations");
    }
  }, [hasStarted, router]);

  const {
    token, setToken, onStart, tokenError,
    summaries, setSummaries,
    isLoading, setIsLoading,
  } = useAppContext();

//   if (!token) {
//     try {
//       const saved_token = localStorage.getItem("token");
//       if (typeof (saved_token) === "string") {
//         setToken(saved_token);
//       }
//     } catch (err) {
//       console.error("Error:", err);
//     }
//   }

  return (
    <div style={{ margin: "0 auto", padding: "1rem", maxWidth: "80%" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Annotation du Grand Débat National
      </h1>

      <div className="welcome-content" style={{ marginBottom: "2rem", lineHeight: "1.6" }}>
        {/* Section 1 – Intro */}
        <div style={{marginBottom: "2rem"}}>
            <h2>👋 Bienvenue</h2>
            <p>
            Merci de participer à l’annotation des opinions exprimées dans le cadre du <strong>Grand Débat National</strong>.
            Votre rôle est d’aider à rendre ces opinions plus claires et structurées.
            </p>
        </div>

        {/* Section 2 – Tâche */}
        <div style={{marginBottom: "2rem"}}>
            <h2>📝 Votre tâche</h2>
            <p>Chaque opinion contient une ou plusieurs <strong>unités argumentatives</strong> (chaque idée exprimée correspond à une unité argumentative). Dans chaque unité, vous pouvez trouver trois types de segments:</p>
            <ul>
                <li>🗣️ <span style={{color: type_colors["claim"]}}> <strong>Affirmation(s)</strong> </span> — l’auteur exprime son opinion qui n'est ni un argument ni une solution (“je pense que…”).</li>
                <li>💡 <span style={{color: type_colors["solution"]}}> <strong>Solution(s)</strong> </span> — une proposition concrète pour résoudre un problème.</li>
                <li>📌 <span style={{color: type_colors["premise"]}}> <strong>Argument(s)</strong> </span> — une justification ou un exemple qui soutient une affirmation ou une solution.</li>
            </ul>
            <p>
            Toutes les unités argumentatives n’ont pas forcément les trois rôles. Il peut aussi y avoir plusieurs segments d’un même type (souvent plusieurs arguments).
            </p>
            <br />
            <p> Votre tâche est de <strong>trouver les différentes unités argumentatives des opinions</strong>, et d'<strong>annoter leurs sous-segments de texte selon les trois types</strong> ci-dessus. </p> 
            <p>Ensuite, chaque unité argumentative sera réécrite par une intelligence artificielle générative. <strong>Vous devez vérifier et modifier ces textes générés par IA</strong> pour qu'ils représentent
            parfaitement l'idée exprimée par le citoyen.</p> 
        </div>

        {/* Section 3 – Comment annoter */}
        <div style={{marginBottom: "2rem"}}>    
            <h2>🛠️ Comment annoter ?</h2>
            <ol>
            <li>Le texte du citoyen apparaît dans un <strong>cadre bleu</strong> avec son thème général en haut à gauche (ex. <code>ORGANISATION_DE_LETAT_ET_DES_SERVICES_PUBLICS</code>).</li>
            <li>Chaque <strong>Unité argumentative</strong> est représentée par une couleur. Dans l'exemple ci-dessous, le <span style={{ boxShadow: `0 0 0 2px ${Object.keys(colors)[0]}` }}>cadre orange</span>  représente 
            une unité argumentative. en appuyant sur le bouton <strong>+</strong>, vous pouvez ajouter <span style={{ boxShadow: `0 0 0 2px ${Object.keys(colors)[1]}` }}>un nouveau cadre</span>, c'est à dire une nouvelle idée abordée par le citoyen. </li>
            <li>
                Pour annoter, trouvez d'abord les différentes idées abordées dans le texte. Chaque idée correspondra à un cadre de couleur différente. Ensuite, pour chaque idée, trouvez le type des différentes sous-parties de son texte. 
                Pour chaque sous-partie, cliquez sur le type correspondant dans le cadre (<span style={{color: type_colors["claim"]}}><strong>Affirm.</strong> </span> , <span style={{color: type_colors["premise"]}}> <strong>Argum.</strong></span>, <span style={{color: type_colors["solution"]}}> <strong>Solution</strong></span>)
                et surlignez la partie correspondante. </li>
            <br />
            <ul>
                <li>Vous pouvez modifier le type d'un segment ou le supprimer en cliquant dessus.</li>
                <li>Vous pouvez Réinitialiser votre travail avec le bouton "réinitialiser".</li>
                <li>Pas besoin d'annoter tout le texte: ignorez ce qui n'est pas pertinent.</li>
            </ul>
            </ol>
        </div>

        {/* Section 4 – Exemple pratique */}
        <h2>🎯 Exemple pratique</h2>
        <p>Essayez directement ci-dessous 👇</p>
        <br />
        <div style={{ border: "2px solid grey", padding: "0.5rem", borderRadius: "1rem", marginBottom: "1rem" }}>
          <OpinionAnnotation opinion={example_opinion} />
          {isLoading && (
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <h3>Génération des arguments...</h3>
            </div>
          )}
          {summaries.length > 0 && (
            <SummariesAnnotation
              opinion={example_opinion}
              handleNext={() => { }}
            />
          )}
        </div>

        <p>Dans cet exemple, il y a trois idées donc <strong>trois unitées argumentatives</strong> :</p>
        <ul>
          <li>
            Thème <span style={{ boxShadow: `0 0 0 2px ${Object.keys(colors)[0]}` }}>transports publics</span> :
            une <span style={{color: type_colors["claim"]}}> <strong>Affirmation</strong> </span> (<i>il faut arreter l'éducation loins des élèves</i>) 
            + un <span style={{color: type_colors["premise"]}}> <strong>Argument</strong> </span> (<i>ils doivent faire des heures de trajets</i>)  
            + deux <span style={{color: type_colors["solution"]}}> <strong>Solutions</strong> </span> (<i>développer les transports publics de traverse et les rendre gratuits</i>).
          </li>
          <li>
            Thème <span style={{ boxShadow: `0 0 0 2px ${Object.keys(colors)[1]}` }}>hôpitaux</span> :
            une <span style={{color: type_colors["solution"]}}> <strong>Solution</strong> </span> (<i>recruter</i>) 
            + un <span style={{color: type_colors["premise"]}}> <strong>Argument</strong> </span> (<i>ils sont épuisés</i>) 
            + une <span style={{color: type_colors["claim"]}}> <strong>Affirmation</strong> </span> (<i>qu'ils soient reconnus</i>).
          </li>
          <li>
            Thème <span style={{ boxShadow: `0 0 0 2px ${Object.keys(colors)[2]}` }}>rentabilité des services publics</span> :
            une <span style={{color: type_colors["claim"]}}> <strong>Affirmation</strong> </span> (<i>opération de rentabilité</i>).
          </li>
        </ul>
        <br />
        {/* Section 5 – Exemple terminé */}
        <h2>✅ Exemple de segmentation terminée</h2>
        <p>une fois l'annotation faite, vous devriez obtenir une segmentation semblable à celle-ci:</p>
        <br />
        <p style={{ textAlign: "center" }}>
          <img
            src="/finished_example.png"
            alt="Exemple d'annotation terminée"
            style={{ maxWidth: "80%", height: "auto", border: "1px solid #ccc" }}
          />
        </p>
        <br />
        {/* Section 6 – Après annotation */}
        <h2>🚀 Après la segmentation</h2>
            <ol>
            <li>Cliquez sur <strong>“Envoyer”</strong>. Une IA propose alors un argument clarifié pour chaque unité argumentative.</li>
            <li>Modifiez-les si nécessaires pour qu’ils soient <strong>clairs et auto-suffisants</strong>, 
                <strong> fidèles au texte</strong> (pas d’ajouts inventés) et <strong>Cohérents avec l’opinion complète et le thème du texte</strong>.
            </li>
            <li>Une fois ces textes validés, cliquez sur <strong>“Accepter les résumés”</strong> pour valider et passer au texte suivant.</li>
            </ol>
        <br />
        {/* Section 7 – Feuille de route */}
        <h2>🧭 Dernières informations</h2>
        <ul>
          <li>Si le texte est incompréhensible, haineux, ou trop long pour être annoté, utilisez le bouton <strong>“signaler”</strong>.</li>
          <li>Vous trouverez votre nombre d'annotations faîtes dans la partie "Profil" en haut à droite de la page. 
            Vous pouvez aussi recommencer des annotations que vous avez déjà faites.</li>
        </ul>
        <br />
        <p>Entrez ci-dessous votre token d'identification pour commencer l'annotation ! Votre token est unique et personnel.</p>
      </div>

      {/* Section 8 – Token input */}
      <div style={{ textAlign: "center" }}>
        <input
          type="text"
          placeholder="Entrez votre token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "250px",
          }}
        />
        {tokenError && (
          <div style={{ color: "red", marginTop: "0.5rem" }}>
            Token invalide. Veuillez réessayer.
          </div>
        )}
        <br />
        <button
          onClick={() => onStart(token)}
          className="button button-accept"
          style={{ padding: "1rem 2rem", fontSize: "1.2rem" }}
          disabled={!token.trim()}
        >
          J’ai compris
        </button>
      </div>
    </div>
  );
}
