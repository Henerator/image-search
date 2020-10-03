import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiOptions } from '@shared/models/api-options.model';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
    defaultHttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) {
    }

    get<T>(path: string, options: ApiOptions = {}): Observable<T> {
        const httpParams = this.getHttpParams(options.searchParams);
        const httpHeaders = this.getHttpHeaders(options.headers);
        return this.http.get<T>(path, {
            params: httpParams,
            headers: httpHeaders,
        });
    }

    private getHttpParams(searchParams?: Record<string, string>): HttpParams {
        let httpParams = new HttpParams();
        for (const [key, value] of Object.entries(searchParams)) {
            httpParams = httpParams.set(key, value);
        }
        return httpParams;
    }

    private getHttpHeaders(headers: HttpHeaders): HttpHeaders {
        let httpHeaders = new HttpHeaders();
        httpHeaders = this.applyHeaders(httpHeaders, this.defaultHttpHeaders);
        httpHeaders = this.applyHeaders(httpHeaders, headers);
        return httpHeaders;
    }

    private applyHeaders(target: HttpHeaders, source: HttpHeaders): HttpHeaders {
        if (source === undefined) {
            return target;
        }

        [...source.keys()].forEach(key => {
            target = target.append(key, source.get(key));
        });
        return target;
    }
}
