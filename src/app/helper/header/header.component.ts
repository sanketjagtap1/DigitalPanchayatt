import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  currentRoute:any;
  constructor(private location: Location) {
    
  }
  
  
  ngOnInit() {
    this.getCurrentUrl();
  }

  getCurrentUrl() {
    const currentUrl = this.location.path();
    this.currentRoute=currentUrl;
    console.log(currentUrl);
  }
  
}
