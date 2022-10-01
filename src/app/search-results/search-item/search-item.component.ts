import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent implements OnChanges {
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.playlistsChild) {
      console.log(this.playlistsChild);
    }
  }

  ngOnInit(): void {}

  @Input() playlistsChild = [];
  playlistName: string = '';

  //METHODS
  getPlaylistName(playlist: any) {
    return playlist.name;
  }

  getID(playlist: any) {
    return playlist.id;
  }

  getImage(playlist: any) {
    return playlist.images[0].url;
  }
  getOwner(playlist: any) {
    return playlist.owner.display_name;
  }

  compareId(playlist: any) {
    const id = window.location.hash.slice(1);
    return playlist.getID === id ? 'preview__link--active' : '';
  }
}
