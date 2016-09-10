import {Component} from '@angular/core';
import {TicketMap} from '../ticket-map/ticket-map';
import {Result} from '../result/result';
import {CheckTicket} from '../check-ticket/check-ticket';
import {SalePoint} from '../sale-point/sale-point';
import {Map} from '../map/map';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  private tab4Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = Map;
    this.tab2Root = Result;
    this.tab3Root = SalePoint;
    this.tab4Root = CheckTicket;
  }
}
