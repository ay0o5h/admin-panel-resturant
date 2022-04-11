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
  const token = await Cookies.get("Admintoken");

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
  const token = await Cookies.get("Admintoken");

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
  
  const token = await Cookies.get("Admintoken");

  var myHeaders = new Headers();
  myHeaders.append("token", token);
  myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${URL}/resturant/${parseInt(info)}`, requestOptions)
  .then(response => response.json())
   .then((result) => {
      if (result.status) return callback(result, null);
      callback(null, result.errMsg);
    })
  .catch(error => console.log('error', error));
  
}

export const ApiResturants = async (callback) => {
 const token = await Cookies.get("Admintoken");

  var myHeaders = new Headers();
  myHeaders.append("token", token);
  myHeaders.append("Content-Type", "application/json");
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${URL}/resturant`, requestOptions)
  .then(response => response.json())
  .then((result) => {
      if (result.status) return callback(result.rest, null);
      callback(null, result.errMsg);
    })
  .catch(error => console.log('error', error));
}
export const ApiResturantsEdit = async (id,info, callback)=>{
   const token = await Cookies.get("Admintoken");
  var myHeaders = new Headers();
  myHeaders.append("token", token);
  myHeaders.append("Content-Type", "application/json");


var raw = JSON.stringify(info);

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${URL}/resturant-edit/${parseInt(id)}`, requestOptions)
  .then(response => response.json())
  .then((result) => {
      if (result.status) return callback(result, null);
      callback(null, result.errMsg);
    })
  .catch(error => console.log('error', error));

}
export const ApiResturantsDelete = async (info, callback) => {
   const token = await Cookies.get("Admintoken");
  var myHeaders = new Headers();
  myHeaders.append("token", token);
  myHeaders.append("Content-Type", "application/json");
 

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${URL}/resturant-delete/${parseInt(info)}`, requestOptions)
  .then(response => response.json())
  .then((result) => {
      if (result.status) return callback(result, null);
      callback(null, result.errMsg);
    })
  .catch(error => console.log('error', error));
  
}
export const ApiTableDelete = async (info, callback) => {
   const token = await Cookies.get("Admintoken");
  var myHeaders = new Headers();
  myHeaders.append("token", token);
  myHeaders.append("Content-Type", "application/json");
 

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${URL}/table-delete/${parseInt(info)}`, requestOptions)
  .then(response => response.json())
  .then((result) => {
      if (result.status) return callback(result, null);
      callback(null, result.errMsg);
    })
  .catch(error => console.log('error', error));
  
}
export const updateResturantState = async (info, callback) => {
  var myHeaders = new Headers();

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${URL}/resturant/${parseInt(info)}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    if (result.status) return callback(result, null);
      console.log(result.data);
      callback(null, result.errMsg);
      console.log(result)
  })
  .catch(error => console.log('error', error));
}
export const changeState = async (info, callback) => {
   const token = await Cookies.get("Admintoken");
   var myHeaders = new Headers();
   myHeaders.append("token", token);
   myHeaders.append("Content-Type", "application/json");

   var raw = JSON.stringify({
     "status": info.status
   });

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${URL}/table/booking/${parseInt(info.id)}`, requestOptions)
  .then(response => response.json())
   .then(result => {
    if (result.status) return callback(result, null);
      console.log(result.data);
      callback(null, result.errMsg);
      console.log(result)
  })
  .catch(error => console.log('error', error));
}
export const ApiBookingList = async (callback) => {
   const token = await Cookies.get("Admintoken");
   var myHeaders = new Headers();
   myHeaders.append("token", token);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${URL}/booking`, requestOptions)
  .then(response => response.json())
  .then((result) => {
      if (result.status) return callback(result.rest, null);
      callback(null, result.errMsg);
    })
  .catch(error => console.log('error', error));
  
}
export const makeItDone = async(info, callback) => {
    const token = await Cookies.get("Admintoken");
   var myHeaders = new Headers();
   myHeaders.append("token", token);
  myHeaders.append("Content-Type", "application/json");

   var raw = JSON.stringify({
     "isEnd": true,
     "isBooked":false
   });


  var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
  };
  
  fetch(`${URL}/table/${parseInt(info.tableId)}/booking/${parseInt(info.bookId)}`, requestOptions)
  .then(response => response.json())
  .then((result) => {
      if (result.status) return callback(result.rest, null);
      callback(null, result.errMsg);
    })
  .catch(error => console.log('error', error));
}