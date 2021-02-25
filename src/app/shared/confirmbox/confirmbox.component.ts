import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-confirmbox',
  templateUrl: './confirmbox.component.html',
  styleUrls: ['./confirmbox.component.scss']
})
export class ConfirmboxComponent implements OnInit {

  @Input() name : string;
  @Input() count : number;
  
  constructor(private dialogRef: NbDialogRef<ConfirmboxComponent>) { }
  
  lchr_text  : string;
  lchr_text2 : string;
  lchr_text3 : string;
  lchr_text4 : string;

  disp_test  : string = "";

  disp_yes : string = "Yes";
  disp_no  : string = "No";

  ngOnInit(): void {
    this.lchr_text  = "Are you sure that you want to delete " + this.name + " ?";
    this.lchr_text2 = "The value " + this.name + " is used in " + this.count.toString() + " Record(s)";
    this.lchr_text3 = "Do you really want to Logout ?"
    this.lchr_text4 = "Do you really want to reactivate ?"

    switch(this.count) { 
      case 0: { 
        this.disp_test = this.lchr_text;
         break; 
      } 
      case -1: { 
        this.disp_test = this.lchr_text3;
        this.count = 0;
         break; 
      } 

      case -2: { 
        this.disp_test = this.lchr_text4;
        this.count = 0;
         break; 
      }       
      default: { 
        this.disp_test = this.lchr_text2;
        this.disp_no   = "Ok";
         break; 
      } 
    } 
  }
  
  yes() {
    this.dialogRef.close(true);
  }
  no() {
    this.dialogRef.close(false);
  }
}
