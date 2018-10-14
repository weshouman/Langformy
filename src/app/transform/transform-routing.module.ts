import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransformComponent } from './transform.component';

const routes: Routes = [
  {
    path: 'transform',
    pathMatch: 'full',
    component: TransformComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TransformRoutingModule { }