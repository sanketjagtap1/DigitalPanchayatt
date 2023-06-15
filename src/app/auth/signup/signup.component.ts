import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { CommonService } from 'src/app/shared/common.service';

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
  constructor(private commnService: CommonService, private router: Router) { }
  @ViewChild('signupForm', { static: false }) signupForm!: NgForm;

  ngOnInit() { /* TODO document why this method 'ngOnInit' is empty */ }


  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  signUp(user: any) {
    // check if user is already present
    user.UserRole = "User";
    user.Approval = "Pending";
    this.commnService.signUp(user);
    this.signupForm.resetForm();
  }

}
