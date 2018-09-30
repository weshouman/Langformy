import { Component } from '@angular/core';
// import { socket, Socket, types } from 'zmq';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'langformy';

  // my_socket: Socket = socket(types.req);

  inputDirEnabled = true;
  inputFileEnabled = true;
  namespacePlaceholderEnabled = true;
  outputDirEnabled = true;

  run_langform(): void {
    // We shall find a way to safely fail when the app is served: "fs isn't available"!
    window.fs.writeFileSync('sample.txt', 'my data');
    console.log(window.fs.existsSync);

    console.log("Preparing string");
    let settingsArray = this.get_settings_array();

    let settings = this.extract_settings_from_array(settingsArray);

    console.log(settings);

    var localhost = "127.0.0.1"
    var port = "3000"

    // this.my_socket.connect('tcp://' + localhost + ':' + port);
    console.log('Worker connected to port '+ port);
     
    // this.my_socket.on('message', function(msg){
    //   console.log('work: %s', msg.toString());
    // });

    setInterval(function(){
      console.log('sending work');
      // this.my_socket.send(settings);
    }, 500);
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
    // using fs here will result in the whole component not being render-able in the ng-server
    // window.fs.writeFileSync('sample.txt', 'my data');
    // console.log(window.fs.existsSync);
  }
}
