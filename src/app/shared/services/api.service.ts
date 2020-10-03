import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiOptions } from '@shared/models/api-options.model';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
    constructor(private http: HttpClient) {
    }

    get<T>(path: string, options: ApiOptions = {}): Observable<T> {
        const httpParams = this.getHttpParams(options.searchParams);
        return this.http.get<T>(path, {
            params: httpParams,
        });
    }

    private getHttpParams(searchParams?: Record<string, string>): HttpParams {
        let httpParams = new HttpParams();
        for (const [key, value] of Object.entries(searchParams)) {
            httpParams = httpParams.set(key, value);
        }
        return httpParams;
    }
}
