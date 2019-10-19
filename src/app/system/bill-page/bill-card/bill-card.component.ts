import {Component, Input, OnInit} from '@angular/core';
import {BillModel} from '../../shared/models/bill.model';

@Component({
  selector: 'ohr-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: BillModel;
  @Input() currency: any;

  private hrn: number;
  private euro: number;

  constructor() { }

  ngOnInit() {
    const  { rates } = this.currency;
    this.hrn = rates['USD'] * this.bill.value / 0.04;
    this.euro = rates['EUR'] * this.bill.value;
    // console.log(this.currency.date);
  }

}
