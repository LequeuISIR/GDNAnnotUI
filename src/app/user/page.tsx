// "use client"

// import { useState, useEffect } from "react";
// import api from "../api"
// import { UserInformation } from "../types";



// export default function UserPage() {
//     const [userInfo, setUserInfo] = useState<UserInformation | null>(null);
//     const [error, setError] = useState<string | null>(null);


//     useEffect(() => {
//     api
//       .get("/user-info")
//       .then((response) => {
//         const data: UserInformation = response.data;
//         setUserInfo(data);
//       })
//       .catch((err) => {
//         console.error("Error fetching user info:", err);
//         setError("Impossible de charger les informations utilisateur.");
//       });
//     }, []);

//     if (error) {
//         return <div>{error}</div>;
//     }

//         if (userInfo === null) {
//         return (
//         <div>
//             <p>chargement des informations...</p>
//         </div>
//         );
//     }

//     return (
//     <div>
//       <p>Token: {userInfo.token}</p>
//       <p>Annotation en cours: {userInfo.current_annotation}</p>
//       <p>Annotations finies ({Object.keys(userInfo.done_annotations).length} au total):</p>
//       <ul>
//         {Object.entries(userInfo.done_annotations).map(([opinionId, opinionText]) => (
//           <li key={opinionId}>
//             <strong>{opinionId}</strong>: {opinionText}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import api from "../api";
import { UserInformation } from "../types";
import { useAppContext } from "../AppContext";
import { redirect } from "next/navigation";




export default function UserPage() {
  const [userInfo, setUserInfo] = useState<UserInformation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
          opinionFromId
        } = useAppContext();

  useEffect(() => {
    api.get("/user-info")
      .then((response) => {
        const data: UserInformation = response.data;
        setUserInfo(data);
      })
      .catch((err) => {
        console.error("Error fetching user info:", err);
        setError("Impossible de charger les informations utilisateur.");
      });
    }, []);

    


  const handleRedo = async (opinionId: string) => {
    try {
      opinionFromId(opinionId)
      redirect("/annotations")
    }
    catch (err) {
        return <div className="p-4">error getting opinion</div>;
        }
    finally {
        redirect("/annotations")
    }
    }

    if (error) {
        return (
            <div>{error}</div>
        )
    } 


    if (userInfo === null) {
        return (
        <div className="p-4">
            <p>Chargement des informations...</p>
        </div>
        );
    }

  return (
    <div >
      <h2 >Espace utilisateur</h2>

      <div >
        <p><strong>Token:</strong> {userInfo.token}</p>
        <p><strong>Annotation en cours:</strong> {userInfo.current_annotation}</p>
      </div>

      <h3 style={{marginBottom: "1rem"}}>Annotations terminées ({Object.keys(userInfo.done_annotations).length} au total):</h3>
      <ul >
        {Object.entries(userInfo.done_annotations).map(([opinionId, opinionText]) => (
          <div key={opinionId} className="opinion-card" style={{marginBottom: "1rem"}}>
                <div style={{marginBottom: "1rem"}}>
                    <div className="opinion-header">
                        <p className="opinion-author">id: {opinionId}</p>
                    </div>
                    <div >
                        <p
                            className="opinion-text"
                        >
                            {opinionText}
                        </p>
                    </div>
                </div>
            <button
            onClick={() => handleRedo(opinionId)}
            className="button button-reset"
            >
              Refaire
            </button>
            </div>
        ))}
      </ul>
    </div>
  );
}
