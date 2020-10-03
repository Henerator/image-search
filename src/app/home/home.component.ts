import { Component, OnDestroy, OnInit } from '@angular/core';
import { Photo } from '@shared/models/photo.model';
import { SubscriptionStorage } from '@shared/models/subscriptions-storage';
import { PhotosDataService } from './services/photos-data.service';
import { PicsumPhotosDataService } from './services/picsum-photos-data.service';
import { UnsplashPhotosDataService } from './services/unsplash-photos-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [{
    provide: PhotosDataService,
    useClass: PicsumPhotosDataService, // unlimited number of requests
    // useClass: UnsplashPhotosDataService,  // 50 requestes per hour
  }]
})
export class HomeComponent implements OnInit, OnDestroy {
  photos: Photo[] = [];
  isLoading = true;

  private subscriptions = new SubscriptionStorage();

  constructor(
    private photosDataService: PhotosDataService<Photo[]>,
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
    this.loadPhotos(value);
  }

  loadPhotos(query?: string): void {
    this.photosDataService.fetch(3, query);
  }
}
