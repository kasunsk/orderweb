import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TimeoutError } from 'rxjs/util/TimeoutError';

@Injectable()
export class HttpClientService {
  private timeoutTime = 15000;

  constructor(private http: HttpClient) {
  }

  public get(url, params): Observable<Object> {
    const headers = new HttpHeaders();
    console.log(url);
    if (params != null) {
      return this.http.get(url, { observe: 'response',
        headers,
        params
      }).timeout(this.timeoutTime)
        .retryWhen(errors => // Retry if we get a TimeoutError, otherwise just pass on the error.
          errors.switchMap(e => {
            if (e instanceof TimeoutError) {
              console.log('No Connection. Retrying...');
              return Observable.of(true);
            } else {
              return Observable.throw(e);
            }
          })
        );
    } else {
      return this.http.get(url, { observe: 'response',
        headers: headers
      }) .timeout(this.timeoutTime)
        .retryWhen(errors => // Retry if we get a TimeoutError, otherwise just pass on the error.
          errors.switchMap(e => {
            if (e instanceof TimeoutError) {
              console.log('No Connection. Retrying...');
              return Observable.of(true);
            } else {
              return Observable.throw(e);
            }
          })
        );
    }
  }

  public post(url, data): Observable<Object> {
    const headers = new HttpHeaders();
    return this.http.post(url, data, { observe: 'response',
      headers: headers
    }).timeout(this.timeoutTime);
  }

  public put(url, data): Observable<Object> {
    const headers = new HttpHeaders();
    return this.http.put(url, data, { observe: 'response',
      headers: headers
    }).timeout(this.timeoutTime);
  }

  public delete(url): Observable<Object> {
    const headers = new HttpHeaders();
    return this.http.delete(url, { observe: 'response',
      headers: headers
    }).timeout(this.timeoutTime);
  }

}
