import { Component, OnInit } from '@angular/core';
import { VideosService } from 'src/app/services/videos.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: any;

  constructor(private videoService: VideosService) {}

  ngOnInit(): void {

    this.videoService.getSelfUser().subscribe((data: any) => {
      this.user = data[0];
    })
  }
}
