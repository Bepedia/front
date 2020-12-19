import { Component, OnInit } from '@angular/core';
import {CardInfo} from "../../_models/card-info";
import {MobileLoaderService} from "../../_services/mobile-loader.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cards: CardInfo[] = [
    {
      title: 'Bêtises',
      description: 'Les bêtises les plus improbables que bé ait dites',
      img: '/assets/img/betise-card-img.jpg',
      link: 'betise'
    },
    {
      title: 'Coutures',
      description: 'Les patrons de couture les plus réussis',
      img: '/assets/img/couture-card-img.jpg',
      link: 'couture'
    },
    {
      title: 'Recettes',
      description: 'Les plats et desserts les plus savoureux',
      img: '/assets/img/recette-card-img.jpg',
      link: 'recette'
    },
    {
      title: 'Galerie',
      description: 'Les plus belles photos de Pyro et les autres',
      img: '/assets/img/galerie-card-img.jpeg',
      link: 'galerie'
    },
    {
      title: 'Nendoroids',
      description: 'Notre collection de Nendoroids',
      img: '/assets/img/nendoroids-card-img.jpg',
      link: 'nendoroids'
    }
  ]

  constructor(
    private mobileLoaderService: MobileLoaderService
  ) { }

  ngOnInit(): void {
    this.mobileLoaderService.loading.next(false);
  }

}
