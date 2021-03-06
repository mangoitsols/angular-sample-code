import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeetingListComponent } from './meeting/meeting-list/meeting-list.component';
import { MeetingCreateComponent } from './meeting/meeting-create/meeting-create.component';
import { MeetingEditComponent } from './meeting/meeting-edit/meeting-edit.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { DeviceDetectorModule } from 'ngx-device-detector';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    MeetingListComponent,
    MeetingCreateComponent,
    MeetingEditComponent
  ],
  imports: [
    BrowserModule, 
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
