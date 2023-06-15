import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-manage-staff',
  templateUrl: './manage-staff.component.html',
  styleUrls: ['./manage-staff.component.scss'],
})
export class ManageStaffComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('addStaffForm', { static: false }) addStaffForm!: NgForm;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';

  email: any;
  password: any;
  firstName: any;
  lastName: any;
  mobile: any;
  dataRole = '8806328987';
  users: any
  p: number = 1;
  constructor(private commnService: CommonService, private router: Router, private authService: AuthenticationService) {
    // TODO document why this constructor is empty
  }

  ngOnInit() {

    this.authService.getUsers().subscribe(res=>{
      this.users = res.filter(user => user['UserRole'] === 'Staff');
    })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel').then(res => {
      if (res) {
        console.log(res);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  confirm(data: any) {
    this.modal.dismiss('confirm').then(res => {
      console.log("res=====>", res);
      
      // check if data is already present
      data.UserRole = "Staff";
      console.log("data======>", data)
      
      this.commnService.signUp(data);
      this.addStaffForm.resetForm();

    }).catch(err => {
      console.log(err);
    });
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }


  Search() {
    if (this.firstName == '') {
      this.ngOnInit();
    } else {
      this.users = this.users.filter((res: { mobile: string; }) => {
        return RegExp(this.firstName.toLocaleLowerCase()).exec(res.mobile.toLocaleLowerCase())
      })
    }
  }

}
