function makePromiseCall(methodType, url, callback, async = true, data = null) {
    return new Promise(function(resolve, reject) {
        let Xhr = new XMLHttpRequest();
        Xhr.onload = function() {
            console.log(methodType + "State Changed Called. Ready State: " + Xhr.readyState + " status:" + Xhr.status);     
            if(Xhr.readyState == 4) {
                if(Xhr.status === 200 || Xhr.status === 201) {
                    resolve(Xhr.responseText);
                } else if (Xhr.status >= 400) {
                    reject({
                        status: Xhr.status,
                        statusText: Xhr.statusText  
                    });    
                    console.log("Handle 400 client Error or 500 server Error" + showTime);
                }
            }
        }   
        Xhr.onerror = function() {
            reject({
                status: this.status,
                statusText: xhttp.statusText
            });
        };

        Xhr.open(methodType, url, async);
        if(data) { 
            console.log(JSON.stringify(data));
            Xhr.setRequestHeader("Content-Type", "application/json");
            Xhr.send(JSON.stringify(data));
        } else Xhr.send();
        console.log(methodType + " request sent to the server");
    });
}

