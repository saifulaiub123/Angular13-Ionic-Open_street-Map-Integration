import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FcmService } from '../@core/services/fcm.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public slideOpts = {
    initialSlide: 1,
    speed: 400,
    loop: true,autoplay: {
      delay: 4000,
      disableOnInteraction: true,
    }
  };

  constructor(private activatedRoute: ActivatedRoute, private fcmService: FcmService) {
    this.fcmService.initPush();
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
