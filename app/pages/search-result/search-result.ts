import {Component} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {DatePicker} from 'ionic-native';
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
  public selectedDate: any;


  constructor(private navCtrl: NavController, private http: Http, private loadingCtrl: LoadingController) {
    let date = new Date();
    this.curentDate = date.getFullYear().toString() + this.formatNumber((date.getMonth() + 1).toString()) + this.formatNumber(date.getDate().toString()); //Format lại định dạng ngày tháng
    this.getDefaulResult();
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

  public selectDateResult(value) {
    let loader = this.loadingCtrl.create({
        content: "Đang tải...",
    });
    loader.present();

    
    let date = new Date(value);
    let dateStr = date.getFullYear().toString() + this.formatNumber((date.getMonth() + 1).toString()) + this.formatNumber(date.getDate().toString()); //Format lại định dạng ngày tháng
    console.log(dateStr);
  
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
      loader.dismiss();
    }
    );

   

  }
}
