import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdvisorModel } from 'src/app/models/advisor.model';

@Injectable({
  providedIn: 'root'
})
export class AdvisorService {

  constructor(
    private http: HttpClient
  ) { }


  listAdvisors():Observable<AdvisorModel[]>{
    return this.http.get<AdvisorModel[]>('http://localhost:3001/advisors?');
  }
  
  changeStatus(advisorId: number, statusId:number){
    return this.http.patch<AdvisorModel[]>(`http://localhost:3001/advisor/${advisorId}/advisor_status/${statusId}`,{});    
  }
}
