import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FourOFourComponent } from './components/four-o-four/four-o-four.component';
import { LoginComponent } from './components/login/login.component';
import { ShoplistComponent } from './components/shoplist/shoplist.component';

const routes: Routes = [
{path : 'home', component: HomeComponent},
{path : 'login', component: LoginComponent},
{path : 'ShopList', component: ShoplistComponent},


{path : 'notfound', component : FourOFourComponent},  // always at the end
{path : '**', redirectTo : '/notfound'}               // always at the end
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
