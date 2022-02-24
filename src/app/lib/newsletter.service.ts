import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { newsletterRoute} from './routes';
import { Observable, throwError} from 'rxjs';
import { mergeMap } from 'rxjs/operators';


export interface FormError {
    show: boolean;
    message: string;
}


@Injectable({
    providedIn: 'root'
})
export class NewsletterService {

    constructor(private http: HttpClient) {}

    subscribeUser(email: string): Observable<any> {
        return this.http.get<{id: number; email: string;}[]>(`${newsletterRoute}?email=${email}`)
            .pipe(
                mergeMap(
                    data => {
                        if(data.length > 0) {
                            // If it's already on the db, throw error
                            const err = new Error('Already on the DB.');
                            throw err;
                        }
                        // If it isn't, just post it on the server
                        return this.http.post(`${newsletterRoute}`, {email});
                })
            );
    }
}