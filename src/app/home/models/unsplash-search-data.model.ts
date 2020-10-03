import { UnsplashPhoto } from './unsplash-photo.model';

export interface UnsplashSearchData {
    results: UnsplashPhoto[];
    total: number;
    total_pages: number;
}
