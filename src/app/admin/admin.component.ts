import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AdminService } from './admin.service';
import 'rxjs/add/operator/toPromise';
import { Regulator } from '../models.voting';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras
}                           from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AdminService]

})
export class AdminComponent implements OnInit {

  
  constructor(private router: Router, private serviceadmin: AdminService, fb: FormBuilder ) {}
  nID :string ;
  public voter: Regulator;
  private errorMessage;
  myForm: FormGroup;
  voterID = new FormControl("", Validators.required);
  rightnID: string;
  ngOnInit() {
  }


  signIn(): Promise<any> {
    return this.serviceadmin.signIn(this.nID)
    .toPromise()
    .then(asset => {
      this.errorMessage = null;
      if(this.nID == asset.rID)
      {
          this.router.navigate(['/Subject', this.nID ]);
      }
      else{
          this.errorMessage = "Wrong ID";
      } 
          })
    .catch((error) => {

        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
        this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage ="Wrong ID";
        }
    });
  }

}
