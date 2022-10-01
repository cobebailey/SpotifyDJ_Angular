import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CallApiService } from '../coremodule/call-api.service';
@Injectable({
  providedIn: 'root',
})
export class SearchStoreService {
  constructor(private http: HttpClient, private apiService: CallApiService) {}

  async searchStore(searchString: string) {
    //simply calls the standard api with the relevant endpoint
    return this.apiService.callApi(
      `https://api.spotify.com/v1/search?q=${searchString}&type=playlist&limit=45`
    );
  }
}
