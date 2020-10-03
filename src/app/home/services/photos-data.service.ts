import { BaseDataService } from '@shared/services/base-data.service';

export abstract class PhotosDataService<T> extends BaseDataService<T> {
    abstract fetch(limit: number, query?: string): void;
}
