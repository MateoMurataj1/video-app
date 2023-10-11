import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideosService } from 'src/app/services/videos.service';
import { SnapshotModel } from 'src/app/models/snapshotModel';
import { StarModel } from 'src/app/models/starModel';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit {

  videoId!: number;
  video: any;
  user: any;
  isUserOwner: boolean = false;
  isTitleChanged: boolean = false;
  reactions: any;
  @ViewChild('myVideo') myVideo!: ElementRef;
  currentTimestamp: number = 0;
  snapshotData: SnapshotModel = {
    id: undefined,
    videoId: undefined,
    type: '',
    timeframe: undefined,
    dataUri: ''
  };
  starData: StarModel = {
    id: undefined,
    videoId: undefined,
    type: '',
    timeframe: undefined
  };

  constructor(private route: ActivatedRoute, public videoService: VideosService) {}
  
  ngOnInit(): void {

    this.videoService.getSelfUser().subscribe((data: any) => {
      this.user = data[0];
    });

    this.route.params.subscribe((params) => {
      this.videoId = params['videoId'];

      this.videoService.getVideoById(this.videoId).subscribe((videos: any) => {
        this.video = videos;
        
        videos.users.forEach((element: any) => {
          if(element == this.user?.id){
            this.isUserOwner = true;
          }
        });

      });

      this.videoService.getReactions(this.videoId).subscribe((reactions: any) => {
        this.reactions = reactions.filter((reaction: any) => reaction.videoId == this.videoId).reverse();
      });

    })
  }

  onInputChange(videotitle: any){
    if(videotitle != this.video?.title){
      this.isTitleChanged = true;
    }
    else
      this.isTitleChanged = false;
  }

  saveTitle(videotitle: any){

    this.videoService.getVideoById(this.videoId).subscribe(() => {
      this.video.title = videotitle;

      this.videoService.updateVideo(this.video, this.videoId).subscribe((response) => {
        if (response) {
          this.isUserOwner = false;
        } else {
          this.isUserOwner = true;
        }
      });
    })
  }

  onVideoTimeUpdate(event: any) {
    this.currentTimestamp = this.myVideo.nativeElement.currentTime;
  }

  snapshotVideo() {
    console.log(this.currentTimestamp, "crureent");
    console.log(this.videoId, "videoId")

    this.snapshotData.id = Math.random();
    this.snapshotData.videoId = this.videoId;
    this.snapshotData.type = "snapshot";
    this.snapshotData.timeframe = this.currentTimestamp;
    this.snapshotData.dataUri = "dataaaa"

    this.videoService.saveReaction(this.snapshotData, this.videoId).subscribe(res =>{
      this.videoService.getReactions(this.videoId).subscribe((reactions: any) => {
        this.reactions = reactions.filter((reaction: any) => reaction.videoId == this.videoId).reverse();
      });
    })
  }

  starVideo() {

    console.log(this.currentTimestamp, "crureent")
    this.starData.id = Math.random();
    this.starData.videoId = this.videoId;
    this.starData.type = "star";
    this.starData.timeframe = this.currentTimestamp;

    this.videoService.saveReaction(this.starData, this.videoId).subscribe(res =>{
      this.videoService.getReactions(this.videoId).subscribe((reactions: any) => {
        this.reactions = reactions.filter((reaction: any) => reaction.videoId == this.videoId).reverse();
      });
    })

  }

  reactionTimeframe(reaction: any){
    const videoElement: HTMLVideoElement = this.myVideo.nativeElement;
    if (videoElement) {
      videoElement.currentTime = reaction.timeframe;
    }  
  }

}
