import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute }     from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SubjectService } from './Subject.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Subject',
	templateUrl: './Subject.component.html',
	styleUrls: ['./Subject.component.css'],
  providers: [SubjectService]
})
export class SubjectComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          sID = new FormControl("", Validators.required);
        
  
      
          description = new FormControl("", Validators.required);
        
  
      
          type = new FormControl("", Validators.required);
        
  
      
          currentState = new FormControl("", Validators.required);
        
  
      
          choices = new FormControl("", Validators.required);
        
  
      
          voteCount = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  


  constructor(private route: ActivatedRoute, private serviceSubject:SubjectService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          sID:this.sID,
        
    
        
          description:this.description,
        
    
        
          type:this.type,
        
    
        
          currentState:this.currentState,
        
    
        
          choices:this.choices,
        
    
        
          voteCount:this.voteCount,
        
    
        
          owner:this.owner
        
    
    });
  };

  refresh(): void {
    window.location.reload();
} 
  v: string ; 
  ngOnInit(): void {
    this.loadAll();
    this.route.params.subscribe(params => {
			this.v ='resource:models.voting.Regulator#'+ params['id'];
    });
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceSubject.getAll()
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
  ownerid :string ;

  addAsset(form: any): Promise<any> {
    //this.ownerid =   'resource:models.voting.Regulator#'+ this.owner.value;
    this.asset = {
      $class: "models.voting.Subject",
      
        
          "sID":this.sID.value,
        
      
        
          "description":this.description.value,
        
      
        
          "type":this.type.value,
        
      
        
          "currentState":this.currentState.value,
        
      
        
          "choices":this.choices.value,
        
      
        
          "voteCount":this.voteCount.value,
        
      
        
          "owner":this.v
        
      
    };

    this.myForm.setValue({
      
        
          "sID":null,
        
      
        
          "description":null,
        
      
        
          "type":null,
        
      
        
          "currentState":null,
        
      
        
          "choices":null,
        
      
        
          "voteCount":null,
        
      
        
          "owner":null
        
      
    });

    return this.serviceSubject.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "sID":null,
        
      
        
          "description":null,
        
      
        
          "type":null,
        
      
        
          "currentState":null,
        
      
        
          "choices":null,
        
      
        
          "voteCount":null,
        
      
        
          "owner":null 
        
      
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
      $class: "models.voting.Subject",
      
        
          
        
    
        
          
            "description":this.description.value,
          
        
    
        
          
            "type":this.type.value,
          
        
    
        
          
            "currentState":this.currentState.value,
          
        
    
        
          
            "choices":this.choices.value,
          
        
    
        
          
            "voteCount":this.voteCount.value,
          
        
    
        
          
            "owner":this.v
          
        
    
    };

    return this.serviceSubject.updateAsset(form.get("sID").value,this.asset)
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

    return this.serviceSubject.deleteAsset(this.currentId)
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

    return this.serviceSubject.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "sID":null,
          
        
          
            "description":null,
          
        
          
            "type":null,
          
        
          
            "currentState":null,
          
        
          
            "choices":null,
          
        
          
            "voteCount":null,
          
        
          
            "owner":null 
          
        
      };



      
        if(result.sID){
          
            formObject.sID = result.sID;
          
        }else{
          formObject.sID = null;
        }
      
        if(result.description){
          
            formObject.description = result.description;
          
        }else{
          formObject.description = null;
        }
      
        if(result.type){
          
            formObject.type = result.type;
          
        }else{
          formObject.type = null;
        }
      
        if(result.currentState){
          
            formObject.currentState = result.currentState;
          
        }else{
          formObject.currentState = null;
        }
      
        if(result.choices){
          
            formObject.choices = result.choices;
          
        }else{
          formObject.choices = null;
        }
      
        if(result.voteCount){
          
            formObject.voteCount = result.voteCount;
          
        }else{
          formObject.voteCount = null;
        }
      
        if(result.owner){
          
            formObject.owner = result.owner;
          
        }else{
          formObject.owner = null;
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
      
        
          "sID":null,
        
      
        
          "description":null,
        
      
        
          "type":null,
        
      
        
          "currentState":null,
        
      
        
          "choices":null,
        
      
        
          "voteCount":null,
        
      
        
          "owner":null 
        
      
      });
  }

}
