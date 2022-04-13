import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PurchaseService } from '../shared/purchase/purchase.service';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  subscriber: Subscription = new Subscription();

  currentList: any = null;

  currentHeader: any[] = ['name', 'amount', 'type', 'transactDate'];

  constructor (private _user: UserService, private _purchase: PurchaseService) {
    this.subscriber.add(
      this._user.userChange.subscribe(val => {
        // console.log('Called')
        this.getTransactions();
      })
    );

    this.subscriber.add(
      this._purchase.listChange.subscribe(val => {
        // console.log(val);
        this.currentList = val;
      })
    );
  }

  ngOnInit (): void {
  }

  getTransactions () {
    this._purchase.getItems(this._user.currentUser);
  }

  counter (i: number) {
    return new Array(i);
  }
}
