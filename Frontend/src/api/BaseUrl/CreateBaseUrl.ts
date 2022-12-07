export const baseUrl = window.location.origin + "/api/v1/";
const port = window.location.port;

const backendPort = "44892";
let changePortUrl = baseUrl.replace(port, backendPort);

export default changePortUrl;
