import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Collection } from '@shared/models/collection.model';
import { SubscriptionStorage } from '@shared/models/subscriptions-storage';
import { CollectionsDataService } from '@shared/services/collections-data.service';
import { SelectCollectionDialogData } from './select-collection-dialog-data.model';
import { SelectCollection } from './select-collection.model';

@Component({
    selector: 'app-select-collection-dialog',
    templateUrl: './select-collection-dialog.component.html',
    styleUrls: ['./select-collection-dialog.component.scss']
})
export class SelectCollectionDialogComponent implements OnInit, OnDestroy {
    collections: SelectCollection[] = [];

    private subscriptions = new SubscriptionStorage();

    constructor(
        private collectionsDataService: CollectionsDataService,
        @Inject(MAT_DIALOG_DATA) public data: SelectCollectionDialogData,
    ) {
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.collectionsDataService.data$.subscribe(data => {
                this.collections = data.map<SelectCollection>(collection => ({
                    collection,
                    hasPhoto: collection.photos.some(item => item.id === this.data.photo.id),
                }));
            })
        );

        this.collectionsDataService.fetch();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    onCollectionSelect(collection: Collection): void {
        this.collectionsDataService.addPhotoToCollection(collection.id, this.data.photo);
    }
}
