import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  email: any;
  password: any;
  firstName: any;
  lastName: any;
  mobile: any;

  options: AnimationOptions = {
    path: '/assets/lottie/login.json',
  };
  constructor(private authService: AuthenticationService, private router: Router) { }
  @ViewChild('signupForm') signupForm!: NgForm;

  ngOnInit() { /* TODO document why this method 'ngOnInit' is empty */ }


  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  signUp(user: any) {
    // check if user is already present
    this.authService.checkEmail(user.email).subscribe(res => {
      console.log("Email check res========>", res)
      if (res.length == 0) {
        this.authService.checkMobile(user.mobile).subscribe(res => {
          if (res.length == 0) {
            this.authService.addUser(user).then(res=>{
              console.log(res.id)
              if(res.id){
                this.authService.presentToast("User Created Successfully", "success").then(res=>{
                  this.router.navigate(['/']).then(res=>{}).catch(err=>{}) 
                }).catch(err=>{
                  console.log(err)
                })

              }
            }).catch(err=>{
              console.log(err)
              this.authService.presentToast("User Creation Failed", "danger").then(res=>{}).catch(err=>{console.log(err)}) 
            })
          } else {
            this.authService.presentToast("Mobile No Already Exists", "danger").then(res => { }).catch(err => { console.log(err) })
          }
        })
      } else {
        this.authService.presentToast("Email Id Already Exists", "danger").then(res => { }).catch(err => { console.log(err) })
      }
    })


  }

}
