import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./_components/login/login.component";
import {HomeComponent} from "./_components/home/home.component";
import {AuthGuard} from "./_guard/auth.guard";
import {DetailsComponent} from "./_components/details/details.component";
import {CollectionFormComponent} from "./_components/collection-form/collection-form.component";
import {DataListComponent} from "./_components/data-list/data-list.component";
import {UnauthorizedComponent} from "./_components/unauthorized/unauthorized.component";


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path: ':collection', component: DataListComponent, canActivate: [AuthGuard]},
  {path: ':collection/form', component: CollectionFormComponent, canActivate: [AuthGuard]},
  {path: ':collection/form/:id', component: CollectionFormComponent, canActivate: [AuthGuard]},
  {path: ':collection/details/:id', component: DetailsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
