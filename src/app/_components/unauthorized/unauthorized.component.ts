import { Component, OnInit } from '@angular/core';
import {MobileLoaderService} from "../../_services/mobile-loader.service";

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

  constructor(
    private mobileLoaderService: MobileLoaderService
  ) { }

  ngOnInit(): void {
    this.mobileLoaderService.loading.next(false);
  }

}
