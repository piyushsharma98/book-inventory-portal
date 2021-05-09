import config from "../../config";
import endpointPath from "./endpointPath";

const getServiceUrl = (key) => {
  console.log("config..", config);
  return `${config.domain}${endpointPath[key]}`;
};

export default getServiceUrl;
// console.log(config);

// const serverDomain =
