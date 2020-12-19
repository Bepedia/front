import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../_services/api.service";
import {MobileLoaderService} from "../../../_services/mobile-loader.service";
import {Nendoroid} from "../../../_models/nendoroid";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "../../../_dialogs/confirm/confirm.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-owned',
  templateUrl: './owned.component.html',
  styleUrls: ['./owned.component.scss']
})
export class OwnedComponent implements OnInit {

  list: Nendoroid[] = [];
  totalNumberOfNendoroids = 0;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private loaderService: MobileLoaderService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.apiService.list('nendoroids').subscribe((nendoroids: Nendoroid[]) => this.totalNumberOfNendoroids = nendoroids.length);
  }

  refresh(actualRefresh = false) {
    if (actualRefresh) {
      this.loaderService.loading.next(true);
    }
    this.apiService.getNendoroidsOwned().subscribe((nendoroids: Nendoroid[]) => {
      this.list = nendoroids;
      if (actualRefresh) {
        this.loaderService.loading.next(false);
      }
    });
  }

  openDetails(n: Nendoroid) {
    window.open(n.link, '_blank');
  }

  removeFromOwned(n: Nendoroid) {
    n.owned = false;
    this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Marqué comme non possédée ?',
        message: 'T\'es sûre que tu l\'as perdue ? T\'as cherché partout ?'
      }
    }).afterClosed().subscribe(confirm => {
      if (confirm) {
        this.loaderService.loading.next(true);
        this.apiService.patch(n, n.id, 'nendoroids').subscribe(() => {
          this.snackBar.open('Bon ben tu l\'as bien perdu alors...', 'Oui, je sais...', {duration: 2000});
          this.loaderService.loading.next(false);
          this.refresh(true);
        })
      }
    });
  }

}
