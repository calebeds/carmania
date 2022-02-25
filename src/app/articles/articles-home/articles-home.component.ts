import { Component, OnInit } from '@angular/core';
import { RequestsService, Articles } from './../../lib/requests.service'
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-articles-home',
  templateUrl: './articles-home.component.html',
  styleUrls: ['./articles-home.component.css']
})
export class ArticlesHomeComponent implements OnInit {
  //Declaring articles
  articles: Articles[] = [];

  start: number = 0; //Property will iterated for the amount of posts

  showSpinner: boolean = false; // Control property for showing the spinner

  articlesEnd: boolean = false;

  constructor(private requestsService: RequestsService) { }

  getArticles() {
    this.showSpinner = true;// Show spinner when fetching the data

    this.requestsService.getArticles({
      _sort: 'id', _order:'desc', _limit:6, _start: this.start
    }).pipe(delay(1000)).subscribe(
      (articles: Articles[]) => {
        this.articles = [
          ...this.articles,
          ...articles
        ];
        this.start += 6;
        this.handleNoMoreArticles(articles);
        this.showSpinner = false;//Stop showing the spinner
      }
    );
  }

  handleNoMoreArticles(data: Articles[]) { //This method  will tell when there are no more articles, so you can show that message of sorry
    if(data.length <= 5) {
      this.articlesEnd = true;
    }
  }

  onScroll() {
    this.getArticles();
  }

  ngOnInit(): void {
    this.getArticles();
  }


  
}
