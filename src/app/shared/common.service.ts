import { Injectable } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData, where } from '@angular/fire/firestore';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private authService: AuthenticationService, private router: Router, private firestore: Firestore) { }

  // userCreation
  signUp(user: any) {
    // check if user is already present
    this.authService.checkEmail(user.Email).subscribe(res => {
      console.log("Email check res========>", res)
      if (res.length == 0) {
        this.authService.checkMobile(user.Mobile).subscribe(res => {
          if (res.length == 0) {
            this.authService.addUser(user).then(res => {
              console.log(res.id)
              if (res.id) {
                this.authService.presentToast("User Created Successfully", "success").then(res => {
                  if(user.UserRole=="Staff"){

                  }else{
                    this.router.navigate(['/']).then(res => { }).catch(err => { })
                  }
                }).catch(err => {
                  console.log(err)
                })
              }
            }).catch(err => {
              console.log(err)
              this.authService.presentToast("User Creation Failed", "danger").then(res => { }).catch(err => { console.log(err) })
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
