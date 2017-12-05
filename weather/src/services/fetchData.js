import {HEADER_KEY} from "../../src/constants";
import {BASE_SERVICE_URL} from "../../src/constants";
import axios from "axios";

 class FetchData {


    getData(url, query, sucessHandler){

        const requestUrl = `${BASE_SERVICE_URL}/${url}`;

        axios.get(requestUrl, {
            params:{
                "APPID": HEADER_KEY,
                "q": query,
                "units": "metric"
            }
        })
        .then(response => {
            sucessHandler(response)
        })

        
    }
}

export const fetchData = new FetchData(); 