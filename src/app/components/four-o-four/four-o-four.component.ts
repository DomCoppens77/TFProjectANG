import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-four-o-four',
  templateUrl: './four-o-four.component.html',
  styleUrls: ['./four-o-four.component.scss']
})
export class FourOFourComponent implements OnInit {

  spinner = true;
  login = true;
  constructor(private _service : UserService) { }

  ngOnInit(): void {
    this.spinner = false;
    this.login = this._service.isConnectedNow;

  }

}
