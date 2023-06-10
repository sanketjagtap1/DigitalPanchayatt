import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IonicModule } from '@ionic/angular';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [DashboardComponent, ManageStaffComponent, ManageUserComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    IonicModule.forRoot(),
    NgxPaginationModule,
    FormsModule
  ]
})
export class AdminModule { }
