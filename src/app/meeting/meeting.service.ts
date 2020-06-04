import { Injectable } from '@angular/core';
import { Init } from './meeting-init';

@Injectable({
  providedIn: 'root'
})
export class MeetingService extends Init {
	
	constructor() {
		super();
		console.log('Meeting Service start');
		this.load();
	}

	getMeetings() {
		let meetingList = JSON.parse(localStorage.getItem('meeting'));
		return meetingList;
	}

	addMeeting(newMeeting) {
		let meetingAdd = JSON.parse(localStorage.getItem('meeting'));
		meetingAdd.push(newMeeting);
		localStorage.setItem('meeting', JSON.stringify(meetingAdd));
	}

	deleteMeeting(id) {
		let meeting = JSON.parse(localStorage.getItem('meeting'));
		for(let i = 0; i <meeting.length; i++) {
			if(meeting[i].id == id) {
				meeting.splice(i, 1);
			}
		}
		localStorage.setItem('meeting', JSON.stringify(meeting));
	}

	updateEmployee(oldMeeting, newMeeting){  
		let meetings = JSON.parse(localStorage.getItem('meeting'));
		for(let i = 0; i <meetings.length; i++) {
			if(meetings[i].id == oldMeeting.id) {
				meetings[i] = newMeeting;
			}
		}
		localStorage.setItem('meeting', JSON.stringify(meetings));
	}

}
