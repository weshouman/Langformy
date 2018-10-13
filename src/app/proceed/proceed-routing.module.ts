import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProceedComponent } from './proceed.component';

const routes: Routes = [
  {
    path: 'proceed',
    pathMatch: 'full',
    component: ProceedComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProceedRoutingModule { }