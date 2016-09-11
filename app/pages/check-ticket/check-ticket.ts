import {Component} from '@angular/core';
import {NavController, ModalController, LoadingController} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Modal45} from '../modal-45/modal-45';
import {DatePicker} from 'ionic-native';


@Component({
  templateUrl: 'build/pages/check-ticket/check-ticket.html'
})
export class CheckTicket {

  public bao: Array<number> = []; //Mảng chưa các kiểu đánh bao số
  public selectBao: number = 8; //Kiểu bao số mặc định

  public ballBao: Array<number> = [] //Mảng chứa số lượng bóng theo kiểu bao

  public curentDate: any;

  public selectedBall: any;

  private result: boolean = false;
  private return: any;

  constructor(private navCtrl: NavController, private modalCtrl: ModalController, public http: Http, public loadingCtrl: LoadingController) {
    this.baoLoop();
    let date = new Date();
    this.curentDate = date.getFullYear().toString() + this.formatNumber((date.getMonth() + 1).toString()) + this.formatNumber(date.getDate().toString()); //Format lại định dạng ngày tháng
  }

  // Hiện Modal chọn số và nhận giá trị từ biến $selected trả về từ Module Modal-45.ts
  public presentModal(ballNo) {
    let modal = this.modalCtrl.create(Modal45, { ballQlt: ballNo });
    modal.onDidDismiss(selected => {
      this.selectedBall = selected.selected.toString();
      console.log(this.selectedBall);
      
      let loader = this.loadingCtrl.create({
          content: "Đang tải...",
      });
      loader.present();
      this.http.get('http://loto.halogi.com/check?ticket=' + this.selectedBall + '&date=' + this.curentDate).map(res => res.json()).subscribe(
        (data) => {
          console.log(data);
          this.result = true;
          this.return = data;
          loader.dismiss();
        },
        (error) => {
          console.log(error);
          loader.dismiss();
        }
      )
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
    // console.log(newValue);
    this.selectBao = newValue;
  }

  public onChangeKyXo(value) {
    // console.log(value);
  }

  // Hàm format định dạng số
  public formatNumber(s) {
    if (s.toString().length < 2 ) {
      s = "0" + s;
      return s;
    } else {
      return s;
    }
  }
 
}
