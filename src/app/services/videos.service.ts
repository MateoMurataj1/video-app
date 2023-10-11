import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  private apiUrl = "http://localhost:3000/api/videos";
  private userUrl = "http://localhost:3000/api/users";
  private loggedInUrl = "http://localhost:3000/api/users/self";

  constructor(private http: HttpClient, public fb: FormBuilder) { }

  getUsers() {
    return this.http.get(this.userUrl);
  }

  getSelfUser() {
    return this.http.get(this.loggedInUrl);
  }

  getVideos() {
    return this.http.get(this.apiUrl);
  }

  getVideoById(videoId: number) {
    return this.http.get(this.apiUrl + "/" + `${videoId}`);
  }

  updateVideo(data: any, videoId: number){
    return this.http.patch(this.apiUrl + "/" + `${videoId}`, data);
  }

  getReactions(videoId: number){
    return this.http.get(this.apiUrl + "/" + `${videoId}` + "/reactions")
  }

  saveReaction(data: any, videoId: number){
    return this.http.post(this.apiUrl + "/" + `${videoId}` + "/reactions", data)
  }

}
