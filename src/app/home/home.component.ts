import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCollectionDialogComponent } from '@shared/components/add-collection-dialog/add-collection-dialog.component';
import { SelectCollectionDialogData } from '@shared/components/select-collection-dialog/select-collection-dialog-data.model';
import { SelectCollectionDialogResult } from '@shared/components/select-collection-dialog/select-collection-dialog-result.model';
import { SelectCollectionDialogComponent } from '@shared/components/select-collection-dialog/select-collection-dialog.component';
import { DEFAULT_DIALOG_CONFIG } from '@shared/constants/dialog-config.const';
import { AddCollectionFormData } from '@shared/models/add-collection-form-data.model';
import { Photo } from '@shared/models/photo.model';
import { SubscriptionStorage } from '@shared/models/subscriptions-storage';
import { CollectionsDataService } from '@shared/services/collections-data.service';
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

    private photoToCollection: Photo;
    private subscriptions = new SubscriptionStorage();

    constructor(
        private photosDataService: PhotosDataService<Photo[]>,
        private collectionsDataService: CollectionsDataService,
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
        this.photoToCollection = photo;
        this.openAddToCollectionDialog();
    }

    loadPhotos(query?: string): void {
        this.photosDataService.fetch(6, query);
    }

    openAddToCollectionDialog(): void {
        this.madDialog
            .open(SelectCollectionDialogComponent, {
                ...DEFAULT_DIALOG_CONFIG,
                data: {
                    photo: this.photoToCollection,
                } as SelectCollectionDialogData,
            })
            .afterClosed().subscribe((result: SelectCollectionDialogResult) => {
                if (result === SelectCollectionDialogResult.AddCollection) {
                    this.openCreateCollectionDialog();
                }
            });
    }

    openCreateCollectionDialog(): void {
        this.madDialog
            .open(AddCollectionDialogComponent, DEFAULT_DIALOG_CONFIG)
            .afterClosed().subscribe(({ name, description }: AddCollectionFormData) => {
                this.collectionsDataService.addCollection(name, description);
                this.openAddToCollectionDialog();
            });
    }
}
