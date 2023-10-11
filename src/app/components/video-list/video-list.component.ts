import { Component, OnInit } from '@angular/core';
import { VideosService } from 'src/app/services/videos.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {

  videos!: any;
  toggleId = 1;
  user: any;
  imageUrl='images/video-preview.png'

  constructor(private videoService: VideosService) { }

  ngOnInit(): void {

    this.videoService.getSelfUser().subscribe((data: any) => {
      this.user = data[0];
    });

    this.videoService.getVideos().subscribe(data => {
      this.videos = data;

    })
  }

  toggleButtonGrid(){
    this.toggleId = 1;
  }
  
  toggleButtonList(){
    this.toggleId = 2;
  }
}
