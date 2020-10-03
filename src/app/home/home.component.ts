import { Component, OnDestroy, OnInit } from '@angular/core';
import { Photo } from '@shared/models/photo.model';
import { SubscriptionStorage } from '@shared/models/subscriptions-storage';
import { map } from 'rxjs/operators';
import { PhotosDataService } from './services/photos-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    PhotosDataService,
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  photos: Photo[] = [];
  isLoading = true;

  private subscriptions = new SubscriptionStorage();

  constructor(
    private photosDataService: PhotosDataService,
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.photosDataService.data$
        .subscribe(photos => this.photos = photos)
    );
    this.subscriptions.add(
      this.photosDataService.isLoading$
        .subscribe(isLoading => this.isLoading = isLoading)
    );
    this.loadPhotos();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSearchValueChange(value: string): void {
    console.log(value);
    this.loadPhotos();
  }

  loadPhotos(): void {
    this.photosDataService.fetch(3);
  }
}
