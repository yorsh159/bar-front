import axios from "axios";


const dniAxios = axios.create({
    baseURL: 'https://dniruc.apisperu.com/api/v1/dni/',

})

export default dniAxios;

