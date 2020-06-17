import { Component, OnInit } from '@angular/core';
import {Betise} from "../../_models/betise";
import {ApiService} from "../../_services/api.service";
import {MobileLoaderService} from "../../_services/mobile-loader.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../_services/auth.service";
import {ConfirmComponent} from "../../_dialogs/confirm/confirm.component";
import {Couture} from "../../_models/couture";
import {Recette} from "../../_models/recette";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {

  dataList: Betise[] | Couture[] | Recette[] | any = null;
  collection = null;
  nameMapping = {
    betise: 'Bêtise',
    couture: 'Couture',
    recette: 'Recette'
  }

  constructor(
    private apiService: ApiService,
    private mobileLoaderService: MobileLoaderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.mobileLoaderService.loading.next(true);
    this.route.params.subscribe(params => {
      this.collection = params['collection'];
      this.apiService.list(this.collection).subscribe((list) => {
        list.sort(this.compare)
        this.dataList = list;
        this.mobileLoaderService.loading.next(false);
      })
    });
  }

  compare(a, b) {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();

    let comparison = 0;
    if (titleA > titleB) {
      comparison = 1;
    } else if (titleA < titleB) {
      comparison = -1;
    }
    return comparison;
  }

  delete(id) {
    this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Suppression',
        message: `Es-tu sûr de vouloir supprimer cette ${this.nameMapping[this.collection]} ?`
      },
      width: '75vw',
      height: '27vh'
    }).afterClosed().subscribe(confirm => {
      if (confirm) {
        this.apiService.delete(id, this.collection).subscribe(() => {
          const idx = this.dataList.findIndex(b => b.id === id);
          this.dataList.splice(idx, 1);
          this.snackBar.open(`${this.nameMapping[this.collection]} supprimée`, 'Fermer', {duration: 2000});
        })
      }
    })
  }

  get email() {
    return this.authService.userData ? this.authService.userData.email : null;
  }

}
