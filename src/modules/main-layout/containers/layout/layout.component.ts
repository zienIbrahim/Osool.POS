import { Component, EventEmitter, Output } from '@angular/core';
import { sideNavItems, sideNavSections } from '../../Data/SideNaveData';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  navbarOpen = false;
  sideNavItems = sideNavItems;
  sideNavSections = sideNavSections;
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
