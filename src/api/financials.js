import Config from 'react-native-config';
import axios from "axios";
import { objToQueryString } from 'helpers/request';

const backendUrl = Config.BACKEND_URL;
const documentWorkerUrl = Config.DOCUMENT_WORKER_URL

export const getFinancialsReportUrl = ( fileType, reportType, params = {}) => {
    const queryString = objToQueryString(params);

    if(fileType === 'pdf') {
        return `${documentWorkerUrl}reports/financials/${reportType}${queryString}`
    }
    return `${backendUrl}financials/export/${reportType}${queryString}filetype=${fileType}`

}

export const generateFinancialsReport = async (reportType, filetype, token, params) => {
    if (!token || !reportType) return null;
    const options  =  {
        responseType: 'arraybuffer', 
        params: {filetype, ...params},
        headers: {
            Authorization: token
        }
    }
    const res = await axios.get(`${backendUrl}financials/export/${reportType}`,options)
    return {data: res.data, mimetype: res.headers["content-type"]}
};
