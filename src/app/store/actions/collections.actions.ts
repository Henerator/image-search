import { createAction, props } from '@ngrx/store';
import { Photo } from '@shared/models/photo.model';

export const addCollection = createAction(
    '[Collections] Add collection',
    props<{ name: string; description: string }>()
);

export const addPhotoToCollection = createAction(
    '[Collections] Add photo to collection',
    props<{ collectionId: number; photo: Photo }>()
);
