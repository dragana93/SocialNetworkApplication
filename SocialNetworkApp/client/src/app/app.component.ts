
import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account-service.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Socila Network App';
  users: any;

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {

    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user: User  = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }


}
