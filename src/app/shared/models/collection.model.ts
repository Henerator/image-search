import { Photo } from './photo.model';

export interface Collection {
    id: number;
    name: string;
    description: string;
    photos: Photo[];
}
