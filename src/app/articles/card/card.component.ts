import { Component, OnInit, Input } from '@angular/core';
import { Articles } from 'src/app/lib/requests.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input('article')
  article!: Articles;

  @Input('hasImage')
  hasImage!: boolean;

  @Input('truncNumber')
  truncNumber!: number  ;

  constructor() { }

  ngOnInit(): void {
  }

}
