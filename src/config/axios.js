import axios from "axios";

const clienteAxios = axios.create({
    baseURL: 'https://bac-bets-production.up.railway.app/'
})

export default clienteAxios;