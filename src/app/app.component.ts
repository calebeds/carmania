import { Component, OnInit } from '@angular/core';
import { NavService } from './lib/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  opened!: boolean;

  constructor(private navService: NavService) {

  }

  updateNav(event: boolean): void {
     this.navService.sidenavStatus.next(event);
  }

  ngOnInit(): void {
    this.navService.sidenavStatus.subscribe(
      data=> {
        this.opened = data;
      }
    );
  }
  
}
