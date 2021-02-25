import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbMenuModule, NbButtonModule, NbIconModule, NbCardModule, NbInputModule, NbListModule, NbDatepickerModule, NbDialogModule, NbToggleModule, NbCheckboxModule, NbSelectModule, NbSpinnerModule, NbAutocompleteModule, NbPopoverModule, NbUserComponent, NbUserModule  } from '@nebular/theme';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {CookieService} from 'ngx-cookie-service';

import { FourOFourComponent } from './components/four-o-four/four-o-four.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { ConfirmboxComponent } from './shared/confirmbox/confirmbox.component';

import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { ResetpasswdComponent } from './components/auth/resetpasswd/resetpasswd.component';

import { AuthguardService } from './services/authguard.service';
import { GentypeService } from './services/gentype.service';
import { GentypelistComponent } from './components/gentypelist/gentypelist.component';

import { ShopService } from './services/shop.service';
import { ShopResolverService } from './services/shop-resolver.service';
import { ShopdetComponent } from './components/shop/shopdet/shopdet.component';
import { ShoplistComponent } from './components/shop/shoplist/shoplist.component';
import { ShopaddComponent } from './components/shop/shopadd/shopadd.component';
import { ShopupdComponent } from './components/shop/shopupd/shopupd.component';

import { MusicService } from './services/music.service';
import { MusicResolverService } from './services/musicresolver.service';
import { MusiclistComponent } from './components/music/musiclist/musiclist.component';
import { MusicdetComponent } from './components/music/musicdet/musicdet.component';
import { MusicupdComponent } from './components/music/musicupd/musicupd.component';
import { MusicaddComponent } from './components/music/musicadd/musicadd.component';

import { MusictypelistComponent } from './components/musictype/musictypelist/musictypelist.component';
import { MusictypeaddComponent } from './components/musictype/musictypeadd/musictypeadd.component';
import { MusictypeupdComponent } from './components/musictype/musictypeupd/musictypeupd.component';


import { MusicformatlistComponent } from './components/musicformat/musicformatlist/musicformatlist.component';
import { MusicformataddComponent } from './components/musicformat/musicformatadd/musicformatadd.component';
import { MusicformatupdComponent } from './components/musicformat/musicformatupd/musicformatupd.component';

import { CountrylistComponent } from './components/country/countrylist/countrylist.component';
import { CountryaddComponent } from './components/country/countryadd/countryadd.component';
import { CountrydetComponent } from './components/country/countrydet/countrydet.component'; /* ? */
import { CountryupdComponent } from './components/country/countryupd/countryupd.component';
import { CountryService } from './services/country.service';
import { CountryResolverService } from './services/country-resolver.service';

import { CurrencyaddComponent } from './components/currency/currencyadd/currencyadd.component';
import { CurrencylistComponent } from './components/currency/currencylist/currencylist.component';
import { CurrencyupdComponent } from './components/currency/currencyupd/currencyupd.component';

import { CurrxlistComponent } from './components/currx/currxlist/currxlist.component';
import { CurrxaddComponent } from './components/currx/currxadd/currxadd.component';
import { CurrxupdComponent } from './components/currx/currxupd/currxupd.component';

import { UserlistComponent } from './components/user/userlist/userlist.component';
import { UseraddComponent } from './components/user/useradd/useradd.component';
import { UserupdComponent } from './components/user/userupd/userupd.component';
import { UserResolverService } from './services/user-resolver.service';

import { UserService } from './services/User.service';
import { User2Service } from './services/User2.service';

import { Graph2dispComponent } from './components/graph2disp/graph2disp.component'; /* ? */
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { Graph2dispmultiComponent } from './components/graph2dispmulti/graph2dispmulti.component';
import { ObjctlistComponent } from './components/objct/objctlist/objctlist.component';
import { FlipgraphsComponent } from './components/flipgraphs/flipgraphs.component';

import { AlifeFileToBase64Module } from 'alife-file-to-base64';

@NgModule({
  declarations: [
    AppComponent,
    FourOFourComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    ShoplistComponent,
    ShopaddComponent,
    ShopupdComponent,
    ShopdetComponent,
    ConfirmboxComponent,
    GentypelistComponent,
    MusiclistComponent,
    MusicdetComponent,
    MusicupdComponent,
    MusicaddComponent,
    MusictypelistComponent,
    MusictypeaddComponent,
    MusictypeupdComponent,
    MusicformatlistComponent,
    MusicformataddComponent,
    MusicformatupdComponent,
    CountrylistComponent,
    CountryaddComponent,
    CountrydetComponent,
    CountryupdComponent,
    CurrencyaddComponent,
    CurrencylistComponent,
    CurrencyupdComponent,
    CurrxlistComponent,
    CurrxaddComponent,
    CurrxupdComponent,
    Graph2dispComponent,
    Graph2dispmultiComponent,
    ResetpasswdComponent,
     UserlistComponent,
     UseraddComponent,
     UserupdComponent,
     ObjctlistComponent,
     FlipgraphsComponent,
     LogoutComponent

  ],
  entryComponents: [
    LogoutComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    NbInputModule,
    NbListModule,
    NbUserModule,
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NbToggleModule,
    NbCheckboxModule,
    NbSelectModule,
    NbSpinnerModule,
    NgxEchartsModule.forRoot({echarts,}),
    NbDateFnsDateModule,
    NbAutocompleteModule,
    NbPopoverModule,
    AlifeFileToBase64Module

  ],
  providers: [
    AuthguardService,
    GentypeService,
    MusicService,
    MusicResolverService,
    UserService,
    //User2Service,
    //UserResolverService,
    ShopService,
    ShopResolverService,
    CountryService,
    CountryResolverService,

    CookieService],
  bootstrap: [AppComponent] 
})
export class AppModule { }
