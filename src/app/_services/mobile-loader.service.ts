import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MobileLoaderService {

  loading = new BehaviorSubject(true);

  constructor() { }
}
