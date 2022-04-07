import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { filter, take, map } from 'rxjs/operators';
import { AuthenticationService } from './@core/services/authentication.service';
import { ROUTER_UTILS } from './@core/utils/router.utils';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isAuthenticate: boolean;

  public appPages = [
    { title: 'Profile', url: '/folder/Inbox', icon: 'person' },
    { title: 'History', url: '/rent', icon: 'paper-plane' },
    { title: 'Promo Code', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Help', url: '/folder/Archived', icon: 'archive' }
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private authService: AuthenticationService,
     private router: Router,
     public menuCtrl: MenuController
     ) {
    this.authService.isLoggedIn().then(val =>{
      if(val)
      {
        this.isAuthenticate = true;
      }
      this.isAuthenticate = false;
    });


  }
  ngOnInit() {
  }
  logout(){
    this.authService.logout().then(x => {
      this.menuCtrl.enable(false);
      this.router.navigateByUrl(`/${ROUTER_UTILS.config.auth.login}`, {replaceUrl: true});
    });
  }
}
