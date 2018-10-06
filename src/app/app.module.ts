import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatInputModule, MatCheckboxModule, MatTooltipModule, MatButtonModule} from '@angular/material';
// Support variable binding between typescript and html 
import {FormsModule} from '@angular/forms';


import {RoundProgressModule} from 'angular-svg-round-progressbar'; 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    BrowserAnimationsModule,

    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatButtonModule,

    FormsModule,

    RoundProgressModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
