import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';




@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

  email: any;
  password: any;

  options: AnimationOptions = {
    path: '/assets/lottie/login.json',
  };
  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() { /* There is no method which run on page load */ }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  login() {
    // Perform login logic here
    console.log('Login clicked');
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    this.authService.searchUserByEmailAndPassword(this.email, this.password).subscribe(res => {
      console.log("Email Password Response==========>", res)

      if (res.length != 0) {
        if (res[0]['UserRole'] == 'Admin') {
          this.router.navigate(['/admin']).then(() => {
            console.log(res)
          }).catch((err) => { console.log(err) });
        } else if (res[0]['UserRole'] == 'Staff') {
          this.router.navigate(['/Staff']).then(() => {
            console.log(res)
          }).catch((err) => { console.log(err) });

        } else {
          this.router.navigate(['/User']).then(() => {
            console.log(res)
          }).catch((err) => { console.log(err) });
        }
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
