import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
})
export class ManageUserComponent  implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('addStaffForm') addStaffForm!: NgForm;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';

  email: any;
  password: any;
  firstName: any;
  lastName: any;
  mobile: any;
  UserRole = 'Staff';
  users: any
  p:number=1;
  constructor(private authService: AuthenticationService) {

  }

  ngOnInit() {
    this.authService.getUsers().subscribe(res=>{
      console.log(res)
      this.users = res.filter(user => user['UserRole'] === 'User');
    })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm(data: any) {
    this.modal.dismiss('confirm');
    console.log(data)
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

  deleteUser(id:any){
    console.log(id)
    this.authService.deleteUser(id).then(res=>{
      this.authService.presentToast('User Deleted Successfully', 'success')
    }).catch(err=>{
      this.authService.presentToast(err, 'danger')
    })
  }
}
