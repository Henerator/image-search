import { isNgTemplate } from '@angular/compiler';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { Collection } from '@shared/models/collection.model';
import { addCollection, addPhotoToCollection } from '../actions/collections.actions';

export const initialState: Collection[] = [
    {
        id: 1,
        name: 'Surfing',
        description: 'Some collection description',
        photos: [],
    },
    {
        id: 2,
        name: 'Iceland',
        description: 'Some collection description',
        photos: [],
    },
];

const reducer = createReducer(
    initialState,
    on(addCollection, (state, { name, description }) => {
        const lastId = state.reduce((id, item) => Math.max(id, item.id), 0);
        return [
            ...state,
            {
                id: lastId + 1,
                name,
                description,
                photos: [],
            },
        ];
    }),
    on(addPhotoToCollection, (state, { collectionId, photo }) => {
        return state.map(collection => {
            if (collection.id === collectionId) {
                const isPhotoInCollection = collection.photos.some(collectionPhoto => collectionPhoto.id === photo.id);
                if (!isPhotoInCollection) {
                    return {
                        ...collection,
                        photos: [
                            ...collection.photos,
                            photo,
                        ],
                    };
                }
            }

            return collection;
        });
    })
);

// tslint:disable-next-line: typedef
export function collectionsReducer(state: Collection[], action: Action) {
    return reducer(state, action);
}
