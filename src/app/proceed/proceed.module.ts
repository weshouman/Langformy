import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ProceedComponent } from './proceed.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatInputModule, MatCheckboxModule, MatTooltipModule, MatButtonModule} from '@angular/material';
// Support variable binding between typescript and html 
import {FormsModule} from '@angular/forms';

import {RoundProgressModule} from 'angular-svg-round-progressbar';

@NgModule({
  declarations: [
    ProceedComponent
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

    RoundProgressModule,

    RouterModule
  ],
  providers: [],
  bootstrap: [ProceedComponent]
})
export class ProceedModule { }
