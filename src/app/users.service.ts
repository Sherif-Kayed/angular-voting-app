import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';
import { Voter } from './models.voting';

@Injectable()
export class UsersService {

  private NAMESPACE: string = 'Voter';

  constructor(private dataService: DataService<Voter>) { 
  };

  public getAll(): Observable<Voter[]> {
    return this.dataService.getAll(this.NAMESPACE);
  }

  public getVoter(id: any): Observable<Voter> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addVoter(itemToAdd: any): Observable<Voter> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateVoter(id: any, itemToUpdate: any): Observable<Voter> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteVoter(id: any): Observable<Voter> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}
