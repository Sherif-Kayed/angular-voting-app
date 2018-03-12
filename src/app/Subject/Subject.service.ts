import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from '../models.voting';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class SubjectService {

	
		private NAMESPACE: string = 'Subject';
	


    constructor(private dataService: DataService<Subject>) {
    };

    public getAll(): Observable<Subject[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Subject> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Subject> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Subject> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Subject> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
