import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SearchResult} from '../search-result/search-result';
import {Toast} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/result/result.html'
})
export class Result {
  constructor(private navCtrl: NavController) {
    
  }

  public resultSearch() {
    this.navCtrl.push(SearchResult);
  }

  public resultSearchMaxCommingSoon() {
    Toast.show("Tính năng này đang được phát triển", '2000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
}
