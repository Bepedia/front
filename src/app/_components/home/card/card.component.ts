import {Component, Input, OnInit} from '@angular/core';
import {CardInfo} from "../../../_models/card-info";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() cardInfo: CardInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
