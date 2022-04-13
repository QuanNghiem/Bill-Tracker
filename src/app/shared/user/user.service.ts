import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Constant } from 'src/app/Constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constUrl: any = null;

  userChange: Subject<any[] | any> = new Subject<any[] | any>();

  currentUser: any;

  constructor (private _httpClient: HttpClient) {
    if (location.hostname === 'localhost' || location.hostname === "127.0.0.1") {
      this.constUrl = Constant.HttpConfig.localHost;
    }
    else {
      this.constUrl = Constant.HttpConfig.serverHost;
    }
  }

  async getLogin (username: any, pass: any) {
    let body = {
      username: username,
      pass: pass
    }

    let url = this.constUrl + '/users/login';

    const promise = new Promise<void>((resolve, reject) => {
      this._httpClient.post<any>(url, body).subscribe({
        next: (res: any) => {
          if (JSON.stringify(res) !== '{}') {
            this.currentUser = res.userID;
            this.userChange.next(true);
          }
          resolve();
        },
        error: (err: any) => {
          reject(err);
        }
      });
    });
  }

  getRegister (username: any, pass: any) {
    let body = {
      username: username,
      pass: pass
    }

    let url = this.constUrl + '/users/register';
    const promise = new Promise<void>((resolve, reject) => {
      this._httpClient.post<any>(url, body).subscribe({
        next: (res: any) => {
          if (JSON.stringify(res) !== '{}') {
            this.currentUser = res.userID;
            this.userChange.next(true);
          }
          resolve();
        },
        error: (err: any) => {
          reject(err);
        }
      });
    });
  }
}
