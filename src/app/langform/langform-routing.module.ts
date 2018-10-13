import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LangformComponent } from './langform.component';

const routes: Routes = [
  {
    path: 'langform',
    pathMatch: 'full',
    component: LangformComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LangformRoutingModule { }