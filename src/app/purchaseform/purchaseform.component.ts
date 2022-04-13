import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PurchaseService } from '../shared/purchase/purchase.service';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-purchaseform',
  templateUrl: './purchaseform.component.html',
  styleUrls: ['./purchaseform.component.css']
})
export class PurchaseformComponent implements OnInit {

  form: any = null;

  constructor (private _user: UserService, private _purchase: PurchaseService) { }

  ngOnInit (): void {
    this.initForm();
  }

  initForm () {
    this.form = new FormGroup({})
    this.form.addControl('name', new FormControl(null, [Validators.required]));
    this.form.addControl('amount', new FormControl(null, [Validators.required]));
    this.form.addControl('type', new FormControl(null, [Validators.required]));
    this.form.addControl('transactDate', new FormControl(null, [Validators.required]));
  }

  onAdd (form: FormGroup) {
    // console.log(form);
    this._purchase.addItem(this._user.currentUser, form.value['name'], form.value['amount'], form.value['type'], form.value['transactDate'])
  }
}
