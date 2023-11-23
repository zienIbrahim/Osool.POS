import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit{
  sidebar:boolean = false;
  closeBtn : boolean = false;
  searchBtn :boolean = false;
  navbarOpen = false;
  ngOnInit(): void {
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  

}
