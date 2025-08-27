import api from "../../api";
import { Summary, Opinion, OpinionResults } from "../../types";
import { useAppContext } from "../../AppContext";


export function Summaries({}: 
    {}): React.ReactElement {
    
    const { 
        opinion, 
        summaries, 
        handleNext
        } = useAppContext();

        
    return (
        <div className="part-container">
        <h1>
            Arguments
        </h1>
            {summaries.length === 0 && (
                <div>
                    <h2 className="explanation-text" style={{textAlign: "center"}}>
                        Les arguments générés vont apparaître ici. <br />
                    </h2>
                </div>
            )}
            {summaries.length > 0 && (
                <div>
                    <h2 className="explanation-text" style={{textAlign: "center"}}>
                        Si nécessaire, modifiez les pour les améliorer. <br />
                        Les arguments doivent être courts, concis et comprehensible sans le contexte du texte initial. <br /> 
                        Enlevez les segments d'introduction ou de conclusionm tel que "l'argument est que...", "l'utilisateur dit que...", ainsi que le formattage comme le **gras** et *l'italique*. <br />
                    </h2>
                </div>
            )}
        <SummariesAnnotation
            opinion={opinion}
            handleNext={handleNext}
        />
    </div>
    );
}

export function SummariesAnnotation({
    opinion,
    handleNext,
}: {
    opinion: Opinion|null,
    handleNext: () => void

}) {

    const { 
        summaries, setSummaries,
        isLoading, 
    } = useAppContext();

    const handleAccept = async (setSummaries: (summaries: Summary[]) => void) => {
        try {
            
            api.post("/summaries",JSON.stringify({
                    opinion: opinion,
                    results: summaries
                }))
                .then((response) => {
                    setSummaries([])
                    handleNext()
                })
                .catch((error) => {
                    throw new Error('Failed to send summaries');
                })
                
        } catch (error) {
            console.error('Error sending summaries:', error);
        }
    };

    if (isLoading) {
        return <div style={{justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column"}}>
            <h2 className="explanation-text">
                génération des arguments...</h2>
        </div>;
    }

    return <div className="opinion-half">
                <div className="summaries-container">
                    {summaries.map((summary, index) => (
                        <div key={summary.color} className="summary-item">
                            <div 
                                className="color-square"
                                style={{
                                    backgroundColor: summary.color,
                                    width: '40px',
                                    height: '40px',
                                    marginRight: '2px',
                                    flexShrink: 1,
                                    borderRadius: '4px',
                                }}
                            />
                            <div
                                contentEditable
                                suppressContentEditableWarning
                                className="summary-text"
                                style={{
                                    padding: '8px',
                                    minHeight: '24px',
                                    flexShrink: 1,
                                    // width: "maxWidth",
                                    flex: 1,
                                    border: '1px solid #eee',
                                    borderRadius: '4px'
                                }}
                                onBlur={(e) => {
                                    const newSummaries = [...summaries];
                                    newSummaries[index] = {
                                        ...newSummaries[index],
                                        text: e.currentTarget.textContent || ''
                                    };
                                    setSummaries(newSummaries);
                                }}
                            >
                                {summary.text}
                            </div>
                        </div>
                    ))}
                    
                </div>
            {summaries.length > 0 && <button
                    onClick={() => handleAccept(setSummaries)}
                    className="button button-accept"
                    style={{
                        marginTop: '1rem',
                        alignSelf: 'center'
                    }}
                >
                    Accepter les résumés
                </button>}
        </div>
}