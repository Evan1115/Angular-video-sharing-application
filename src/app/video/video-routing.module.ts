import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    data: {
      authOnly: true //this data only scope to this component route
    }
  },
  {
    path: 'upload',
    component: UploadComponent,
    data: {
      authOnly: true //this data only scope to this component route
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], //since forRoot ald register a router service, so we no longer needed to define again. instead we use forChild
  exports: [RouterModule]
})
export class VideoRoutingModule { }
