import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { LangformRoutingModule } from './langform-routing.module';
import { LangformComponent } from './langform.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatInputModule, MatCheckboxModule, MatTooltipModule, MatButtonModule} from '@angular/material';
// Support variable binding between typescript and html 
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    LangformComponent
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
    LangformRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [LangformComponent]
})
export class LangformModule { }
