import axios from 'axios';

const client = axios.create({
    baseURL: 'ECCDEV/sap/opu/odata/SAP/ZSD_MAIN_SRV'
});



export { client };
