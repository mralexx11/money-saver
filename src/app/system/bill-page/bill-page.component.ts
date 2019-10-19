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
  private currency: any;
  private bill: BillModel;
  private isLoaded = false;

  ngOnInit() {
    const observerObj = combineLatest ([
      this.billService.getBill(),
      this.billService.getCurrency('USD')
      ]);
    this.sub1 = observerObj.subscribe((data: [BillModel, any]) => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
    });
  }

  onRefresh() {
    this.isLoaded = false;
    this.sub2 = this.billService.getCurrency()
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
}
