import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Event } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  //Event emitter for passing search results to main app
  @Output() newItemEvent = new EventEmitter<string>();
  //variables
  sdkToken =
    'BQCfBfPt2KOhsOM8qQgCnJ0KVTWCyVBSewosedtk6oZy3lqIM_MddwgmVDEX-2RZZrdgRnl6nl0I5ZuDc4709QBaPtfWyXnfq7GkXAQ44K-vdJCWqdSS_OL47e7ge3Q7nRMB2xVPaQPhLzLluKTpKsT41MpVjYAh3lE';
  client_id = 'daddb1d5269043a088aa8a9fe4df98c0'; // Your client id
  client_secret = '98bb3c6c23b843688b4de47902c8fdff'; // Your secret
  redirect_uri = 'http://localhost:4200';
  token = 'https://accounts.spotify.com/api/token';
  scope =
    'user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private';
  grantType = 'authorization_code';
  TIMEOUT_SEC = 10;
  //ignore
  constructor() {}
  ngOnInit(): void {}
  //methods
  async searchStringToParent(value: string) {
    this.newItemEvent.emit(value);
  }

  ///
  timeout(s: number) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  }

  async callApiAsync(url = '', method = 'GET', body = null) {
    try {
      const access_token = localStorage.getItem('access_token');
      //standard modular request to api
      const fetchPromise = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          //prettier-ignore
          'Authorization': `Bearer ${access_token}`,
        },
        body: body,
      });

      const response = await Promise.race([
        fetchPromise,
        this.timeout(this.TIMEOUT_SEC),
      ]);
      return response;
    } catch (err) {
      console.error('Credenetials expired');
      throw err;
    }
  }
  async authSpotify(event: any) {
    event.preventDefault();
    if (localStorage.getItem('access_token')) {
    }
    let code;
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${this.client_id}&response_type=code&redirect_uri=${this.redirect_uri}&scope=${this.scope}&show_dialog=false`;
    let queryString = window.location.search;
    //take code from searchbar
    if (queryString.length > 0) {
      const urlParams = new URLSearchParams(queryString);
      code = urlParams.get('code');
    }
    if (code) console.log('code acquired');
    //fetch body paramaters
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', `${code}`);
    params.append('redirect_uri', this.redirect_uri);

    await fetch('https://accounts.spotify.com/api/token ', {
      // Adding method type
      method: 'POST',

      // Adding body or contents to send
      body: params,

      // Adding headers to the request
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + btoa(this.client_id + ':' + this.client_secret),
      },
    }).then(function (response) {
      response.json().then(function (json) {
        console.log(json);
        console.log(json.access_token);
        localStorage.setItem('access_token', json.access_token);
        localStorage.setItem('refresh_token', json.refresh_token);
      });
    });
  }
}
