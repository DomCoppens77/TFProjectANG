import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User2Service } from 'src/app/services/user2.service';
import { APIUSER,User } from 'src/app/models/User.full.model';

import * as _ from 'lodash';
import { UserService } from 'src/app/services/User.service';
import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-userupd',
  templateUrl: './userupd.component.html',
  styleUrls: ['./userupd.component.scss']
})
export class UserupdComponent implements OnInit {

  fg : FormGroup;
  admin : boolean;
  model : APIUSER = new APIUSER();
  spinner = true;
  base64textString = "";

  rawFiles : any;
  files : any;


  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  cardImageBase64act : string;

  constructor(private _builder : FormBuilder,private _router : ActivatedRoute, private _rout : Router, private _service : User2Service)
  { }

  ngOnInit(): void {

    this.admin = CheckAdmin();
    this.model = this._router.snapshot.data['model'];
    this.cardImageBase64 = this.model.results[0].avatar;
    this.cardImageBase64act = this.model.results[0].avatar;
    
    this.fg = this._builder.group({
      fname    : [this.model.results[0].firstName, Validators.required],
      lname    : [this.model.results[0].lastName, Validators.required],
      status   : [this.model.results[0].status, Validators.required],
    });  
    
    this.spinner = false;
  }

  onSubmit()  {
    
    const u = new User();
    u.id = Number(this.model.results[0].id);
    u.firstName = this.fg.value['fname']; 
    u.lastName = this.fg.value['lname'];
    u.status = Number(this.fg.value['status']);
    u.avatar = this.cardImageBase64;
    
    //console.log(u);

    this._service.update(u);
    
    this._rout.navigate(['/UserList'])
  }

  back2list() {
    this._rout.navigate(['/UserList'])
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 800;  // 15200
        const max_width = 600;   // 25600

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            return false;
        }

        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];

                //console.log(img_height, img_width);

                if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                        //console.log(img_height + " x " + img_width );
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    this.isImageSaved = true;
                    //console.log(this.cardImageBase64);
                    
                    // this.previewImagePath = imgBase64Path;
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
}

removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
}



  

}
