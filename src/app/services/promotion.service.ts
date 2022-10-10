import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import {  Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseUrl';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient) { }

  getPromotions():Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseURL + 'promotions');
        
  }

  getPromotion(id: string): Observable<Promotion>{
     return this.http.get<Promotion>(baseURL + `promotions/${id}`);
    
  }

  getFeaturedPromotion(): Observable<Promotion>{
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true').pipe(map(dishes => dishes[0]));
  }

}
