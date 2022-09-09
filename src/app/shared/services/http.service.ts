import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MsgService } from './msg.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(public http: HttpClient, private msg: MsgService) { }

  get(url: string) {
    return this.http.get(url) as Observable<any>;
  }

  getAll(url: string) {
    return this.http.get(url) as Observable<any[]>;
  }

  post(url: string, model: any) {
    return this.http.post(url, model) as Observable<any>;
  }

  put(url: string, model: any) {
    return this.http.put(url, model);
  }

  delete(url: string) {
    return this.http.delete(url);
  }

  upload(url: string, model: any) {
    const formData: FormData = new FormData();
    for (const key in model) {
      if (model.hasOwnProperty(key)) {
        formData.append(key, model[key]);
      }
    }
    return this.http.post(url, formData);
  }

  postWithOptions(url: string, model: any, options: any) {
    // console.log('postWithOptions', model);
    return this.http.post(url, model, options) as Observable<any>;
  }

}
