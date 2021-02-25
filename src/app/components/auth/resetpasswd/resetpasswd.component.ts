import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { resetpasswd } from 'src/app/Models/User.Login.model';
import { UserService } from 'src/app/services/User.service';


@Component({
  selector: 'app-resetpasswd',
  templateUrl: './resetpasswd.component.html',
  styleUrls: ['./resetpasswd.component.scss']
})
export class ResetpasswdComponent implements OnInit {

  fg : FormGroup;
  error_text = "";
  try = 0;
  
  constructor(private _service : UserService, 
    private _builder : FormBuilder,
    private _rout : Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.fg = this._builder.group({
      Email : ['zecoop@gmail.com', [Validators.required, Validators.email]],
      SecretAnswer : ['MUHADIB', [Validators.required]],
      Passwd : ['ABC123', Validators.required]
    })
  }
  onSubmit() {
    const rpw = new resetpasswd();
    rpw.email = this.fg.value['Email'];
    rpw.secretAnswer = btoa(this.fg.value['SecretAnswer']);
    rpw.passwd = btoa(this.fg.value['Passwd']) ;
    
    this._service.resetPasswd(rpw).then((data) => { 
      if (data[0]) { this._rout.navigate(['/login']);}
      else         { this.try += 1;
                     this.error_text="Wrong Login/Secret Answer (" + this.try + ")";
                    // maybe safe after several try the time and avoid login with the next 5 minutes
                    // localstore will be too easy ? no ?                    
                    }
      }).catch( (data) =>{
        this.try += 1;
        this.error_text="Something Went Wrong (" + this.try + ")";     
    });
  }
  back2login()
  {

    this._rout.navigate(['/login']);
  }
}
