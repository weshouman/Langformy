'use strict'

function attachDOMListeners(){
  document.getElementById('run_langform').addEventListener('click', () => {
    //langform_start

    var child = require('child_process').execFile;

    // TODO: (re)start langform here, or ensure it's running in the background

    var executablePath = "/home/walid/Documents/python_shell_simple_com/zmq_client";

    // Use a real directory
    var classXMLDirValue = "'/home/walid/shared_on_wifi/xml/'"
    // Use null to be translated to None by the json parser
    // Follow https://docs.python.org/2/library/json.html#encoders-and-decoders
    classXMLDirValue = "null"

    var classXMLDir = '\"classXMLDir\":' + classXMLDirValue +''

    var settings =  "\"settings\": {"
    settings += classXMLDir
    settings += "}"

    var msg = "{" + settings + "}"

    var localhost = "127.0.0.1"
    var port = "3000"

    var parameters = ["--msg="+msg, "--localhost="+localhost, "--port="+port];


    console.log("Set to send: "+ msg +" over "+ localhost +":"+ port +".");

    var fs = require('fs');
    if (fs.existsSync(executablePath)) {
      child(executablePath, parameters, function(err, data) {
        console.log("Sending settings and executing.");
        if(err){
          console.error(err);
          return;
        }
        console.log(data.toString());
      });
    }
    else {
      console.error(executablePath + " couldn't be found.")
    }
  });
};

document.addEventListener('DOMContentLoaded', function () {
  // get elements only when the DOM is loaded
  attachDOMListeners();
});
