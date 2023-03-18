import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], //since forRoot ald register a router service, so we no longer needed to define again. instead we use forChild
  exports: [RouterModule]
})
export class VideoRoutingModule { }
