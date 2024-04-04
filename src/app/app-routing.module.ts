import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SupportComponent } from './views/support/support.component';
import { AnalyticsComponent } from './views/analytics/analytics.component';
import { InventoryComponent } from './views/inventory/inventory.component';
import { AddEditCarComponent } from './views/add-edit-car/add-edit-car.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'inventory',
    component: InventoryComponent
  },
  {
    path: 'add_edit_inventory',
    component: AddEditCarComponent
  },
  {
    path: 'analytics',
    component: AnalyticsComponent
  },
  {
    path: 'support',
    component: SupportComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
