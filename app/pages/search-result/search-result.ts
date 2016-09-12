import {Component} from '@angular/core';
import {NavController, LoadingController, Platform} from 'ionic-angular';
import {DatePicker, Toast} from 'ionic-native';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  templateUrl: 'build/pages/search-result/search-result.html'
})
export class SearchResult {

  private curentDate: string;

  public searchResultJackpot: Array<any> = [];
  public returnResult: Array<any> = [];

  public prizeResult: Array<any> = [];
  public returnprizeResult: Array<any> = [];

  public showNewestResult: boolean = true;
  public selectedDate: string = '';


  constructor(private navCtrl: NavController, private http: Http, private loadingCtrl: LoadingController, private platform: Platform) {
    let date = new Date();
    this.curentDate = date.getFullYear().toString() + this.formatNumber((date.getMonth() + 1).toString()) + this.formatNumber(date.getDate().toString()); //Format lại định dạng ngày tháng
    this.getDefaulResult();
  }

  // Hàm format định dạng số
  public formatNumber(s) {
    if (s.toString().length < 2) {
      s = "0" + s;
      return s;
    } else {
      return s;
    }
  }

  public nativeDatePicker() {
    this.platform.ready().then(() => {
      DatePicker.show({
        date: new Date(),
        mode: 'date',
        titleText: 'Chọn kỳ',
        okText: 'Chọn',
        cancelText: 'Thoát',
        androidTheme: 5,
        minDate: new Date('2016-07-25'),
        maxDate: new Date()
      }).then(
        (date) => {
          this.selectedDate = date.getFullYear().toString() + ' - ' +  this.formatNumber((date.getMonth() + 1).toString()) + ' - ' + this.formatNumber(date.getDate().toString());
          let loader = this.loadingCtrl.create({
            content: "Đang tải...",
          });
          loader.present();

          let dateStr = date.getFullYear().toString() + this.formatNumber((date.getMonth() + 1).toString()) + this.formatNumber(date.getDate().toString()); //Format lại định dạng ngày tháng
          // console.log(dateStr);
          this.http.get('http://loto.halogi.com/result?date=' + dateStr).map(res => res.json()).subscribe(
            (data) => {
      
              this.returnResult = []; // Xóa mảng kết quả trả về trước khi truyền vào dữ liệu mới
              this.returnprizeResult = []; // Xóa mảng ball kết quả trả về trước khi truyền vào dữ liệu mới
      
              this.showNewestResult = true;
      
              this.returnResult.push(data); // Truyền vào dữ liệu mới dựa trên ngày tháng lấy được vào mảng
              data.jackpot.split(",").forEach(i => {
                this.returnprizeResult.push(this.formatNumber(i));  // Format lại định dạng số trả về và truyền dữ liệu mới vào mảng
              });
      
              this.showNewestResult = false;
      
              loader.dismiss();
            },
            (error) => {
              console.log(error);
              Toast.show('Không có kết quả quay số cho ngày này', '3000', 'center').subscribe(
                toast => {
                  console.log(toast);
                }
              );
              loader.dismiss();
            }
          );
        },
        (err) => {
          console.log("Error occurred while getting date:", err);
        }
      );
    })
  }

  public getDefaulResult() {
    this.http.get('http://loto.halogi.com/result?date=' + this.curentDate).map(res => res.json()).subscribe(
      (data) => {
        this.searchResultJackpot.push(data);
        data.jackpot.split(",").forEach(i => {
          this.prizeResult.push(this.formatNumber(i));  // Format lại định dạng số trả về
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
