import { HttpHeaders } from '@angular/common/http';

export interface ApiOptions {
    headers?: HttpHeaders;
    searchParams?: Record<string, string>;
}
