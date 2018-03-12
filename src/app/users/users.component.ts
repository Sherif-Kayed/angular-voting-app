import { Component, OnInit , Input } from '@angular/core';
import { FormGroup, FormControl , Validators , FormBuilder } from '@angular/forms';
import { UsersService } from '../users.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  voterForm: FormGroup;

  private allVoters;
  private voter;
  private currentId;
  private errorMessage;

    nationalID = new FormControl("",Validators.required);
    name = new FormControl("",Validators.required);

  constructor(private usersService:UsersService, fb: FormBuilder) {
    this.voterForm = fb.group({
      nationalID:this.nationalID,
      name:this.name
    });
   }

   refresh(): void {
    window.location.reload();
}

  ngOnInit() {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.usersService.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allVoters = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }


    //add voter
    addVoter(form:any): Promise<any> {
      this.voter = {
        "$class": "models.voting.Voter",
        "nationalID":this.nationalID.value,
        "name":this.name.value

      };

      this.voterForm.setValue({
        "nationalID":null,
        "name":null
      });

      return this.usersService.addVoter(this.voter)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.voterForm.setValue({
          "nationalID":null,
          "name":null
        });
        this.refresh();
      })
      .catch((error) => {
        if (error == 'Server error'){
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
          this.errorMessage = error;
        }
      })
    }//end of addVoter


    updateVoter(form: any): Promise<any> {
      this.voter = {
        "$class": "models.voting.Voter",
        "name":this.name.value
      };

      return this.usersService.updateVoter(form.get("nationalID").value,this.voter)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.refresh();
      })
      .catch((error) => {
        if(error == 'Server error'){
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
          this.errorMessage = error;
        }
      });
    }//end of updateVoter


    deleteVoter(): Promise<any> {

      return this.usersService.deleteVoter(this.currentId)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.refresh();
      })
      .catch((error) => {
              if(error == 'Server error'){
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
          this.errorMessage = error;
        }
      });
    }//end of deleteVoter


    setId(id: any): void{
      this.currentId = id;
    }


    getForm(id:any): Promise<any>{

      return this.usersService.getVoter(id)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        let formObject = {
          "nationalID": null,
          "name": null
        };

        if(result.nationalID){
          formObject.nationalID = result.nationalID;
        }else{
          formObject.nationalID = null;
        }

        if(result.name){
          formObject.name = result.name;
        }else{
          formObject.name = null;
        }

        this.voterForm.setValue(formObject);

      })
      .catch((error) => {
        if(error == 'Server error'){
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
      }
      else if(error == '404 - Not Found'){
      this.errorMessage = "404 - Could not find API route. Please check your available APIs."
      }
      else{
          this.errorMessage = error;
      }
      });
    }//end of getForm

    resetForm(): void{
      this.voterForm.setValue({
        "nationalID":null,
        "name":null
        });
    }//end of resetForm

}
