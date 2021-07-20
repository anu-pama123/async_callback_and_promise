let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" +date.getMinutes() + "Mins:" + date.getSeconds()+ "Secs:";
}

function makePromiseCall(methodType, url, callback, async = true, data = null) {
    return new Promise(function(resolve, reject) {
        let Xhr = new XMLHttpRequest();
        Xhr.onreadystatechange = function() {
        //   console.log("State Changed Called at: " + showTime() + "RS: " + Xhr.readyState + " status:" + Xhr.status);     
            if(Xhr.readyState == 4) {
                if(Xhr.status === 200 || Xhr.status === 201) {
                    resolve(Xhr.responseText);
                } else if (Xhr.status >= 400) {
                    reject({
                        status: Xhr.status,
                        statusText: Xhr.statusText  
                    });    
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
    });
}

const getURL = " http://localhost:3000/employees/1";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get user data at: " + showTime() + "data" + responseText)
    })
        .catch(error => console.log("Get error status: " + JSON.stringify(error)));
console.log("Made GET AJEX call to server at" + showTime());

const deleteURL = "http://localhost:3000/employees/4";
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
        console.log("User Deleted: " + responseText)
    })
    .catch(error => console.log("DELETE Error Status: " + JSON.stringify(error)));

const postURL = "http://localhost:3000/employees";
const emplData = {"name": "Harry", "salary": "5000" };
makePromiseCall("POST", postURL, true, emplData)
    .then(responseText => {
        console.log("User Added: " + responseText)
    })
    .catch(error => console.log("POST Error Status: " + JSON.stringify(error)));    
