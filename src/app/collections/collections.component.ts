import { Component, OnDestroy, OnInit } from '@angular/core';
import { Collection } from '@shared/models/collection.model';
import { SubscriptionStorage } from '@shared/models/subscriptions-storage';
import { CollectionsDataService } from '@shared/services/collections-data.service';

@Component({
    selector: 'app-collections',
    templateUrl: './collections.component.html',
    styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit, OnDestroy {
    collections: Collection[] = [];
    selectedCollection: Collection;

    private subscriptions = new SubscriptionStorage();

    constructor(
        private collectionsDataService: CollectionsDataService,
    ) {
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.collectionsDataService.data$.subscribe(data => {
                this.collections = data;
                if (!this.selectedCollection && data.length > 0) {
                    this.selectedCollection = data[0];
                }
            })
        );

        this.collectionsDataService.fetch();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    onCollectionSelect(collection: Collection): void {
        this.selectedCollection = collection;
    }
}
