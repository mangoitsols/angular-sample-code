import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingService } from '../meeting.service';
import * as moment from 'moment-timezone';
import { Moment } from 'moment';

@Component({
  selector: 'app-meeting-edit',
  templateUrl: './meeting-edit.component.html',
  styleUrls: ['./meeting-edit.component.css']
})
export class MeetingEditComponent implements OnInit {
	mettingrForm: FormGroup;
    submitted = false;
	meeting;
	id;
	constructor(private formBuilder: FormBuilder,private _Activatedroute:ActivatedRoute,private meetingService: MeetingService,private router:Router) { }

	ngOnInit(): void {
		this.mettingrForm = this.formBuilder.group({
			id: ['', Validators.required],
			name: ['', Validators.required],
			meetingDate: ['', Validators.required],
			meetingStartTime: ['', Validators.required],
			meetingEndTime: ['', Validators.required],
		});

		if(localStorage.getItem('setTimeZone') === null || localStorage.getItem('setTimeZone') == undefined) {
			var timeZone = 'Asia/Kolkata';
		}else{
			var timeZone = localStorage.getItem('setTimeZone');
		}

		this.id  = this._Activatedroute.snapshot.params['id'];
		let meetings = this.meetingService.getMeetings();
		this.meeting = meetings.find(p => p.id==this.id);
		this.meeting.meetingDate = moment.tz(this.meeting.meetingStart, timeZone).format('YYYY-MM-DD');
		this.meeting.meetingStartTime = moment.tz(this.meeting.meetingStart, timeZone).format('HH:mm');
		this.meeting.meetingEndTime = moment.tz(this.meeting.meetingEnd, timeZone).format('HH:mm');
	}

	get f() { return this.mettingrForm.controls; }

	onSubmit() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.mettingrForm.invalid) {
			return;
		}
		if (this.mettingrForm.value) {
			var sdate    = this.mettingrForm.value.meetingDate.split("-");
			var sTime    = this.mettingrForm.value.meetingStartTime.split(":");
			var eTime    = this.mettingrForm.value.meetingEndTime.split(":");
			const mstart = new Date(sdate[0],sdate[1]-1,sdate[2],sTime[0],sTime[1]);
			const mend   = new Date(sdate[0],sdate[1]-1,sdate[2],eTime[0],eTime[1]);
			let newMeeting = {
				id:this.mettingrForm.value.id,
				name: this.mettingrForm.value.name,
				meetingDate: this.mettingrForm.value.meetingDate,
				meetingStartTime: this.mettingrForm.value.meetingStartTime,
				meetingEndTime: this.mettingrForm.value.meetingEndTime,
				meetingStart: mstart.getTime(),
			 	meetingEnd: mend.getTime(),
			}

			this.meetingService.updateEmployee(this.meeting,newMeeting);
			this.router.navigate(['meeting-list']);
		}				
	}

	onReset() {
		this.submitted = false;
		this.mettingrForm.reset();
	}

}
