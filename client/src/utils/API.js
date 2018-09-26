import axios from 'axios';

class API {

    static send(method, uri, params){
        const headers = {};
        const token = localStorage.getItem('jwtToken');
        if(token){
            headers['Authorization'] = token;
        }
        console.log("request headers", headers);
        //return axios[method](uri, params, {headers: headers});

        return axios({
                method: method,
                url: uri,
                data: params,
                headers:headers
            });
    }

    static post(uri, params = {}){
        return this.send('post', uri, params);
    }
    static get(uri, params={}){
        return this.send('get',uri, params);
    }
    static delete(uri, params={}){
        return this.send('delete',uri, params);
    }
}

export default API;