import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Toast} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/modal-45/modal-45.html',
})
export class Modal45 {

  public number: Array<number> = [];
  public totalBallQlt: number;
  public restBall: number = 0;
  public selectedArray: Array<any> = [];


  public checkedNumber: string;

  constructor(private navCtrl: NavController, public param: NavParams, public viewCtrl: ViewController) {
    // console.log(param.get('ballQlt'));
    this.totalBallQlt = param.get('ballQlt');
    this.ballRoll();
  }

  public dismiss() {
    if (this.restBall == this.totalBallQlt) {
      this.viewCtrl.dismiss();
    } else {
      Toast.show("Bạn vẫn chưa chọn đủ số", '5000', 'center').subscribe(
        toast => {
          // console.log(toast);
        }
      );
    }
  }

  public ballRoll() {
    let i: number = 1;
    for (i = 1; i <= 45; i++) {
      this.number.push(i);
    }
  }

  public selectBall(No: number, status) {
    if (this.restBall != this.totalBallQlt) {
      if (status == true) {
        this.restBall++;

        this.selectedArray.push(No); //Thêm số được chọn vào mảng
      } else {
        this.restBall--;

        // Xóa số trong mảng số chọn      
        let i = this.selectedArray.indexOf(No);
        if (i != -1) {
          this.selectedArray.splice(i, 1);
        }

      }
    } else {
      this.viewCtrl.dismiss({
        selected: this.selectedArray
      });
    }

  }

}
