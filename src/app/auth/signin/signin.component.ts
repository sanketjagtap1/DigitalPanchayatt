import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

  email: any;
  password: any;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() { /* There is no method which run on page load */ }

  login() {
    // Perform login logic here
    console.log('Login clicked');
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    this.authService.searchUserByEmailAndPassword(this.email, this.password).subscribe(res => {
      console.log("Email Password Response==========>", res)

      if (res.length != 0) {
        this.authService.presentToast('Login Success', 'success').then(() => {
        }).catch((err) => {
        });
      } else {
        console.log('Login Failed');
        this.authService.presentToast('Invalid Email Or Password', 'danger').then(() => {
        }).catch((err) => {
        });
      }

    })
  }
}
