import { Component } from '@angular/core';
import {
  Plugins
} from '@capacitor/core';

@Component({
  selector: 'login',
  template: '<button (click)="onOAuthBtnClick()">Login with OAuth</button>' +
   '<button (click)="onOAuthRefreshBtnClick()">Refresh token</button>' +
   '<button (click)="onLogoutClick()">Logout OAuth</button>'
})
export class LoginComponent {

  oauth2Options = {
    appId: 'APP_ID_GOES_HERE',
    authorizationBaseUrl: 'https://some.website/o/authorize',
    accessTokenEndpoint: 'https://some.website/o/token',
    responseType: 'code',
    pkceEnable: true,
    web: {
      redirectUrl: 'http://localhost:8100/auth'
    },
    android: {
      pkceEnabled: true,
      responseType: 'code',
      redirectUrl: 'uk.ac.standrews.fishing://oauth/redirect',
      handleResultOnNewIntent: true,
      handleResultOnActivityResult: true
    },
    ios: {
      pkceEnabled: true,
      responseType: 'code',
      redirectUrl: 'uk.ac.standrews.fishing://oauth/redirect',
    }
  };

  refreshToken: string;

  onOAuthBtnClick() {
    Plugins.OAuth2Client.authenticate(
      this.oauth2Options
    ).then(response => {
      let accessToken = response["access_token"];
      this.refreshToken = response["refresh_token"];

      // only if you include a resourceUrl protected user values are included in the response!
      let oauthUserId = response["id"];
      let name = response["name"];

      // go to backend
    }).catch(reason => {
      console.error("OAuth rejected", reason);
    });
  }

  // Refreshing tokens only works on iOS/Android for now
  onOAuthRefreshBtnClick() {
    if (!this.refreshToken) {
      console.error("No refresh token found. Log in with OAuth first.");
    }

    Plugins.OAuth2Client.refreshToken(
      Plugins.OAuth2Client.oauth2RefreshOptions
    ).then(response => {
      let accessToken = response["access_token"];
      // Don't forget to store the new refresh token as well!
      this.refreshToken = response["refresh_token"];
      // Go to backend
    }).catch(reason => {
      console.error("Refreshing token failed", reason);
    });
  }

  onLogoutClick() {
    Plugins.OAuth2Client.logout(
      Plugins.OAuth2Client.oauth2Options
    ).then(() => {
      // do something
    }).catch(reason => {
      console.error("OAuth logout failed", reason);
    });
  }
}
