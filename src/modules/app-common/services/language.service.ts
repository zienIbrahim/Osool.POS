import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    appLanguage: BehaviorSubject<string> = new BehaviorSubject<string>('ar');
    
    constructor(public translate: TranslateService, private http: HttpClient) {
        // Setup app languages
        translate.addLangs(['en', 'ar']);
        translate.setDefaultLang('ar');
        // Retreive current language from local storage
        const appLang = localStorage.getItem('language');

        if (appLang) {
            this.setLanguage(appLang);
        } else {
            this.translate.use('ar');
            document.title = 'الرواد المحاسبية - برنامج أصول';
            this.setAppLang('ar');
        }
    }
    setLanguage(language: string) {
        if (language === 'ar') {
        document.body.setAttribute('dir', 'rtl');
           document.getElementsByTagName('html').item(0)?.setAttribute('dir', 'rtl');
           this.translate.use('ar');
            this.setAppLang('ar');
        } else {
     document.body.setAttribute('dir', 'ltr');
        document.getElementsByTagName('html').item(0)?. setAttribute('dir', 'ltr');
            document.title = 'Osool Inventory & Accountant';
            this.translate.use('en');
            this.setAppLang('en');
        }
    }
    setAppLang(language: string) {
        this.appLanguage.next(language);
        localStorage.setItem('language', language);
    }
    getAppLang(): BehaviorSubject<string> {
        return this.appLanguage;
    }
}
