import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class APIService {
  private _apiUrl: string = `${environment.domain}/api`;

  constructor(private _http: Http) { }

  _parseError(err) {
    try {
      return Observable.throw(err.json());
    } catch (e) {
      return Observable.throw([{
        code: 'SERVER_ERROR'
      }]);
    }
  }

  get(route:string, params?: object): Observable<any> {
    params = params || {};

    let requestOpts: URLSearchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      requestOpts.set(key, params[key]);
    });
    // append tokens in headers if authenticated
    let requestOptions = new RequestOptions();

    requestOptions.params = requestOpts;

    return this._http.get(`${this._apiUrl}/${route}`, requestOptions)
        .map(res => res.json().data)
        .catch(this._parseError);
  }

  put(route:string, params?: object): Observable<any> {
    params = params || {};


    return this._http.put(`${this._apiUrl}/${route}`, params)
        .map(res => res.json().data)
        .catch(this._parseError);
  }

  post(route:string, params?: object): Observable<any> {
    params = params || {};

    return this._http.post(`${this._apiUrl}/${route}`, params)
        .map(res => res.json().data)
        .catch(this._parseError);
  }

  delete(route:string, params?: object): Observable<any> {
    params = params || {};

    let requestOpts: URLSearchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      requestOpts.set(key, params[key]);
    });
    // append tokens in headers if authenticated
    let requestOptions = new RequestOptions();

    requestOptions.params = requestOpts;

    return this._http.delete(`${this._apiUrl}/${route}`, requestOptions)
        .map(res => res.json().data)
        .catch(this._parseError);
  }
}
