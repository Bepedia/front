import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../_services/api.service";
import {ActivatedRoute} from "@angular/router";
import {Betise} from "../../_models/betise";
import {Couture} from "../../_models/couture";
import {Recette} from "../../_models/recette";
import {MobileLoaderService} from "../../_services/mobile-loader.service";
import {AuthService} from "../../_services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "../../_dialogs/confirm/confirm.component";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  collection = null;
  data: Couture | Betise | Recette;
  openCommentForm = false;
  commentModel = '';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private mobileLoaderService: MobileLoaderService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.collection = params['collection'];
      this.apiService.get(params['id'], params['collection']).subscribe((res: Betise | Couture | Recette) => {
        this.data = res;
        this.mobileLoaderService.loading.next(false);
      })
    });
  }

  postComment() {
    const comments = [...this.data.comments];
    comments.push({
      comment: this.commentModel,
      creation_date: new Date(),
      author: this.authService.userData.email
    });
    this.updateComments(comments);
  }

  deleteComment(commentIdx) {
    this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Suppression du commentaire',
        message: 'Es-tu sûr de vouloir supprimer ton commentaire ?'
      },
      width: '75vw',
      height: '27vh',
    }).afterClosed().subscribe(confirm => {
      if (confirm) {
        const comments = [...this.data.comments];
        comments.splice(commentIdx, 1);
        this.updateComments(comments);
      }
    })
  }

  updateComments(comments: any[]) {
    this.apiService.patch({comments: comments}, this.data.id, this.collection).subscribe(data => {
      this.data = data;
      this.openCommentForm = false;
      this.commentModel = '';
      this.snackBar.open('Commentaire posté', 'Fermer', {duration: 2000});
    });
  }

  get currentEmail() {
    return this.authService.userData ? this.authService.userData.email : null;
  }

}
