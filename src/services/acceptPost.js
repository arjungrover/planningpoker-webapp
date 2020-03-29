import { ACCEPT_REQUEST_URL } from '../constants'
import axios from 'axios';


var url = ACCEPT_REQUEST_URL
export  const acceptPost = (accept) => {
    return axios.post(
        url,
        accept,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}
