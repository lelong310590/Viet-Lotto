import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/modal-45/modal-45.html'
})
export class Modal45 {

  public number: Array<number> = [];

  public checkedNumber: string;
  public visible: boolean;

  constructor(private navCtrl: NavController, public param: NavParams, public viewCtrl: ViewController) {
    console.log(param.get('ball'));
    this.ballRoll();
    this.visible = true;
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

  public ballRoll() {
    let i: number = 1;
    for (i = 1; i <= 45; i ++) {
      this.number.push(i);
    }
  }

  public selectBall(No) {

  }

  public toggleCheck() {
    this.visible = !this.visible;
    this.checkedNumber = this.visible ? '' : 'checked-number';
  }

}
