// Base import
import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

// Page Import
import {TabsPage} from './pages/tabs/tabs';

@Component({
	template: '<ion-nav [root]="rootPage"></ion-nav>'
})

export class MyApp {

	private rootPage: any;

	constructor(private platform: Platform) {
		this.rootPage = TabsPage;
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.overlaysWebView(true); // let status var overlay webview
			StatusBar.backgroundColorByHexString('#B71C1C');
		});
	}
}

ionicBootstrap(MyApp, [], {
	modalEnter: 'modal-slide-in',
	modalLeave: 'modal-slide-out',
	tabsHighlight: true,
	platforms: {
		ios: {
			tabsPlacement: 'top',
			iconMode: 'ios',
			pageTransition: 'ios',
			activator: "highlight",
		},
		android: {
			tabsPlacement: 'top',
			tabsLayout: "icon-top",
			iconMode: 'md',
			pageTransition: 'android',
			activator: "ripple",
		}
	}
});
