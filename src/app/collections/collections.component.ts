import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Collection } from '@shared/models/collection.model';
import { SubscriptionStorage } from '@shared/models/subscriptions-storage';

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
        private store: Store<{ collections: Collection[] }>,
    ) {
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.store.select('collections')
                .subscribe(data => {
                    this.collections = data;
                    if (!this.selectedCollection && data.length > 0) {
                        this.selectedCollection = data[0];
                    }
                })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    onCollectionSelect(collection: Collection): void {
        this.selectedCollection = collection;
    }
}
