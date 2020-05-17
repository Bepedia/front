import { NgModule } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatDividerModule} from "@angular/material/divider";


const modules = [
  MatToolbarModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatSidenavModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatSnackBarModule,
  MatDividerModule
];


@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class MaterialModule { }
