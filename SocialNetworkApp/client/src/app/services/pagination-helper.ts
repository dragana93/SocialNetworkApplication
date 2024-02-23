import { PaginatedResult } from '../models/pagination';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export function getPaginatedResult<T>(url: any, params: any, http: HttpClient) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return http.get<T>(url, { observe: 'response', params })
        .pipe(
            map((response) => {
                if (response.body) {
                    paginatedResult.result = response.body;
                }
                const pagination = response.headers.get('Pagination');
                if (pagination) {
                    paginatedResult.pagination = JSON.parse(pagination);
                }
                return paginatedResult;
            })
        );
}

export function getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return params;
}