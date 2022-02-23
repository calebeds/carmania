import { Component, OnInit, Input } from '@angular/core';
import { Articles } from 'src/app/lib/requests.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html'
})
export class CarouselComponent implements OnInit {
  @Input('carouselArticles')
  carouselArticles!: Articles[];

  constructor() { }

  ngOnInit(): void {
  }

}
