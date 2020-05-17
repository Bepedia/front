import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Couture} from "../../_models/couture";
import {Betise} from "../../_models/betise";
import {Recette} from "../../_models/recette";
import {AuthService} from "../../_services/auth.service";
import {MobileLoaderService} from "../../_services/mobile-loader.service";
import {ApiService} from "../../_services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-collection-form',
  templateUrl: './collection-form.component.html',
  styleUrls: ['./collection-form.component.scss']
})
export class CollectionFormComponent implements OnInit {

  collection = null;
  id = null;
  uploadedFile: File = null;
  fileName;

  model = {
    title: '',
    description: ''
  };

  nameMapping = {
    betise: 'Bêtise',
    couture: 'Couture',
    recette: 'Recette'
  }

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private mobileLoaderService: MobileLoaderService,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.collection = params['collection'];
      this.id = params['id'];
      if (this.id) {
        this.apiService.get(this.id, this.collection).subscribe(res => {
          this.model.title = res.title;
          this.model.description = res.description;
        });
      }
      this.mobileLoaderService.loading.next(false);
    });
  }

  create() {
    this.mobileLoaderService.loading.next(true);
    const payload: Betise | Couture | Recette = {
      title: this.model.title,
      description: this.model.description,
      author: this.authService.userData.email,
      creation_date: new Date(),
      comments: []
    };
    this.apiService.post(payload, this.collection).subscribe(async (res) => {
      if (this.uploadedFile) {
        await this.apiService.addImg(res.id, this.uploadedFile, this.collection).toPromise();
      }
      this.snackBar.open(`${this.nameMapping[this.collection]} créée`, 'Fermer', {duration: 2000});
      this.mobileLoaderService.loading.next(false);
      await this.router.navigate([this.collection]);
    });
  }

  update() {
    this.mobileLoaderService.loading.next(true);
    const payload: Betise | Couture | Recette = {
      title: this.model.title,
      description: this.model.description,
    };
    this.apiService.patch(payload, this.id,  this.collection).subscribe(async (res) => {
      if (this.uploadedFile) {
        await this.apiService.addImg(res.id, this.uploadedFile, this.collection).toPromise();
      }
      this.snackBar.open(`${this.nameMapping[this.collection]} mis à jour`, 'Fermer', {duration: 2000});
      this.mobileLoaderService.loading.next(false);
      // await this.router.navigate([this.collection]);
    });
  }

  triggerFile() {
    document.getElementById('fileInput').click();
  }

  chargeFile() {
    this.uploadedFile = (<HTMLInputElement>document.getElementById('fileInput')).files[0];
    this.fileName = this.uploadedFile.name;
  }

}
