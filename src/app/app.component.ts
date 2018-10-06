import { Component } from '@angular/core';
// import { socket, Socket, types } from 'zmq';

class PyModule {
  name : string = "Untitled";
  finished_functions : number = 0; 
  total_functions : number = 0
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// Hint: don't define classes between the @Component and the class
export class AppComponent {
  title = 'khallas';

  // my_socket: Socket = socket(types.req);

  inputDirEnabled = true;
  inputFileEnabled = true;
  namespacePlaceholderEnabled = true;
  outputDirEnabled = true;

  availableFiles = []; 

  current = 2;
  max = 3;

  radius: number = 80;
  semicircle: boolean = false;

  run_khallas(): void {
    if (window.fs)
    {
      var localhost = "127.0.0.1"
      var port = "3000"

      var zmqServerExe = "/home/walid/Documents/python_shell_simple_com/zmq_client";
      var zmqServerParams = ["--localhost="+localhost, "--port="+port];

      var khallasExe = "/home/walid/Documents/tagainijisho/khallas_cli/khallas_gui.sh";
      var khallasParams = ["--gui=true"];

      if (window.fs.existsSync(zmqServerExe)) {
        window.child_process.execFile(zmqServerExe, zmqServerParams, function(err, data) {
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
        this.availableFiles[i].finished_functions = i+1;
        this.availableFiles[i].total_functions = i+i+3;
      }
    }
  }

  getOverlayStyle() {
    let isSemi = this.semicircle;
    let transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      'top': isSemi ? 'auto' : '50%',
      'bottom': isSemi ? '5%' : 'auto',
      // 'left': '50%',
      'margin-left': this.radius + 'px';
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      'font-size': this.radius / 3.5 + 'px'
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

    settingsArray.push(AppComponent.jsonify_setting('\"classXMLDir\":',            this.inputDirEnabled, valInputDir));
    settingsArray.push(AppComponent.jsonify_setting('\"classXML\":',               this.inputFileEnabled, valInputFile));
    settingsArray.push(AppComponent.jsonify_setting('\"NAMESPACE_PLACEHOLDER\":',  this.namespacePlaceholderEnabled, valNamespacePlaceholder));
    settingsArray.push(AppComponent.jsonify_setting('\"OUTPUT_DIR\":',             this.outputDirEnabled, valOutputDir));

    return settingsArray;
  }

  private static jsonify_setting(settingKey: string, isUsed: boolean, value: string): string {
    let setting = null;
    let settingValue = AppComponent.get_setting(isUsed, value);

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
