import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

import { registerWebPlugin } from "@capacitor/core";
import { OAuth2Client } from "@byteowls/capacitor-oauth2";

declare var window;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    console.log("Register custom capacitor plugins");
    registerWebPlugin(OAuth2Client);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setupDb();
    });
  }

  setupDb() {
//    let db = window.sqlitePlugin.openDatabase({
//      name: 'my.db',
//      location: 'default'
//    });
  }
}
