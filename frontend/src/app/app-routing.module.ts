import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { HomeComponent } from './components/home/home.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { DestinationsComponent } from './components/destinations/destinations.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { ViewReservationComponent } from './components/view-reservation/view-reservation.component';
import { roleGuard } from './guards/role.guard';

const routes: Routes = [
  {path:'login', component: LoginFormComponent},
  {path:'register',component: RegisterFormComponent},
  {path:'',component:HomeComponent},
  {path:'contacts',component:ContactsComponent},
  {path: 'destinations/:location', 
  component: DestinationsComponent,
  pathMatch: 'full', // Ensure exact match
  data: { scrollTo: 'offers-section' },},
  {path:'create',component:CreateFormComponent,canActivate:[roleGuard]},
  {path:'reservation/:id',component:ViewReservationComponent,canActivate:[roleGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true,
    scrollPositionRestoration: 'enabled', 
    scrollOffset: [0, 64], 
    anchorScrolling: 'enabled', 
    onSameUrlNavigation: 'reload' 
   })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
