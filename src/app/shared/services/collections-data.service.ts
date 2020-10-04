import { Injectable } from '@angular/core';
import { Collection } from '@shared/models/collection.model';
import { BaseDataService } from '@shared/services/base-data.service';
import { of } from 'rxjs';

const COLLECTIONS_DATA_MOCK = [
    {
        id: '1',
        name: 'Surfing',
        description: 'Some colleciton description',
        count: 3,
        urls: [],
    },
    {
        id: '2',
        name: 'Iceland',
        description: 'Some colleciton description',
        count: 7,
        urls: [],
    },
];

@Injectable()
export class CollectionsDataService extends BaseDataService<Collection[]> {
    fetch(): void {
        super.fetchData(
            of(COLLECTIONS_DATA_MOCK)
        );
    }
}
