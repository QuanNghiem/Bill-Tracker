import { Component, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  subscriber: Subscription = new Subscription();

  login: boolean = false;

  constructor (private _user: UserService) {
    this.subscriber.add(
      this._user.userChange.subscribe(val => {
        this.login = val;
      })
    );
  }

  ngOnInit (): void {

  }
}
