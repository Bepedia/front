import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { LoginComponent } from './_components/login/login.component';
import {MaterialModule} from "./_material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './_components/home/home.component';
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import { CardComponent } from './_components/home/card/card.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ApiHttpInterceptor} from "./_interceptor/http.interceptor";
import { DetailsComponent } from './_components/details/details.component';
import { ConfirmComponent } from './_dialogs/confirm/confirm.component';
import { CollectionFormComponent } from './_components/collection-form/collection-form.component';
import { DataListComponent } from './_components/data-list/data-list.component';
import { UnauthorizedComponent } from './_components/unauthorized/unauthorized.component';
import { GalerieComponent } from './_components/galerie/galerie.component';
import {NgxMasonryModule} from "ngx-masonry";
import { GalerieImgComponent } from './_dialogs/galerie-img/galerie-img.component';
import { NendoroidsComponent } from './_components/nendoroids-home/nendoroids/nendoroids.component';
import { NendoroidsHomeComponent } from './_components/nendoroids-home/nendoroids-home.component';
import { OwnedComponent } from './_components/nendoroids-home/owned/owned.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CardComponent,
    DetailsComponent,
    ConfirmComponent,
    CollectionFormComponent,
    DataListComponent,
    UnauthorizedComponent,
    GalerieComponent,
    GalerieImgComponent,
    NendoroidsComponent,
    NendoroidsHomeComponent,
    OwnedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    NgxMasonryModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
