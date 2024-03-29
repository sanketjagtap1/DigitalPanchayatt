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

  id: any='';
  email: any;
  password: any;
  firstName: any;
  lastName: any;
  mobile: any;
  users: any
  p: number = 1;
  isModalOpen = false;
  constructor(private commnService: CommonService, private router: Router, private authService: AuthenticationService) {
    // TODO document why this constructor is empty
  }

  ngOnInit() {

    this.authService.getUsers().subscribe(res=>{
      console.log(res)
      this.users = res.filter(user => user['UserRole'] === 'Staff');
    })
  }
  
  cancel() {
    this.modal.dismiss(null, 'cancel').then(res => {
      if (res) {
        console.log(res);
        this.isModalOpen=false;
        this.id='';
      this.firstName='';
      this.lastName='';
      this.email='';
      this.mobile='';
      this.password='';
        
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
      this.id='';
      this.firstName='';
      this.lastName='';
      this.email='';
      this.mobile='';
      this.password='';
      this.isModalOpen=false
      
    }).catch(err => {
      console.log(err);
    });
  }
  
  update(data:any){
    data.id = this.id;
    console.log("Form data for update=========>",data);
    
    this.authService.updateUser(data)
    .then(() => {
      this.id='';
      this.firstName='';
      this.lastName='';
      this.email='';
      this.mobile='';
      this.password='';
      this.isModalOpen=false
      console.log('User updated successfully!');
      this.authService.presentToast("User updated successfully!", "sucess")
      // You can perform additional actions here if needed
    })
    .catch((error) => {
      console.error('Error updating user:', error);
      this.authService.presentToast("Error updating user", "danger")
      // Handle the error or throw it to be caught elsewhere
      throw error;
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

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


  deletUser(id:any){
    console.log(id)
    this.authService.deleteUser(id).then(res=>{
      this.authService.presentToast('User Deleted Successfully', 'success')
    }).catch(err=>{
      this.authService.presentToast(err, 'danger')
    })
  }

  editUser(id:any){
    console.log(id);
    this.isModalOpen=true;
    this.authService.getUserById(id).subscribe(res=>{
      // console.log(res)
      this.id=res["id"];
      this.firstName=res["FirstName"];
      this.lastName=res["LastName"];
      this.email=res["Email"];
      this.mobile=res["Mobile"];
      this.password=res["Password"];
    })
  }

}
