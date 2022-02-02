import {Component, OnInit} from '@angular/core';
import {OrderResponse} from '../services/order-response.model';
import {OrderService} from '../services/order-service';
import {AuthenticationService} from '../services/authentication-service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  username: any;

  constructor(private orderService: OrderService,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {

    this.username = this.authService.getUserLoggedIn();
  }


}
