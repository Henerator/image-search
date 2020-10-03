import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  @Input() url: string;
  @Input() author: string;

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCollection(): void {
    console.log('Add to collection: ', this.url);
  }
}
