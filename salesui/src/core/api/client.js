import axios from "axios";

console.log(import.meta.env);

let baseURL = import.meta.env.DEV
  ? "ECCDEV/sap/opu/odata/SAP/ZSD_MAIN_SRV"
  : "/sap/opu/odata/SAP/ZSD_MAIN_SRV";
let shBaseURL = import.meta.env.DEV
  ? "ECCDEV/sap/opu/odata/SAP/ZSD_SH_SRV"
  : "/sap/opu/odata/SAP/ZSD_SH_SRV";

const client = axios.create({
  baseURL,
  headers: {
    "sap-client": import.meta.env.DEV ? 260 : undefined,
  },
});

const shClient = axios.create({
  baseURL: shBaseURL,
  headers: {
    "sap-client": import.meta.env.DEV ? 260 : undefined,
  },
});

let csrfToken = null;

client.interceptors.request.use(
  async (config) => {
    if (config.method !== "get") {
      if (!csrfToken) {
        const { headers } = await client.get("/", {
          headers: {
            "X-Csrf-Token": "Fetch",
          },
        });

        csrfToken = headers["x-csrf-token"];
      }
      config.headers["X-Csrf-Token"] = csrfToken;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export { client, shClient };
