import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlaylistItems, Snippet} from 'src/app/models/youtube.model'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  nextPageToken: string = ''

  constructor(private http: HttpClient) { }

  getSnippets(): Observable<Snippet[]> {
    const params = {
      part: 'snippet',
      maxResults: "12",
      playlistId: environment.playlist,
      key: environment.apiKey,
      pageToken: this.nextPageToken
    }

    return this.http.get<PlaylistItems>(`${environment.youtubeUrl}/playlistItems`, { params })
    .pipe(
      map(data=> {
        this.nextPageToken = data.nextPageToken        
        return data.items
      }),
      map(items=> items.map(item=> item.snippet))
    )
  }
}
