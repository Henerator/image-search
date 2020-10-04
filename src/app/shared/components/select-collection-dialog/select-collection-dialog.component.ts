import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Collection } from '@shared/models/collection.model';
import { SubscriptionStorage } from '@shared/models/subscriptions-storage';
import { addPhotoToCollection } from 'src/app/store/actions/collections.actions';
import { SelectCollectionDialogData } from './select-collection-dialog-data.model';
import { SelectCollectionDialogResult } from './select-collection-dialog-result.model';
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
        private store: Store<{ collections: Collection[] }>,
        private dialogRef: MatDialogRef<SelectCollectionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: SelectCollectionDialogData,
    ) {
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.store.select('collections')
                .subscribe(data => {
                    this.collections = data.map<SelectCollection>(collection => ({
                        collection,
                        hasPhoto: collection.photos.some(item => item.id === this.data.photo.id),
                    }));
                })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    onCollectionSelect(collection: Collection): void {
        this.store.dispatch(addPhotoToCollection({
            collectionId: collection.id,
            photo: this.data.photo,
        }));
    }

    onAddNewCollection(): void {
        this.dialogRef.close(SelectCollectionDialogResult.AddCollection);
    }
}
