import { Opinion} from "./types";
import api from "./api"

// export async function getOpinions(id: string) {
//     try {
//         const filePath = path.join(process.cwd(), 'data', 'opinions.jsonl');
//         const fileContent = await fs.promises.readFile(filePath, 'utf-8');
//         const debates = fileContent
//             .split('\n')
//             .filter(line => line.trim())
//             .map(line => JSON.parse(line));
        
//         const debate = debates.find(d => d.id === id) as Debate;
//         if (!debate) {
//             notFound();
//         }
//         return debate;
//     } catch (error) {
//         console.error('Error reading opinions:', error);
//         notFound();
//     }GET http://localhost:3002/next-data net::ERR_CONNECTION_REFUSED
// }


export async function getNextOpinion(setOpinion: (opinion: Opinion) => void) {
        // setIsLoading(true);
        try {
            api.get("/next-data")
            .then((response) => {
                const data: Opinion = response.data;
                setOpinion(data);
            })
            .catch((error) => {
                throw new Error('Failed to receive next opinion');
            })
        


            
            // setSummaries(data["results"]);
        } catch (error) {
            console.error('Error sending response:', error);
        } finally {
        }
    };


export async function getOpinionFromId(setOpinion: (opinion: Opinion) => void, opinionId: string) {
        // setIsLoading(true);
        try {
            api.post("/data-from-id",  JSON.stringify({"opinionId": opinionId}))
            .then((response) => {
                const data: Opinion = response.data;
                setOpinion(data);
            })
            .catch((error) => {
                throw new Error('Failed to receive next opinion');
            })
        


            
            // setSummaries(data["results"]);
        } catch (error) {
            console.error('Error sending response:', error);
        } finally {
        }
    };

    

