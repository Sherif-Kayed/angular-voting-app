import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Voter } from '../models.voting';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class signInService {

  private NAMESPACE: string = 'Voter';

  constructor(private dataService: DataService<any>) {
  };


  public signIn(nID: string): Observable<any> {
      return this.dataService.getVoter(this.NAMESPACE, nID);
    }
  }
