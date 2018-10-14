import { Component } from '@angular/core';

class PyFunction {
  constructor(jsonObject?) {
    if (jsonObject != null) {
      this.id = jsonObject.id;
      this.name = jsonObject.name;
    }
  }

  id : number = -1;
  name : string = "Untitled";
}

class PyModule {
  constructor(jsonObject?) {
    if (jsonObject != null) {
      this.id = jsonObject.id;
      this.name = jsonObject.name;
      if (jsonObject.functions != null) {
        for (var func of jsonObject.functions) {
          this.completed_functions.push(new PyFunction(func));
        }
      }

      if (jsonObject.incomplete_functions != null) {
        for (var func of jsonObject.incomplete_functions) {
          this.incomplete_functions.push(new PyFunction(func));
        }
      }
    }
  }

  id : number = -1;
  name : string = "Untitled";
  completed_functions : PyFunction[] = []; 
  incomplete_functions : PyFunction[] = [];
}

interface PyFunction {
  id : number;
  name : string;
}

interface PyModule {
  id : number;
  name : string;
  completed_functions : PyFunction[]; 
  incomplete_functions : PyFunction[];
}

@Component({
  selector: 'proceed-root',
  templateUrl: './proceed.component.html',
  styleUrls: ['./proceed.component.css']
})

// Hint: don't define classes between the @Component and the class
export class ProceedComponent {
  title = 'Proceed';
  description = "Track the progress of the implemented files here.";

  // my_socket: Socket = socket(types.req);

  inputDirEnabled = true;
  inputFileEnabled = true;
  namespacePlaceholderEnabled = true;
  outputDirEnabled = true;

  availableFiles : PyModule[] = []; 

  current = 2;
  max = 3;

  radius: number = 80;
  semicircle: boolean = false;

  run_khallas(): void {
    if (window.fs)
    {
      // reset before refilling
      this.availableFiles = []

      var localhost = "127.0.0.1"
      var port = "3000"

      var khallasExe = "/home/walid/Documents/tagainijisho/khallas_cli/khallas_gui.sh";
      var khallasParams = ["--gui=true"];

      var sock = window.zeromq.socket('req');
      sock.connect('tcp://' + localhost + ':' + port);

      // >:-3
      var self = this;

      sock.on('message', function(msg){
        if (msg.toString() == "rep_no_more_pyfiles") {
          // do we need to close from our side?
          sock.close();
        }
        else {
          console.log('work: %s', msg.toString());

          // WORKAROUND: Change from bad json to quoated json
          // even numbers are now quoted
          // var msg2 = "{"+msg.toString().replace(/(['"])?([><a-z0-9A-Z_\.=+~\-\[\]]+)(['"])?:/g, '"$2": ').replace(/: *(['"])?([><a-z0-9A-Z_\.=+~\-\[\]]+)(['"])? */g, ': "$2"') + "}";
          var msg2 = msg.toString();

          // console.log("new msg: " + msg2);
          var pyfile = new PyModule(JSON.parse(msg2).pyFile);
          // console.log(pyfile);
          self.availableFiles.push(pyfile);
          sock.send("req_pyfile");
        }
      });

      sock.send("init_req_pyfile");
      // TODO only open if not opened and make it a master that closes after some time of inactivity ...
      if (window.fs.existsSync(khallasExe)) {
        window.child_process.execFile(khallasExe,
                                      khallasParams,
                                      {cwd: '/home/walid/Documents/tagainijisho/khallas_cli'},
                                      function(err, data) {
          console.log("Receiving settings and executing.");
          if(err){
            console.error(err);
            return;
          }
          console.log(data.toString());
        });
      }
      else {
        console.error(khallasExe + " couldn't be found.")
      }
    }
    else {
      // demo mode for checking the view with ng serve
      for(var i: number = 0; i < 10; i++) {
        this.availableFiles[i] = new PyModule();
        for (var k: number = 0; k < i+1; k++){
          this.availableFiles[i].completed_functions.push(new PyFunction());
        }
        for (var k: number = 0; k < i+i+3; k++){
          this.availableFiles[i].incomplete_functions.push(new PyFunction());
        }
      }
    }
  }

  allCompletedFunctions() {
    var counter = 0;
    for (var pyfile of this.availableFiles) {
      counter += pyfile.completed_functions.length;
    }

    return counter;
  }

  allFunctions() {
    var counter = 0;
    for (var pyfile of this.availableFiles) {
      counter += pyfile.incomplete_functions.length;
      counter += pyfile.completed_functions.length;
    }

    return counter;
  }

  getOverlayStyle(semicircle, radius) {
    let isSemi = semicircle;
    let transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      'top': isSemi ? 'auto' : '50%',
      'bottom': isSemi ? '5%' : 'auto',
      // 'left': '50%',
      'margin-left': radius + 'px',
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      'font-size':   radius / 3.5 + 'px'
    };
    // return {
    //   'top': isSemi ? 'auto' : '50%',
    //   'bottom': isSemi ? '5%' : 'auto',
    //   'left': '50%',
    //   'transform': transform,
    //   '-moz-transform': transform,
    //   '-webkit-transform': transform,
    //   'font-size': this.radius / 3.5 + 'px'
    // };
  }

  run_langform(): void {
    if (window.fs) {
      window.fs.writeFileSync('sample2.txt', 'my data');
    }

    console.log("Preparing string");
    let settingsArray = this.get_settings_array();

    let settings = this.extract_settings_from_array(settingsArray);

    console.log(settings);

    var localhost = "127.0.0.1"
    var port = "3000"

    // this.my_socket.connect('tcp://' + localhost + ':' + port);
    // console.log('Worker connected to port '+ port);
     
    // this.my_socket.on('message', function(msg){
    //   console.log('work: %s', msg.toString());
    // });

    // setInterval(function(){
    //   console.log('sending work');
    //   // this.my_socket.send(settings);
    // }, 500);


    var executablePath = "/home/walid/Documents/python_shell_simple_com/zmq_client";
    var msg = "{" + settings + "}";
    var parameters = ["--msg="+msg, "--localhost="+localhost, "--port="+port];

    if (window.fs)
    {
      if (window.fs.existsSync(executablePath)) {
        window.child_process.execFile(executablePath, parameters, function(err, data) {
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
    }
    else {
      console.error("window.fs isn't defined, are we serving in localhost?")
    }

  }

  private extract_settings_from_array(settingsArray: string[]): string {

    let settings = "\"settings\": {";
    settings += settingsArray.join(', ')
    settings += "}";

    return settings;
  }

  private get_settings_array(): string[] {
    let valInputDir = (<HTMLInputElement>document.getElementById('input_dir')).value
    // Another implementation is
    // let valInputDir = (document.getElementById('input_dir') as HTMLInputElement).value
    let valNamespacePlaceholder = (<HTMLInputElement>document.getElementById('namespace_placeholder')).value
    let valInputFile = (<HTMLInputElement>document.getElementById('input_file')).value
    let valOutputDir = (<HTMLInputElement>document.getElementById('output_dir')).value

    var settingsArray: string[] = [];

    settingsArray.push(ProceedComponent.jsonify_setting('\"classXMLDir\":',            this.inputDirEnabled, valInputDir));
    settingsArray.push(ProceedComponent.jsonify_setting('\"classXML\":',               this.inputFileEnabled, valInputFile));
    settingsArray.push(ProceedComponent.jsonify_setting('\"NAMESPACE_PLACEHOLDER\":',  this.namespacePlaceholderEnabled, valNamespacePlaceholder));
    settingsArray.push(ProceedComponent.jsonify_setting('\"OUTPUT_DIR\":',             this.outputDirEnabled, valOutputDir));

    return settingsArray;
  }

  private static jsonify_setting(settingKey: string, isUsed: boolean, value: string): string {
    let setting = null;
    let settingValue = ProceedComponent.get_setting(isUsed, value);

    if (settingValue != null) {
      setting  = settingKey + settingValue;
    }
    return setting;
  }

  private static get_setting(isUsed: boolean, value: string): string {
    var settingValue = null;
    if (isUsed == true) {
      if (value == '') {
        settingValue = "null";
      }
      else {
        settingValue = "\""+ value +"\"";
      }
    }
    return settingValue;
  }

  constructor() {
    this.run_khallas();
    // using fs here will result in the whole component not being render-able in the ng-server
    if (window.fs)
    {
      window.fs.writeFileSync('sample1.txt', 'my data');
    }
  }
}
