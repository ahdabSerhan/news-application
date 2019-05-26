import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
export enum RequestMethod {
    GET,
    POST,
    PUT,
    DELETE
}
export abstract class CommonServer {
    constructor(public http: Http) { }

    protected Request(method: RequestMethod, uri: string, data: any) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers });
        switch (method) {
            case RequestMethod.GET:
                console.log('Requesting Data', 'GET', uri, data);
                return this.http.get(uri, options).map(this.responseHandler).catch(this.handleError);
            case RequestMethod.PUT:
                console.log('Requesting Data', 'PUT', uri, data);
                return this.http.put(uri, data, options).map(this.responseHandler).catch(this.handleError);
            case RequestMethod.POST:
                console.log('Requesting Data', 'POST', uri, data);
                return this.http.post(uri, data, options).map(this.responseHandler).catch(this.handleError);
            case RequestMethod.DELETE:
                console.log('Requesting Data', 'DELETE', uri, data);
                return this.http.delete(uri, options).map(this.responseHandler).catch(this.handleError);
        }
    }
    private responseHandler(res: Response) {
        const json = res.json();
        if (json.status && json.hasOwnProperty('data')) {
            return json.data;
        }
        else {
            this.handleBadResponse(json);
        }
    }
    private handleBadResponse(json: any) {
        const err = JSON.stringify(json.error) || 'unknown Failed in response json format';
        const body = JSON.stringify(json) || 'Response Return Empty';
        const errMsg = `Response Has Errors ${err} - ${body}`;
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    private handleError(error: Response | any) {
        console.error('Found Error', error);
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}