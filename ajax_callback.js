let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" +date.getMinutes() + "Mins:" + date.getSeconds()+ "Secs:";
}

function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let Xhr = new XMLHttpRequest();
    Xhr.onreadystatechange = function() {
    //   console.log("State Changed Called at: " + showTime() + "RS: " + Xhr.readyState + " status:" + Xhr.status);     
        if(Xhr.readyState == 4) {
            if(Xhr.status === 200 || Xhr.status === 201) {
            callback(Xhr.responseText);
        } else if (Xhr.status >= 400) {
            console.log("Handle 400 client Error or 500 server Error");
        }
   }
}
    Xhr.open(methodType, url, async);
    if(data) { 
        Xhr.setRequestHeader("Content-Type", "application/json");
        Xhr.send(JSON.stringify(data));
        } else Xhr.send();
    console.log(methodType + " request sent to the server" + showTime());
}

const getURL = " http://localhost:3000/employees/1";
function getUserDetails(data) {
    console.log("Get user data at : " + showTime() + "data:" + data);
    }

makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("Made get AJAX call to server at" + showTime());

const deleteURL = "http://localhost:3000/employees/4";
function userDeleted(data) {
    console.log("User Deleted at: " + showTime() + "data" + data)
}
makeAJAXCall("DELETE", deleteURL, userDeleted, false);

const postURL = "http://localhost:3000/employees";
const emplData = {"name": "Harry", "salary": "5000" };
function userAdded(data) {
    console.log("User Added at : " + showTime() + "data" + data); 
}
makeAJAXCall("POST", postURL, userAdded, true, emplData);
console.log("made POST AJAX call to server at " + showTime())
