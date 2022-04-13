import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: any = null;

  constructor (private _user: UserService) { }

  ngOnInit (): void {
    // this._user.getLogin('quan', 'pwd');
    this.initForm();
  }

  initForm () {
    this.form = new FormGroup({})
    this.form.addControl('username', new FormControl(null, [Validators.required]));
    this.form.addControl('pass', new FormControl(null, [Validators.required]));
  }

  onLogin (form: FormGroup) {
    this._user.getLogin(form.value.username, form.value.pass);
  }

  onRegister (form: FormGroup) {
    this._user.getRegister(form.value.username, form.value.pass);
  }
}
