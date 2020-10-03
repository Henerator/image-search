import { Component, OnDestroy, OnInit } from '@angular/core';
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
  imagesUrls = [];
  isLoading = true;

  private subscriptions = new SubscriptionStorage();

  constructor(
    private photosDataService: PhotosDataService,
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.photosDataService.data$
        .pipe(map(data => data.map(item => item.download_url)))
        .subscribe(urls => this.imagesUrls = urls)
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
    this.photosDataService.fetch(9);
  }
}
