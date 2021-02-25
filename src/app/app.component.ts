import { AfterContentChecked, Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from './services/User.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked {
  title = 'TFProjectAng';
  sub : Subscription;

  OldValue = false;
  AvatarName = "";
  base64image = "";
  popoverstr = "";

  constructor(private router: Router,private _service : UserService) {}
 
  ngAfterContentChecked() {

      if (this.OldValue != this._service.connected.getValue()) 
      {
      this.OldValue = this._service.connected.getValue();
      this.AvatarName = "";
      this.popoverstr = "";

      this.sub = this._service.avatarSubject.subscribe(data => {
        if (data != null)  
          this.AvatarName = data.results[0].lastName + ' ' + data.results[0].firstName;
          this.base64image = data.results[0].avatar;
          this.popoverstr = "Connected : " + data.results[0].connectionCount + " Times";
      });
    }
  }
}
