import { Injectable } from '@angular/core';
import { Collection } from '@shared/models/collection.model';
import { BaseDataService } from '@shared/services/base-data.service';
import { of } from 'rxjs';

const COLLECTIONS_DATA_MOCK: Collection[] = [
    {
        id: '1',
        name: 'Surfing',
        description: 'Some collection description',
        photosIds: [
            '1',
        ],
    },
    {
        id: '2',
        name: 'Iceland',
        description: 'Some collection description',
        photosIds: [],
    },
];

@Injectable()
export class CollectionsDataService extends BaseDataService<Collection[]> {
    fetch(): void {
        super.fetchData(
            of(COLLECTIONS_DATA_MOCK)
        );
    }

    addPhotoToCollection(collectionId: string, photoId: string): void {
        const storage = this.getStorage();
        const collection = (storage || []).find(item => item.id === collectionId);

        if (collection && !collection.photosIds.includes(photoId)) {
            collection.photosIds.push(photoId);
            this.updateStorage(storage);
        }
    }
}
