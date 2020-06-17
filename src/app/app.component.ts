import { Component } from '@angular/core';
import {MobileLoaderService} from "./_services/mobile-loader.service";
import {AuthService} from "./_services/auth.service";
import {MobileService} from "./_services/mobile.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private mobileLoaderService: MobileLoaderService,
    private authService: AuthService,
    private mobileService: MobileService
  ) {
  }

  get isMobile() {
    return this.mobileService.isMobile;
  }

  get loading() {
    return this.mobileLoaderService.loading.getValue();
  }

  get email() {
    return this.authService.userData ? this.authService.userData.email : null;
  }

  get user() {
    return this.authService.userData;
  }
}
