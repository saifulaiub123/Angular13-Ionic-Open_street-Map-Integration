import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MapComponent } from 'src/app/component/map/map.component';

@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.page.html',
  styleUrls: ['./rent-car.page.scss'],
})
export class RentCarPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack()
  {
    this.navCtrl.back();
  }
}
