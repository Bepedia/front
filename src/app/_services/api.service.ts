import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Betise} from "../_models/betise";
import {map} from "rxjs/operators";
import {Recette} from "../_models/recette";
import {Couture} from "../_models/couture";

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(
    private http: HttpClient
  ) { }

  list(resource): Observable<Betise[] | Couture[] | Recette[]> {
    return this.http.get(`/${resource}`).pipe(map((res: Betise[] | Couture[] | Recette[]) => res));
  }

  get(id, resource): Observable<Betise | Couture | Recette> {
    return this.http.get(`/${resource}/${id}`).pipe(map((res: Betise | Couture | Recette) => res));
  }

  post(data: Betise | Couture | Recette, resource): Observable<Betise | Couture | Recette> {
    return this.http.post(`/${resource}`, data).pipe(map((res: Betise | Couture | Recette) => res));
  }

  patch(data: Betise | Couture | Recette, id, resource): Observable<Betise | Couture | Recette> {
    return this.http.patch(`/${resource}/${id}`, data).pipe(map((res: Betise | Couture | Recette) => res));
  }

  delete(id, resource) {
    return this.http.delete(`/${resource}/${id}`);
  }

  addImg(id, image: File, resource): Observable<Betise | Couture | Recette> {
    const formData = new FormData();
    formData.append('file', image, image.name);
    return this.http.post(`/${resource}/${id}/image`, formData).pipe(map((res: Betise | Couture | Recette) => res));
  }
}
