import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { PlaylistContainerComponent } from './playlist-container/playlist-container.component';
import { TracklistComponent } from './playlist-container/tracklist/tracklist.component';
import { SearchItemComponent } from './search-results/search-item/search-item.component';
import { PreviewComponent } from './playlist-container/preview/preview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
//import { SearchSpotifyService } from './search-spotify.service';
import { CallApiService } from 'src/coremodule/call-api.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchResultsComponent,
    PlaylistContainerComponent,
    TracklistComponent,
    SearchItemComponent,
    PreviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [CallApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
