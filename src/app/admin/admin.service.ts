import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Regulator } from '../models.voting';
import 'rxjs/Rx';
@Injectable()
export class AdminService {

  private NAMESPACE: string = 'Regulator';

  constructor(private dataService: DataService<any>) { }
  public signIn(nID: string): Observable<any> {
    return this.dataService.getRegulator(this.NAMESPACE, nID);
  }
}
