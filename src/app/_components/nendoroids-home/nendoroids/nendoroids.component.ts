import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MobileLoaderService} from "../../../_services/mobile-loader.service";
import {ApiService} from "../../../_services/api.service";
import {Nendoroid} from "../../../_models/nendoroid";
import {Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-nendoroids',
  templateUrl: './nendoroids.component.html',
  styleUrls: ['./nendoroids.component.scss']
})
export class NendoroidsComponent implements OnInit, AfterViewInit {

  nendoroids: Nendoroid[] = [];
  sortedList: Nendoroid[] = [];
  searchModel = '';
  $subscription: Subscription = null;
  numberOfElements = 0;

  constructor(
    private loadingService: MobileLoaderService,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.apiService.list('nendoroids').subscribe((nendoroids: Nendoroid[]) => {
      nendoroids.sort(this.sortNendoroids);
      this.nendoroids = nendoroids;
      this.spliceNendoroids();
      setTimeout(() => {
        this.loadingService.loading.next(false);
      });
    });
  }

  spliceNendoroids() {
    this.numberOfElements += 10;
    const copy = JSON.parse(JSON.stringify(this.nendoroids));
    this.sortedList = copy.splice(0, this.numberOfElements);
  }

  sortNendoroids(a, b): number {
    const aId = parseInt(a.id);
    const bId = parseInt(b.id);
    if (aId < bId) {
      return -1;
    }
    if (aId > bId) {
      return 1;
    }
    return 0;
  }

  search(query: string): void {
    this.numberOfElements = 0;
    this.loadingService.loading.next(true);
    if (this.$subscription) {
      this.$subscription.unsubscribe();
    }
    this.$subscription = this.apiService.search('nendoroids', query).subscribe((sortedNendoroids: Nendoroid[]) => {
      this.nendoroids = sortedNendoroids.sort(this.sortNendoroids);
      this.$subscription = null;
      this.spliceNendoroids();
      this.loadingService.loading.next(false);
    });
  }

  moreInfo(nendoroid: Nendoroid) {
    window.open(nendoroid.link, '_blank');
  }

  markAsOwned(n: Nendoroid) {
    this.loadingService.loading.next(true);
    setTimeout(() => {
      this.apiService.patch(n, n.id, 'nendoroids').subscribe(() => {
        this.loadingService.loading.next(false);
        this.snackBar.open(n.owned ? 'Achetée ?? Trop bien !!' : 'WTF genre tu l\'as perdue ou quoi...', 'Ferme là...', {duration: 3000});
      });
    });
  }

}
