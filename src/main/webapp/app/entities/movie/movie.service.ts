import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Movie } from './movie.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MovieService {

    private resourceUrl = 'api/movies';
    private resourceSearchUrl = 'api/_search/movies';

    constructor(private http: Http) { }

    create(movie: Movie): Observable<Movie> {
        const copy = this.convert(movie);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(movie: Movie): Observable<Movie> {
        const copy = this.convert(movie);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Movie> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(movie: Movie): Movie {
        const copy: Movie = Object.assign({}, movie);
        return copy;
    }
}
