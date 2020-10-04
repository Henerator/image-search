import { Injectable } from '@angular/core';
import { Collection } from '@shared/models/collection.model';
import { Photo } from '@shared/models/photo.model';
import { BaseDataService } from '@shared/services/base-data.service';
import { of } from 'rxjs';

const COLLECTIONS_DATA_MOCK: Collection[] = [
    {
        id: 1,
        name: 'Surfing',
        description: 'Some collection description',
        photos: [
            {
                author: 'Alejandro Escamilla',
                id: '1',
                url: 'https://picsum.photos/id/1/5616/3744',
            }
        ],
    },
    {
        id: 2,
        name: 'Iceland',
        description: 'Some collection description',
        photos: [],
    },
];

@Injectable()
export class CollectionsDataService extends BaseDataService<Collection[]> {
    fetch(): void {
        super.fetchData(
            of(COLLECTIONS_DATA_MOCK)
        );
    }

    addCollection(name: string, description: string): void {
        const storage = this.getStorage();
        const lastId = storage.reduce((id, item) => Math.max(id, item.id), 0);
        storage.push({
            id: lastId + 1,
            name,
            description,
            photos: [],
        });
        this.updateStorage(storage);
    }

    addPhotoToCollection(collectionId: number, photo: Photo): void {
        const storage = this.getStorage();
        const collection = (storage || []).find(item => item.id === collectionId);
        const isPhotoInCollection = collection.photos.some(item => item.id === photo.id);

        if (collection && !isPhotoInCollection) {
            collection.photos.push(photo);
            this.updateStorage(storage);
        }
    }
}
