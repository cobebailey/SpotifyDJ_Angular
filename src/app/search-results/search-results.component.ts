import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnChanges {
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    //searchObjectChild's value is recieved from AppComponent, and on changes it stores the new searchObject
    if (this.searchObjectChild) {
      this.setPlaylists(this.searchObjectChild);
      if (this.playlists) {
        console.log(this.playlists[0]);
      }
    }
  }
  //FIELDS
  @Input() searchObjectChild = {};
  playlists = [];
  //METHODS
  async setPlaylists(searchObject: any) {
    this.playlists = searchObject.playlists?.items;
    console.log(searchObject);
  }
}
