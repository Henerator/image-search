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

    private subscriptions = new SubscriptionStorage();

    constructor(
        private collectionsDataService: CollectionsDataService,
    ) {
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.collectionsDataService.data$.subscribe(data => this.collections = data)
        );

        this.collectionsDataService.fetch();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
