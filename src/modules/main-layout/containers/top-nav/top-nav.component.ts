import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ColorSchemeService } from 'src/modules/app-common/services/color-scheme.service';
import { AuthService } from 'src/modules/auth/services/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {
  constructor(public colorSchemeService: ColorSchemeService,public authService: AuthService ) {

  }
  isDark:boolean=true;
  isFullscreen:boolean=true;
  navbarOpen = false;
  @ViewChild('fullScreen') divRef:any;
  public themes = [
    {
        name: 'dark',
        icon: 'brightness_3'
    },
    {
        name: 'light',
        icon: 'wb_sunny'
    }
];
toggleNavbar() {
  this.navbarOpen = !this.navbarOpen;
}
  ChangeTheme() {
    this.isDark=!this.isDark;
    this.colorSchemeService.update(this.isDark?'dark':'light');
  }
logout()
{
  this.authService.logout();
}
Fullscreen() {
    const elem = document.documentElement;
    console.log("Fullscreen :",this.isFullscreen)
    if (!this.isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
      this.isFullscreen=true;
    } 
    else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      this.isFullscreen = false;

    }
  }
}
