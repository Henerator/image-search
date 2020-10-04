import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectCollectionDialogData } from '@shared/components/select-collection-dialog/select-collection-dialog-data.model';
import { SelectCollectionDialogComponent } from '@shared/components/select-collection-dialog/select-collection-dialog.component';
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
        private madDialog: MatDialog,
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

    onAddToCollection(photo: Photo): void {
        this.madDialog.open(SelectCollectionDialogComponent, {
            width: '600px',
            data: {
                photo,
            } as SelectCollectionDialogData,
        });
    }

    loadPhotos(query?: string): void {
        this.photosDataService.fetch(3, query);
    }
}
