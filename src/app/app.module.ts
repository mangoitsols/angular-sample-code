import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeetingListComponent } from './meeting/meeting-list/meeting-list.component';
import { MeetingCreateComponent } from './meeting/meeting-create/meeting-create.component';
import { MeetingEditComponent } from './meeting/meeting-edit/meeting-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MeetingListComponent,
    MeetingCreateComponent,
    MeetingEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
