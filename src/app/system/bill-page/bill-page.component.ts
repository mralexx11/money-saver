import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {BillModel} from '../shared/models/bill.model';

@Component({
  selector: 'ohr-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  constructor(private billService: BillService) { }
  private sub1: Subscription;
  private sub2: Subscription;

  private bill: BillModel;
  private cur: any;
  isLoaded = false;
  ngOnInit() {
    const observerObj = combineLatest ([
      this.billService.getBill(),
      this.billService.getCurrency('USD')
      ]);
    this.sub1 = observerObj.subscribe((data: [BillModel, any]) => {
      this.bill = data[0];
      this.cur = data[1];
      this.isLoaded = true;
      console.log(data);
    });
  }
  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
}
