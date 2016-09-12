import {Component} from '@angular/core';
import {Platform, ionicBootstrap, LoadingController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform, public loadingCtrl: LoadingController) {

    let loading = this.loadingCtrl.create({
      content: "Đang tải ...",
    });

    loading.present();


    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.overlaysWebView(true); // let status var overlay webview
      StatusBar.backgroundColorByHexString('#B71C1C');
      
      loading.dismiss();

    });
  }
}

ionicBootstrap(MyApp, [], {
  modalEnter: 'modal-slide-in',
  modalLeave: 'modal-slide-out',
  tabsHighlight: true,
  platforms: {
    ios: {
      tabsPlacement: 'bottom',
      iconMode: 'ios',
      pageTransition: 'ios',
      activator: "highlight",
    },
    android: {
      tabsPlacement: 'bottom',
      tabsLayout: "icon-top",
      iconMode: 'md',
      pageTransition: 'android',
      activator: "ripple",
    }
  }
});
