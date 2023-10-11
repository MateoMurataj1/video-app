import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoListComponent } from './components/video-list/video-list.component';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';

const routes: Routes = [
  { 
    path: "",
    component: VideoListComponent,
  },
  { 
    path: "videos",
    component: VideoListComponent,
  },
  { 
    path: "videos/:videoId",
    component: VideoDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
