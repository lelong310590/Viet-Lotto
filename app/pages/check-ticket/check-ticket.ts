import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {Modal45} from '../modal-45/modal-45';
import {DatePicker} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/check-ticket/check-ticket.html'
})
export class CheckTicket {

  public bao: Array<number> = []; //Mảng chưa các kiểu đánh bao số
  public selectBao = 6; //Kiểu bao số mặc định

  public ballBao: Array<number> = [] //Mảng chứa số lượng bóng theo kiểu bao

  constructor(private navCtrl: NavController, private modalCtrl: ModalController) {
    this.baoLoop();
  }

  // Hiện Modal chọn số và nhận giá trị từ biến $No trả về từ Module Modal-45.ts
  public presentModal(ballNo) {
    let modal = this.modalCtrl.create(Modal45, { ball: ballNo });
    modal.onDidDismiss(No => {
      console.log(No);
    });
    modal.present();
  }

  // Thêm vào mảng bao các giá trị từ 5 => 18 tương ứng với các kiểu bao số
  public baoLoop() {
    let i: number = 5;
    for (i = 5; i <= 18; i++ ) {
      this.bao.push(i);
    }
  }

  public onChangeBao(newValue) {
    console.log(newValue);
    this.selectBao = newValue;
  }

  public onChangeKyXo(value) {
    console.log(value);
  }
 
}
