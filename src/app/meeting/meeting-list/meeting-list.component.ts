import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { MeetingService } from '../meeting.service';
import * as moment from 'moment-timezone';
import { Moment } from 'moment';
declare var $: any;

@Component({
	selector: 'app-meeting-list',
	templateUrl: './meeting-list.component.html',
	styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit {
	public tzNames: string[];
	public selectedTz: string;
	public displayTz: string;
	meetings;

	constructor(private meetingService: MeetingService, @Inject(LOCALE_ID) protected localeId: string) { 
		this.tzNames = moment.tz.names();
		if(localStorage.getItem('setTimeZone') === null || localStorage.getItem('setTimeZone') == undefined) {
			this.timeZoneChanged('Asia/Kolkata');
		}else{
			this.timeZoneChanged(localStorage.getItem('setTimeZone'));
		}		
	}
	
	/**
	 * @name ngOnInit
	 * @desc Get meeting list 
	 */

	ngOnInit(): void {
		this.meetings = this.meetingService.getMeetings();
		var timeZone = $("#timeZone").val();
		if (timeZone === undefined || timeZone === null) {			
			if(localStorage.getItem('setTimeZone') === null || localStorage.getItem('setTimeZone') == undefined) {
				timeZone = 'Asia/Kolkata';
			}else{
				timeZone = localStorage.getItem('setTimeZone');
			}
		}
		this.meetings.forEach(function (value, index) {
			this.meetings[index].meetingDate = moment.tz(value.meetingStart, timeZone).format('YYYY-MM-DD');
			this.meetings[index].meetingStartTime = moment.tz(value.meetingStart, timeZone).format('LT');
			this.meetings[index].meetingEndTime = moment.tz(value.meetingEnd, timeZone).format('LT');
		}.bind(this));
	}

	/**
	 * @name deleteMeeting
	 * @desc Delete meeting by id
	 */
	deleteMeeting(id) {
		if(confirm("Are you sure to delete this")) {
			for(let i = 0; i < this.meetings.length; i++) {
				if(this.meetings[i].id == id) {
					this.meetings.splice(i, 1);
				}
			}
			this.meetingService.deleteMeeting(id);
		}
	}

	/**
	 * @name timeZoneChanged
	 * @desc Set timezone in local storage
	 */
	public timeZoneChanged(timeZone: string): void {
		this.selectedTz = timeZone;
		localStorage.setItem('setTimeZone', timeZone);
		this.ngOnInit();
	}
	
}
