import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { VoteService } from './Vote.service';
import { ActivatedRoute }     from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable }    from 'rxjs/Observable';
@Component({
	selector: 'app-Vote',
	templateUrl: './Vote.component.html',
	styleUrls: ['./Vote.component.css'],
  providers: [VoteService]
})
export class VoteComponent implements OnInit {

  myForm: FormGroup;
	voterId: Observable<string>;
	v: string;
  private allAssets;
  private asset;
  private currentId;
	private errorMessage;



          voteID = new FormControl("", Validators.required);



          choice = new FormControl("", Validators.required);



          voter = new FormControl("", Validators.required);



          subject = new FormControl("", Validators.required);




  constructor(private route: ActivatedRoute, private serviceVote:VoteService, fb: FormBuilder) {
    this.myForm = fb.group({


          voteID:this.voteID,



          choice:this.choice,



          voter:this.voter,



          subject:this.subject


    });
  };

  ngOnInit(): void {
    this.loadAll();
		this.route.params.subscribe(params => {
			this.v ='resource:models.voting.Voter#'+ params['id'];
			console.log(this.v + '->sss-<')
		});
	/*	this.voterId = this.route
		 .queryParamMap
		 .map(params => this.v = params.get('voter_id') || 'None', console.log(this.v + '->sss-<'));
		// this.v = this.voteID.get('voter_id');*/

  }

	refresh(): void {
    window.location.reload();
}


  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceVote.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }
  subid :string ;
  addAsset(form: any): Promise<any> {
    this.subid =   'resource:models.voting.Subject#'+ this.subject.value;
    this.asset = {
      "$class": "models.voting.Vote",


          "voteID":this.voteID.value,



          "choice":this.choice.value,



          "voter":this.voter.value,


                    
          "subject":this.subid


    };

    this.myForm.setValue({


          "voteID":null,



          "choice":null,



					"voter":null,


          "subject":null


    });

    return this.serviceVote.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({


          "voteID":null,



          "choice":null,


					"voter":null,


          "subject":null


      });
			this.refresh();
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      "$class": "models.voting.Vote",







            "choice":this.choice.value,





            "voter":this.voter.value,





            "subject":this.subject.value



    };

    return this.serviceVote.updateAsset(form.get("voteID").value,this.asset)
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
  }


  deleteAsset(): Promise<any> {

    return this.serviceVote.deleteAsset(this.currentId)
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
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceVote.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {


            "voteID":null,



            "choice":null,



            "voter":null,



            "subject":null


      };




        if(result.voteID){

            formObject.voteID = result.voteID;

        }else{
          formObject.voteID = null;
        }

        if(result.choice){

            formObject.choice = result.choice;

        }else{
          formObject.choice = null;
        }

        if(result.voter){

            formObject.voter = result.voter;

        }else{
          formObject.voter = null;
        }

        if(result.subject){

            formObject.subject = result.subject;

        }else{
          formObject.subject = null;
        }


      this.myForm.setValue(formObject);

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

  resetForm(): void{
    this.myForm.setValue({


          "voteID":null,



          "choice":null,



          "voter":this.v,



          "subject":null


      });
  }

}
