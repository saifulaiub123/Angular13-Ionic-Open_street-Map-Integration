import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
import { INTRO_KEY } from 'src/app/@core/gurds/intro.guard';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  next()
  {
    this.slides.slideNext();

  }
  prev()
  {
    this.slides.slideNext();
    this.slides.slidePrev();
  }

  async start()
  {
    await Storage.set({key : INTRO_KEY, value : 'true'});
    this.router.navigateByUrl('/login', {replaceUrl : true});
  }

}
