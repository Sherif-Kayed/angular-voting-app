import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { signInService } from './sign-in.service';
import 'rxjs/add/operator/toPromise';
import { Voter } from '../models.voting';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras
}                           from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [signInService]
})
export class SignInComponent implements OnInit {

  constructor(private router: Router, private serviceSignin: signInService, fb: FormBuilder ) {}
  nID :string ;
  public voter: Voter;
  private errorMessage;
  myForm: FormGroup;
  voterID = new FormControl("", Validators.required);
  rightnID: string;
  ngOnInit() {
  }

   navigationExtras: NavigationExtras ;


  signIn(): Promise<any> {
    return this.serviceSignin.signIn(this.nID)
    .toPromise()
    .then(asset => {
      this.errorMessage = null;
      if(this.nID == asset.nationalID)
      {
          this.navigationExtras= {
            queryParams: { 'voter_id': this.nID }
          };
          this.router.navigate(['/Vote', this.nID ]);
      }
      else{

      } //wrong nid
      })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
        this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = "Wrong ID";
        }
    });
  }

}
