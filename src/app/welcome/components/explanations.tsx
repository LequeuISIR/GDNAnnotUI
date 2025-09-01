import { type_colors } from "../../annotations/opinions/ColorSelector";




export function ExplainTask() {
  return (
    <div style={{marginBottom: "2rem"}}>
           
            <p>Chaque opinion contient une ou plusieurs <strong>unités argumentatives</strong> (chaque idée exprimée correspond à une unité argumentative). Dans chaque unité, vous pouvez trouver trois types de segments:</p>
            <ul>
                <li>🗣️ <span style={{color: type_colors["claim"]}}> <strong>Affirmation(s)</strong> </span> — l’auteur exprime son opinion qui n'est ni un argument ni une solution (“je pense que…”).</li>
                <li>💡 <span style={{color: type_colors["solution"]}}> <strong>Solution(s)</strong> </span> — une proposition concrète pour résoudre un problème.</li>
                <li>📌 <span style={{color: type_colors["premise"]}}> <strong>Argument(s)</strong> </span> — une justification ou un exemple qui soutient une affirmation ou une solution.</li>
            </ul>
            <p>
            Toutes les unités argumentatives comprennent au moins l'un des trois rôles, mais peuvent ne pas contenir les trois. Plusieurs segments d'une même unité argumentative
            peuvent aussi avoir le même rôle (par exemples, plusieurs arguments).
            </p>
            <br />
            <p> Votre tâche consiste à <strong>identifier et annoter toutes les unités argumentatives présentes dans chaque opinions</strong>, et d'<strong>annoter leurs sous-segments de texte selon les trois types</strong> ci-dessus. </p> 
            <p>Ensuite, chaque unité argumentative sera réécrite par un système d'intelligence artificielle générative. <strong>Vous devez vérifier et modifier ces textes générés par le système d'IA</strong> pour qu'ils représentent
            parfaitement l'idée exprimée par le citoyen.</p> 
      </div>
  )
}


export function ExplainCorrection() {
  return (
    <div>
      <p>
      Après avoir segmenté le texte, cliquez sur <strong>"envoyer"</strong>: un système d'IA propose alors un argument clarifié pour chaque unité argumentative.
      Modifiez-les si nécessaire pour qu’ils soient <strong>clairs et auto-suffisants</strong>, 
          <strong> fidèles au texte</strong> (pas d’ajouts inventés) et <strong>Cohérents avec l’opinion complète et le thème du texte</strong>.
      <br />
      Concrètement, vous devez vérifier que l'opinion générée automatiquement représente parfaitement l'unité argumentative correspondante, 
      en particulier <strong>sans ajouter de contenu ou de "justifications"</strong> qui ne sont pas exprimés dans l'opinion initiale. Cet argument généré doit être
      <strong> clair et compréhensible sans connaître l'opinion initiale</strong>. Il doit aussi corriger les fautes d'orthographes, de ponctuations et de syntaxes 
      présentes dans le texte.<br />
      En particulier, si vous considérez que l'unité argumentative initiale est déjà parfaitement exprimée, elle doit être gardée telle qu'elle est.
    </p>
    <br />
    <p> 
      Une fois ces textes validés, cliquez sur <strong>“Accepter les résumés”</strong> pour valider et passer au texte suivant.
    </p>
  </div>
  )
}