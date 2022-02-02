import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../services/authentication-service';
import {Router} from '@angular/router';
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    const values = form.value;
    const authorized = this.auth.authenticate(values.email, values.password);
    authorized.subscribe(response => {
      console.log(response);
      if (response.username !== undefined) {
        localStorage.setItem('username', values.email);
        localStorage.setItem('password', values.password);
        this.router.navigate([`/`]);
      }
  },
    error => {
      alert(
        'Bad username or password'
      );
      form
        .reset();
    }
  )
    ;
  }
}
