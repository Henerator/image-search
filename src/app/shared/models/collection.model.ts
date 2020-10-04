import { Photo } from './photo.model';

export interface Collection {
    id: string;
    name: string;
    description: string;
    photos: Photo[];
}
