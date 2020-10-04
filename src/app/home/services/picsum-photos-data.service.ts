import { Injectable } from '@angular/core';
import { Photo } from '@shared/models/photo.model';
import { ApiService } from '@shared/services/api.service';
import { map } from 'rxjs/operators';
import { PicsumPhoto } from '../models/picsum-photo.model';
import { PhotosDataService } from './photos-data.service';

const PHOTOS_PATH = 'https://picsum.photos/v2/list';

@Injectable()
export class PicsumPhotosDataService extends PhotosDataService<Photo[]> {
    constructor(private api: ApiService) {
        super();
    }

    fetch(limit: number): void {
        super.fetchData(
            this.api.get<PicsumPhoto[]>(PHOTOS_PATH, {
                searchParams: {
                    limit: String(limit)
                }
            }).pipe(
                map(picsumPhotos => picsumPhotos.map<Photo>(photo => ({
                    id: photo.id,
                    url: photo.download_url,
                    author: photo.author,
                }))
            ))
        );
    }
}
