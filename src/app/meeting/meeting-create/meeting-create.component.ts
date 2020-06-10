import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeetingService } from '../meeting.service';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-meeting-create',
  templateUrl: './meeting-create.component.html',
  styleUrls: ['./meeting-create.component.css']
})
export class MeetingCreateComponent implements OnInit {

	mettingrForm: FormGroup;
    submitted = false;
    errorMessage = '';
    errorMessage1 = '';
    errorMessage2 = '';
    meeting;
	constructor(private formBuilder: FormBuilder,private meetingService: MeetingService, private router: Router, @Inject(LOCALE_ID) protected localeId: string) { }

	/**
	 * @name ngOnInit
	 * @desc Set form validation 
	 */

	ngOnInit(): void {
		this.mettingrForm = this.formBuilder.group({
			fullName: ['', Validators.required],
			meetingDate: ['', Validators.required],
			meetingStartTime: ['', Validators.required],
			meetingEndTime: ['', Validators.required],
		});
		this.meeting = this.meetingService.getMeetings();
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
		console.log(this.meeting);
		console.log(mstart.getTime()+"===="+mend.getTime());
		this.meeting.forEach(function (value) {
			if ( value.meetingDate == this.mettingrForm.value.meetingDate ){
				var v1 = value.meetingStart;
				var v2 = value.meetingEnd;
				var t1 =  mstart.getTime();
				var t2 =  mend.getTime();
				if( (v1 <= t1 && t1 <= v2 ) || (v1 <= t2 && t2 <= v2 ) || (t1 <= v1 && v1 <= t2) || (t1 <= v2 && v2 <= t2)) {
				    lap = 1;
				}
			}
		}.bind(this));
		if (lap == 1) {
			this.errorMessage = 'This meeting time is overlap with another meeting. Please change the time.';
			return;
		}else{
			console.log('true');
		}

		let newMeeting = {
			id:uuid(),
			name: this.mettingrForm.value.fullName,
			meetingDate: this.mettingrForm.value.meetingDate,
			meetingStartTime: this.mettingrForm.value.meetingStartTime,
			meetingEndTime: this.mettingrForm.value.meetingEndTime,
			meetingStart: mstart.getTime(),
			meetingEnd: mend.getTime(),
		}
		this.meeting.push(newMeeting);
		this.meetingService.addMeeting(newMeeting);
		this.router.navigate(['meeting-list']);
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
