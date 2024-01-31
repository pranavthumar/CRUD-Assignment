import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainLogicComponent } from './main-logic/main-logic.component';
import { FetchTokenComponent } from './fetch-token/fetch-token.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'salesforce',
    component: MainLogicComponent
  },
  {
    path: '**',
    component: FetchTokenComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
