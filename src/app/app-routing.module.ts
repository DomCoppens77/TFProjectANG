import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FourOFourComponent } from './components/four-o-four/four-o-four.component';

import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent} from './components/auth/logout/logout.component';
import { ResetpasswdComponent } from './components/auth/resetpasswd/resetpasswd.component';

import { AuthguardService } from './services/authguard.service';

import { GentypelistComponent } from './components/gentypelist/gentypelist.component';

import { ShoplistComponent } from './components/shop/shoplist/shoplist.component';
import { ShopaddComponent }  from './components/shop/shopadd/shopadd.component';
import { ShopupdComponent }  from './components/shop/shopupd/shopupd.component';
import { ShopdetComponent }  from './components/shop/shopdet/shopdet.component';
import { ShopResolverService } from './services/shop-resolver.service';

import { MusiclistComponent } from './components/music/musiclist/musiclist.component';
import { MusicaddComponent } from './components/music/musicadd/musicadd.component';
import { MusicupdComponent } from './components/music/musicupd/musicupd.component';
import { MusicdetComponent } from './components/music/musicdet/musicdet.component';
import { MusicResolverService } from './services/musicresolver.service';

import { CountrylistComponent } from './components/country/countrylist/countrylist.component';
import { CountryaddComponent }  from './components/country/countryadd/countryadd.component';
import { CountryupdComponent }  from './components/country/countryupd/countryupd.component';
import { CountrydetComponent }  from './components/country/countrydet/countrydet.component'; 
import { CountryResolverService } from './services/country-resolver.service';

import { CurrencylistComponent } from './components/currency/currencylist/currencylist.component';
import { CurrencyaddComponent }  from './components/currency/currencyadd/currencyadd.component';
import { CurrencyupdComponent }  from './components/currency/currencyupd/currencyupd.component';
import { CurrencyResolverService } from './services/currency-resolver.service';

import { CurrxlistComponent } from './components/currx/currxlist/currxlist.component';
import { CurrxaddComponent }  from './components/currx/currxadd/currxadd.component';
import { CurrxupdComponent }  from './components/currx/currxupd/currxupd.component';
import { CurrxResolverService } from './services/currx-resolver.service';

import { MusictypelistComponent } from './components/musictype/musictypelist/musictypelist.component';
import { MusictypeupdComponent }  from './components/musictype/musictypeupd/musictypeupd.component';
import { MusictypeaddComponent }  from './components/musictype/musictypeadd/musictypeadd.component';
import { MusicTypeResolverService } from './services/music-type-resolver.service';

import { MusicformatlistComponent } from './components/musicformat/musicformatlist/musicformatlist.component';
import { MusicformataddComponent }  from './components/musicformat/musicformatadd/musicformatadd.component';
import { MusicformatupdComponent }  from './components/musicformat/musicformatupd/musicformatupd.component';
import { MusicFormatResolverService } from './services/music-format-resolver.service';

import { NgxEchartsModule } from 'ngx-echarts';
import { Graph2dispComponent } from './components/graph2disp/graph2disp.component';
import { Graph2dispmultiComponent } from './components/graph2dispmulti/graph2dispmulti.component';

import { UserlistComponent } from './components/user/userlist/userlist.component';
import { UseraddComponent } from './components/user/useradd/useradd.component';
import { UserupdComponent } from './components/user/userupd/userupd.component';
import { User2ResolverService} from './services/user2-resolver.service';

import { ObjctlistComponent } from './components/objct/objctlist/objctlist.component';

import {LstbandResolverService} from './services/lstband-resolver.service';
import { FlipgraphsComponent } from './components/flipgraphs/flipgraphs.component';

const routes: Routes = [
{path : 'home', component: HomeComponent},
{path : 'login', component: LoginComponent},
{path : 'logout', component: LogoutComponent, canActivate : [AuthguardService]},
{path : 'resetpwd', component: ResetpasswdComponent},
{path : 'GenList', resolve: {model : LstbandResolverService} ,component : GentypelistComponent, canActivate : [AuthguardService]},
{path : 'objctlist',  component : ObjctlistComponent, canActivate : [AuthguardService]},

{path : 'ShopList', component: ShoplistComponent, canActivate : [AuthguardService]},
{path : 'ShopAdd', component: ShopaddComponent, canActivate : [AuthguardService]},
{path : 'ShopUpd/:id', resolve : {model : ShopResolverService}, component: ShopupdComponent, canActivate : [AuthguardService]},
{path : 'ShopDet/:id', resolve : {model : ShopResolverService}, component: ShopdetComponent, canActivate : [AuthguardService]},

{path : 'MusicList', component: MusiclistComponent, canActivate : [AuthguardService]},
{path : 'MusicAdd', component: MusicaddComponent, canActivate : [AuthguardService]},
{path : 'MusicUpd/:id', resolve : {model : MusicResolverService}, component: MusicupdComponent, canActivate : [AuthguardService]},
{path : 'MusicDet/:id', resolve : {model : MusicResolverService}, component: MusicdetComponent, canActivate : [AuthguardService]},

{path : 'CountryList', component: CountrylistComponent, canActivate : [AuthguardService]},
{path : 'CountryAdd', component: CountryaddComponent, canActivate : [AuthguardService]},
{path : 'CountryUpd/:ctry', resolve : {model : CountryResolverService}, component: CountryupdComponent, canActivate : [AuthguardService]},
{path : 'CountryDet/:ctry', resolve : {model : CountryResolverService}, component: CountrydetComponent, canActivate : [AuthguardService]},

{path : 'CurrencyList', component: CurrencylistComponent, canActivate : [AuthguardService]},
{path : 'CurrencyAdd', component: CurrencyaddComponent, canActivate : [AuthguardService]},
{path : 'CurrencyUpd/:curr', resolve : {model : CurrencyResolverService}, component: CurrencyupdComponent},

{path : 'CurrxList', component: CurrxlistComponent, canActivate : [AuthguardService]},
{path : 'CurrxAdd', component: CurrxaddComponent, canActivate : [AuthguardService]},
{path : 'CurrxUpd/:id', resolve : {model : CurrxResolverService}, component: CurrxupdComponent, canActivate : [AuthguardService]},

{path : 'MusicTypeList', component: MusictypelistComponent, canActivate : [AuthguardService]},
{path : 'MusicTypeAdd', component: MusictypeaddComponent, canActivate : [AuthguardService]},
{path : 'MusicTypeUpd/:id', resolve : {model : MusicTypeResolverService}, component: MusictypeupdComponent, canActivate : [AuthguardService]},

{path : 'MusicFormatList', component: MusicformatlistComponent, canActivate : [AuthguardService]},
{path : 'MusicFormatAdd', component: MusicformataddComponent, canActivate : [AuthguardService]},
{path : 'MusicFormatUpd/:id', resolve : {model : MusicFormatResolverService}, component: MusicformatupdComponent, canActivate : [AuthguardService]},

 {path : 'UserList', component: UserlistComponent, canActivate : [AuthguardService]},
 {path : 'UserAdd', component: UseraddComponent, canActivate : [AuthguardService]},
 {path : 'UserUpd/:id', resolve : {model : User2ResolverService}, component: UserupdComponent, canActivate : [AuthguardService]},
 
{path : 'graph2disp', component : Graph2dispComponent, canActivate : [AuthguardService]},
{path : 'graph2dispmulti', component : Graph2dispmultiComponent, canActivate : [AuthguardService]},
{path : 'flipgraphs', component : FlipgraphsComponent, canActivate : [AuthguardService]},



{path : '', redirectTo : '/home', pathMatch : 'full'}, // default Page
{path : 'notfound', component : FourOFourComponent},   // always at the end
{path : '**', redirectTo : '/notfound'}                // always at the end 
];

@NgModule({
  imports: [RouterModule.forRoot(routes),   
    NgxEchartsModule.forRoot({echarts: () => import('echarts')}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
