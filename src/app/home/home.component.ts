import { Component, OnInit } from '@angular/core';
import { RequestsService, Articles } from '../lib/requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // The articles from db.json, but filtered
  carouselArticles!: Articles[];
  homeArticles!: Articles[];

  constructor(private requestsService: RequestsService) { }

  ngOnInit(): void {

    //Get carousel articles
    this.requestsService.getArticles({
      _sort: 'id', _order: 'desc', _start: 0, _end: 5 //the filters that will brushed up at request.service
    })
    .subscribe(
      (data: Articles[]) => {

        //Right here they are populated
        this.carouselArticles = data;

        console.log(this.carouselArticles);
      }
    );

    // Get home articles
    this.requestsService.getArticles({
      _sort: 'id', _order: 'desc', _start: 5, _limit: 6
    })
    .subscribe(
      (data: Articles[]) => {
        this.homeArticles = data;
        console.log(this.homeArticles);
      }
    )

    
  }

}
