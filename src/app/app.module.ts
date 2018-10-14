import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {TransformModule} from './transform/transform.module';
import {ProceedModule} from './proceed/proceed.module';

import { ProceedRoutingModule } from './proceed/proceed-routing.module';
import { TransformRoutingModule } from './transform/transform-routing.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatInputModule, MatCheckboxModule, MatTooltipModule, MatButtonModule} from '@angular/material';
// Support variable binding between typescript and html 
import {FormsModule} from '@angular/forms';

import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { NotFoundService } from './services/not-found.service';
import { UiModule } from './ui/ui.module';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotFoundComponent,
    AboutComponent,
    ContactComponent
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

    ProceedModule,
    TransformModule,

    // root routing should always be last
    ProceedRoutingModule,
    TransformRoutingModule,
    AppRoutingModule,
    UiModule
  ],
  providers: [NotFoundService],
  bootstrap: [AppComponent]
})
export class AppModule { }
