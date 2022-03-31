import Cookies from "js-cookie";
export const URL = "https://resturant-booking.herokuapp.com/dash/v1";

export const ApiLogin = (info, callback) => {
  console.log(info);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(info);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  fetch(`${URL}/login`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status) return callback(result, null);
      console.log(result.data);
      callback(null, result.errMsg);
    })
    .catch((error) => console.log("error", error));
};
export const ApiRegister = (info, callback) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(info);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${URL}/register`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status) return callback(result, null);
      callback(null, result.errMsg);
    })
    .catch((error) => console.log("error", error));
};
export const ApiOtp = async (info, callback) => {
  const token = await Cookies.get("registerToken");

  var myHeaders = new Headers();
  myHeaders.append("token", token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(info);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${URL}/otp`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status) return callback(result, null);
      callback(null, result.errMsg);
    })
    .catch((error) => console.log("error", error));
};
export const ApiAddResturant = async (info, callback) => {
  const token = await Cookies.get("token");

  var myHeaders = new Headers();
  myHeaders.append("token", token);
  myHeaders.append("Content-Type", "application/json");
var raw = JSON.stringify(info);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${URL}/resturant-add`, requestOptions)
  .then(response => response.json())
   .then((result) => {
      if (result.status) return callback(result, null);
      callback(null, result.errMsg);
    })
  .catch(error => console.log('error', error));
  
}
export const ApiAddTable = async (info, callback) => {
  const token = await Cookies.get("token");

  var myHeaders = new Headers();
  myHeaders.append("token", token);
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify(info);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${URL}/table-add`, requestOptions)
  .then(response => response.json())
  .then((result) => {
      if (result.status) return callback(result, null);
      callback(null, result.errMsg);
    })
  .catch(error => console.log('error', error));
}
export const ApiFloormap = async (info, callback) => {
  
  const token = await Cookies.get("token");

  var myHeaders = new Headers();
  myHeaders.append("token", token);
  myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${URL}/resturant/${info}`, requestOptions)
  .then(response => response.json())
   .then((result) => {
      if (result.status) return callback(result, null);
      callback(null, result.errMsg);
    })
  .catch(error => console.log('error', error));
  
}