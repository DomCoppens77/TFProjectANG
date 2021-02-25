import { AfterContentChecked, Component } from '@angular/core';
import { NbMenuItem, NbThemeService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements AfterContentChecked  {

  public items : NbMenuItem[] =  this._service.MenuChange;
  OldValue = false;
  
  theme = false;
  stricon = "moon";

  sub : Subscription;
  AvatarName = "";
  base64image = "";

  constructor(private _service : UserService,private themeService: NbThemeService) { }

  ngAfterContentChecked  (): void 
  {
    //console.log('Enter NAV Menu Change');
    if (this.OldValue != this._service.connected.getValue()) 
    {
      // console.log('Enter NAV Menu Change' + this.OldValue);
      this.OldValue = this._service.connected.getValue();
      this.items = this._service.MenuChange; 

        // this.sub = this._service.avatarSubject.subscribe(data => {
        //   this.AvatarName = "";
        //   if (data != null)  
        //     this.AvatarName = data.results[0].lastName + ' ' + data.results[0].firstName;
        //     this.base64image = data.results[0].avatar;
        // });
    }
  }

  toggle(checked: boolean) {
    this.theme = checked;
    if (this.theme)
    {
      this.themeService.changeTheme('dark');
      this.stricon = "sun";
    }
    else 
    {
      this.themeService.changeTheme('default');
      this.stricon = "moon";
    }
  }
}

