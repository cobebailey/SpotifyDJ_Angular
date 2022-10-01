import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, lastValueFrom } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CallApiService {
  constructor(private http: HttpClient) {}

  async callApi(url = '', method = 'GET', body = null) {
    //setup headers and options
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //prettier-ignore
      'Authorization': `Bearer ${accessToken}`,
    });
    const options: Object = {
      headers: headers,
      observe: body,
      params: null,
      reportProgress: false,
      responseType: 'json',
      withCredentials: false,
    };
    //this returns a promise to other services, which will supply a URL
    return lastValueFrom(this.http.get(url, options));
  }
}
