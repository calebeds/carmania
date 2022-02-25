import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FavsService } from 'src/app/lib/favs.service';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.css']
})
export class FavsComponent implements OnInit, OnChanges {

  active: boolean = true; // True means you can add to favs | False means it is already in favs

  @Input('postId')// From article component
  postId!: number;

  constructor(private favsService: FavsService) { }

  toggleFav(): void {
    this.active = this.favsService.onToggleFav(this.postId);
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.active = this.favsService.checkFavState(this.postId);
  }

}
