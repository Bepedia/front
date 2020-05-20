import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../_services/api.service";
import {Galerie} from "../../_models/galerie";
import {NgxMasonryOptions} from "ngx-masonry";
import {MobileLoaderService} from "../../_services/mobile-loader.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "../../_dialogs/confirm/confirm.component";
import {GalerieImgComponent} from "../../_dialogs/galerie-img/galerie-img.component";

@Component({
  selector: 'app-galerie',
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.scss']
})
export class GalerieComponent implements OnInit {

  masonryOptions: NgxMasonryOptions = {
    gutter: 10,
    fitWidth: false
  };
  masonryItems: Galerie[] = [];

  constructor(
    private apiService: ApiService,
    private mobileLoaderService: MobileLoaderService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.apiService.list('galerie').subscribe((galeries: Galerie[]) => {
      this.masonryItems = galeries;
      this.mobileLoaderService.loading.next(false);
    });
  }

  triggerInput() {
    document.getElementById('fileInput').click();
  }

  modelChange() {
    this.mobileLoaderService.loading.next(true);
    const qArray = [];
    const files = (<HTMLInputElement>document.getElementById('fileInput')).files;
    for (let i = 0; i < files.length; i++) {
      qArray.push(new Promise(resolve => {
        this.apiService.addImg(null, files[i], 'galerie').subscribe((img: Galerie) => {
          this.masonryItems.push(img);
          resolve();
        });
      }))
    }
    Promise.all(qArray).then(() => {
      this.snackBar.open('Photos ajoutées', 'Fermer', {duration: 2000});
      this.mobileLoaderService.loading.next(false);
    })
  }

  openImage(img) {
    this.dialog.open(GalerieImgComponent, {
      data: img,
      panelClass: 'galerie-panel'
    }).afterClosed().subscribe(deleted => {
      if (deleted) {
        const idx = this.masonryItems.findIndex(i => i.id === img.id);
        if (idx > -1) {
          this.masonryItems.splice(idx, 1);
        }
      }
    })
  }


}
