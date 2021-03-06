import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '@shared/models/photo.model';
import { ApiService } from '@shared/services/api.service';
import { map } from 'rxjs/operators';
import { UnsplashSearchData } from '../models/unsplash-search-data.model';
import { PhotosDataService } from './photos-data.service';

const PHOTOS_PATH = 'https://api.unsplash.com/search/photos';

@Injectable()
export class UnsplashPhotosDataService extends PhotosDataService<Photo[]> {
    constructor(private api: ApiService) {
        super();
    }

    fetch(limit: number, query: string): void {
        super.fetchData(
            this.api.get<UnsplashSearchData>(PHOTOS_PATH, {
                headers: new HttpHeaders({
                    Authorization: 'Client-ID [Access-key]',
                }),
                searchParams: {
                    query,
                    per_page: String(limit)
                },
            }).pipe(
                map(data => data.results.map<Photo>(photo => ({
                    id: photo.id,
                    url: photo.urls.regular,
                    author: photo.user.name,
                })))
            )
        );
    }
}
