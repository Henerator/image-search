import { Injectable } from '@angular/core';
import { Photo } from '@shared/models/photo.model';
import { ApiService } from '@shared/services/api.service';
import { BaseDataService } from '@shared/services/base-data.service';

const PHOTOS_PATH = 'https://picsum.photos/v2/list';

@Injectable()
export class PhotosDataService extends BaseDataService<Photo[]> {
    constructor(private api: ApiService) {
        super();
    }

    fetch(limit: number): void {
        super.fetchData(
            this.api.get<Photo[]>(PHOTOS_PATH, {
                searchParams: {
                    limit: String(limit)
                }
            })
        );
    }
}
