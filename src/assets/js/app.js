'use strict'

console.log("hello there!");
console.log("app.js is disabled for now, enable by uncommenting main()");

function getClassXMLDir(){
  // // Use a real directory
  // var classXMLDirValue = "'/home/walid/shared_on_wifi/xml/'"
  // // Use null to be translated to None by the json parser
  // // Follow https://docs.python.org/2/library/json.html#encoders-and-decoders
  // classXMLDirValue = "null"

  var classXMLDir = "";

  var checkboxValue = document.getElementById('input_dir_check').checked;
  if (checkboxValue == true) {
    var classXMLDirValue;

    var textValue = document.getElementById('input_dir').value;
    if (textValue == '') {
      classXMLDirValue = "null";
    }
    else {
      classXMLDirValue = "\""+ textValue +"\"";
    }

    classXMLDir = '\"classXMLDir\":' + classXMLDirValue;
  }

  return classXMLDir;
}

function getClassXML(){
  var classXML = "";

  var checkboxValue = document.getElementById('input_file_check').checked;
  if (checkboxValue == true) {
    var classXMLValue;

    var textValue = document.getElementById('input_file').value;
    if (textValue == '') {
      classXMLValue = "null";
    }
    else {
      classXMLValue = "\""+ textValue +"\"";
    }

    classXML = '\"classXML\":' + classXMLValue;
  }

  return classXML;
}

function getNamespacePlaceholder(){
  var namespacePlaceholder = "";

  var checkboxValue = document.getElementById('namespace_placeholder_check').checked;
  if (checkboxValue == true) {
    var namespacePlaceholderValue;

    var textValue = document.getElementById('namespace_placeholder').value;
    if (textValue == '') {
      namespacePlaceholderValue = "null";
    }
    else {
      namespacePlaceholderValue = "\""+ textValue +"\"";
    }

    namespacePlaceholder = '\"NAMESPACE_PLACEHOLDER\":' + namespacePlaceholderValue;
  }

  return namespacePlaceholder;
}

function getOutputDir(){
  var outputDir = "";

  var checkboxValue = document.getElementById('output_dir_check').checked;
  if (checkboxValue == true) {
    var outputDirValue;

    var textValue = document.getElementById('output_dir').value;
    if (textValue == '') {
      outputDirValue = "null";
    }
    else {
      outputDirValue = "\""+ textValue +"\"";
    }

    outputDir = '\"OUTPUT_DIR\":' + outputDirValue;
  }

  return outputDir;
}

function attachDOMListeners(){
  document.getElementById('run_langform').addEventListener('click', () => {
    //langform_start

    var child = require('child_process').execFile;

    // TODO: (re)start langform here, or ensure it's running in the background

    var executablePath = "/home/walid/Documents/python_shell_simple_com/zmq_client";

    var classXMLDir = getClassXMLDir();
    var classXML    = getClassXML();
    var namespacePlaceholder = getNamespacePlaceholder();
    var outputDir = getOutputDir();

    var settings =  "\"settings\": {"

    if (classXMLDir != "" && classXML != "")
      settings += classXMLDir + ", ";
    if (classXML != "" && namespacePlaceholder != "")
      settings += classXML + ", ";
    if (namespacePlaceholder != "" && outputDir != "")
      settings += namespacePlaceholder + ", ";
    settings += outputDir;

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

function main() {
  document.addEventListener('DOMContentLoaded', function () {
    // get elements only when the DOM is loaded
    attachDOMListeners();
  });
};

// main();