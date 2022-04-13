import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Constant } from 'src/app/Constant';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constUrl: any = null;

  listChange: Subject<any[] | any> = new Subject<any[] | any>();

  constructor (private _httpClient: HttpClient) {
    if (location.hostname === 'localhost' || location.hostname === "127.0.0.1") {
      this.constUrl = Constant.HttpConfig.localHost;
    }
    else {
      this.constUrl = Constant.HttpConfig.serverHost;
    }
  }

  getItems (userID: any) {
    let body = {
      userID: userID
    }

    let url = this.constUrl + '/bills/getBills';
    const promise = new Promise<void>((resolve, reject) => {
      this._httpClient.post<any>(url, body).subscribe({
        next: (res: any) => {
          if (JSON.stringify(res) !== '{}') {
            this.listChange.next(res);
          }
          resolve();
        },
        error: (err: any) => {
          reject(err);
        }
      });
    });
  }

  addItem (userID: any, name: any, amount: any, type: any, transactDate: any) {
    let body = {
      userID: userID,
      name: name,
      amount: amount,
      type: type,
      transactDate: transactDate
    }

    let url = this.constUrl + '/bills/addBills';
    const promise = new Promise<void>((resolve, reject) => {
      this._httpClient.post<any>(url, body).subscribe({
        next: (res: any) => {
          if (JSON.stringify(res) !== '{}') {
            this.getItems(userID);
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
