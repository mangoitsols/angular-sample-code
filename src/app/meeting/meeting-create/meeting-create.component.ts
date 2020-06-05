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
		// stop here if form is invalid
		if (this.mettingrForm.invalid) {
			return;
		}
		var sdate    = this.mettingrForm.value.meetingDate.split("-");
		var sTime    = this.mettingrForm.value.meetingStartTime.split(":");
		var eTime    = this.mettingrForm.value.meetingEndTime.split(":");
		const mstart = new Date(sdate[0],sdate[1]-1,sdate[2],sTime[0],sTime[1]);
		const mend   = new Date(sdate[0],sdate[1]-1,sdate[2],eTime[0],eTime[1]);
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
