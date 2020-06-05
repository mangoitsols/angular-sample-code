import { Component, LOCALE_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'angularDemo';
	public selectedLang: string;
	languageList = [
		{ code: 'en', label: 'English' },
		{ code: 'hi', label: 'हिंदी' }
	];

	constructor(private router: Router, @Inject(LOCALE_ID) protected localeId: string) { 
		if(localStorage.getItem('setLanguage') === null || localStorage.getItem('setLanguage') == undefined) {
			this.selectedLang = 'en';
		}else{
			this.selectedLang = localStorage.getItem('setLanguage');	
		}
	}

	/**
	 * @name languageChanged
	 * @desc Set timezone in local storage
	 */
	public languageChanged(language: string): void {
		this.selectedLang = language;
		localStorage.setItem('setLanguage', language);
		window.location.href = '/meetings/'+language;
	}
}
