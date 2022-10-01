import { Component } from '@angular/core';
import { timeout } from 'rxjs';
//import { SearchSpotifyService } from './search-spotify.service';
import { HttpClient } from '@angular/common/http';
import { CallApiService } from '../coremodule/call-api.service';
import { SearchStoreService } from '../coremodule/search-store.service';
import { Call } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //trying to outsource search spotify to a service
  constructor(
    private http: HttpClient,
    private apiService: CallApiService,
    private searchStoreService: SearchStoreService
  ) {}

  // |||||||||||| FIELDS FIELDS FIELDS FIELDS FIELDS FIELDS FIELDS |||||||||||||||||||||
  searchString: string = '';
  searchObject = {};
  playlistsObject = {};

  title = 'SpotifyDJ';

  // |||||||||||METHODS METHODS METHODS METHODS METHODS METHODS |||||||||||||||||||||||
  //
  //triggers on clicking the search button
  async storeSearch(results: string) {
    //sets searchObject to the returned object from searchStore api call
    this.searchObject = await this.searchStoreService
      .searchStore(results)
      .then((res) => {
        return res;
      });
  }
}
