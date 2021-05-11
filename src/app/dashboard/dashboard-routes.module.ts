import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashbouard.routes';

const rutasHijas: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    //canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(rutasHijas)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
