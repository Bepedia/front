import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Galerie} from "../../_models/galerie";
import {ConfirmComponent} from "../confirm/confirm.component";
import {ApiService} from "../../_services/api.service";

@Component({
  selector: 'app-galerie-img',
  templateUrl: './galerie-img.component.html',
  styleUrls: ['./galerie-img.component.scss']
})
export class GalerieImgComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Galerie,
    public dialogRef: MatDialogRef<GalerieImgComponent>,
    private dialog: MatDialog,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  delete() {
    this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Supprimer image',
        message: 'Es-tu sûr de vouloir supprimer cette image ?'
      }
    }).afterClosed().subscribe(confirm => {
      if (confirm) {
        this.apiService.delete(this.data.id, 'galerie').subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    });
  }

}
