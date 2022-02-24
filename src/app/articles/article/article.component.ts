import { Component, OnInit } from '@angular/core';
import { RequestsService, Articles } from '../../lib/requests.service';
import { ActivatedRoute, Params} from '@angular/router'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article!: Articles;
  latestArticles!: Articles[];

  //Transforming plain text into html readable for the page
  content!: string | null;

  constructor(private requestsService: RequestsService, private activatedRoute: ActivatedRoute,
      private sanitizer: DomSanitizer) { }

  getArticleData(params: any): void {
    this.requestsService.getArticle(params).subscribe(
      (article: Articles) => {
        this.article = article;
        this.content = this.sanitizer.sanitize(1, article.content);
      }
    );

  
  }

  ngOnInit(): void {
    // Get the post data
    this.getArticleData(this.activatedRoute.snapshot.params);

    // Get latest posts
    this.requestsService.getArticles({
      _sort:'id', _order: 'desc', _limit: 5
    }).subscribe(
      (articles: Articles[]) => {
        this.latestArticles = articles;
      }
    )

    //Doing this because when we click on the card of some article it just doesn't change the page
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getArticleData(params);
    });
  }

}
