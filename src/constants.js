export const restapiURL =
  process.env.REACT_APP_RESTAPI_URL || "http://localhost:8000";
console.log(restapiURL);
export const restapiUserURL = restapiURL + "/users";
export const restapiImageURL = restapiURL + "/images";
