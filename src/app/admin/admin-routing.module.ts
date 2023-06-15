import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageComplaintsComponent } from './manage-complaints/manage-complaints.component';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { ManageUserComponent } from './manage-user/manage-user.component';

const routes: Routes = [
  {path: '', component:DashboardComponent},
  {path: 'staff', component:ManageStaffComponent},
  {path: 'user', component:ManageUserComponent},
  {path: 'complaints', component:ManageComplaintsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
