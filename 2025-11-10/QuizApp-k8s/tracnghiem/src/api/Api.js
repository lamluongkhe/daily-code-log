import axios from "axios";
export const ENDPOINTS = {
    participant: 'Participants',
    question: 'Questions',
    getanswer: 'Questions/GetAnswers',
    getAllQuestions: 'Questions/GetAll',
    postquestion: 'Questions/PostQuestions'
}



export const BASE_URL = 'http://localhost:5000/';



export const createAPIEndpoint = endpoint => {

    let url = BASE_URL + 'api/' + endpoint + '/';

    return {
        fetch: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        post: newRecord => axios.post(url, newRecord),
        put: (id, updateRecord) => axios.put(url + id, updateRecord),
        delete: id => axios.delete(url + id),
    }

}
