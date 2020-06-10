import { Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
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
    errorMessage = '';
    errorMessage1 = '';
    errorMessage2 = '';
	meeting;
	meetings;
	id;
	constructor(private formBuilder: FormBuilder,private _Activatedroute:ActivatedRoute,private meetingService: MeetingService,private router:Router, @Inject(LOCALE_ID) protected localeId: string) { }

	/**
	 * @name ngOnInit
	 * @desc Set form validation 
	 */

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

	/**
	 * @name onSubmit
	 * @desc Check validation and inter meeting in local storage
	 */

	onSubmit() {
		this.submitted = true;
		this.errorMessage = '';
		this.errorMessage1 = '';
		this.errorMessage2 = '';
		// stop here if form is invalid
		if (this.mettingrForm.invalid) {
			return;
		}
		var sdate    = this.mettingrForm.value.meetingDate.split("-");
		var sTime    = this.mettingrForm.value.meetingStartTime.split(":");
		var eTime    = this.mettingrForm.value.meetingEndTime.split(":");
		const mstart = new Date(sdate[0],sdate[1]-1,sdate[2],sTime[0],sTime[1]);
		const mend   = new Date(sdate[0],sdate[1]-1,sdate[2],eTime[0],eTime[1]);

		if (mstart.getTime() ==  mend.getTime()) {
			this.errorMessage1 = 'Start time and end time can not be the same.';
			return;
		}else if ( mend.getTime() < mstart.getTime()) {
			this.errorMessage2 = 'End time can not be less than to the start time.';
			return;
		}

		var lap = 0;
		this.meetings = this.meetingService.getMeetings();
		//console.log(this.mettingrForm.value.meetingStartTime+"===="+this.mettingrForm.value.meetingEndTime);
		this.meetings.forEach(function (value) {
			if ( value.meetingDate == this.mettingrForm.value.meetingDate ){
				var v1 = value.meetingStart;
				var v2 = value.meetingEnd;
				var t1 =  mstart.getTime();
				var t2 =  mend.getTime();
				if( (v1 <= t1 && t1 <= v2 ) || (v1 <= t2 && t2 <= v2 ) || (t1 <= v1 && v1 <= t2) || (t1 <= v2 && v2 <= t2)) {
					if (this.mettingrForm.value.id != value.id){
						lap = 1;
					}					
				}
			}
		}.bind(this));

		if (lap == 1) {
			this.errorMessage = 'This meeting time is overlap with another meeting. Please change the time';
			return;
		}

		if (this.mettingrForm.value) {			
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

	/**
	 * @name onReset
	 * @desc Reset form value
	 */
	 
	onReset() {
		this.submitted = false;
		this.mettingrForm.reset();
	}

}
