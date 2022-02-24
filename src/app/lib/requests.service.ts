import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { articlesRoute } from './routes';
import { Observable } from 'rxjs';

export interface RequestParams {
    _sort?: string;
    _order?: string;
    _start?: number;
    _end?: number;
    _limit?: number;
}

export interface Articles {
    id: number;
    title: string;
    content: string;
    image: string;
    description: string;
    created: number;
}

@Injectable({
    providedIn: 'root'
})
export class RequestsService {
    constructor(private http: HttpClient) {

    }

    getArticle(params: {id: number}): Observable<Articles> {
        return this.http.get<Articles>(`${articlesRoute}/${params.id}`);
    }

    getArticles(vars: RequestParams): Observable<Articles[]> {
        const filteredPart: string = this.generateFilters(vars);// Using this function for create the part of URL that filters
        const articleParams = new HttpParams({fromString: filteredPart});

        // Return an observable that will be subscribe at home.component
        return this.http.get<Articles[]>(`${articlesRoute}`, {
            params: articleParams
        });
    }

    generateFilters(vars: RequestParams): string {
        let query: string = '';

        const keys: string[] =  Object.keys(vars);
        const values = Object.values(vars);

        keys.forEach((value, index) => {
            query += `${value}=${values[index]}`;
            if(index !== keys.length - 1)
                query += '&';
        });

        return query;
    }

}