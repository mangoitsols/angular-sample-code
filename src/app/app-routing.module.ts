import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeetingListComponent } from './meeting/meeting-list/meeting-list.component';
import { MeetingCreateComponent } from './meeting/meeting-create/meeting-create.component';
import { MeetingEditComponent } from './meeting/meeting-edit/meeting-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'meeting-list',
    pathMatch: 'full'
  },
  {
    path: 'meeting-list',
    component: MeetingListComponent,
  },
  {
    path: 'meeting-create',
    component: MeetingCreateComponent,
  },
  {
    path: 'meeting-edit/:id',
    component: MeetingEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
