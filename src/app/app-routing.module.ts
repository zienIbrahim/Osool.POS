import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/helpers/guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
},
{
  path: 'auth',
  loadChildren: () =>
      import('../modules/auth/auth-routing.module').then((m) => m.AuthRoutingModule),
}, {
  path: 'POS',
  canActivate: [AuthGuard],
  loadChildren: () =>
      import('../modules/point-of-sale/point-of-sale-routing.module').then(
          (m) => m.PointOfSaleRoutingModule
      ),
}
//  {
//   path: 'dashboard',
//   canActivate: [],
//   loadChildren: () =>
//       import('modules/dashboard/dashboard-routing.module').then(
//           (m) => m.DashboardRoutingModule
//       ),
//  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
