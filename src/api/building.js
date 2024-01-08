import axios from "axios";
import { objToQueryString } from "helpers/request";
import Config from 'react-native-config';
const backendUrl = Config.BACKEND_URL;

export const fetchBuildingData = async (address = {}) => {    
    const queryString = objToQueryString(address);
    const res = await axios.get(`${backendUrl}pm/building_data${queryString}`)
    return res?.data
}