import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { StatusBar } from '@ionic-native/status-bar';
import { MenuController, Platform } from '@ionic/angular';
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

  public groupItems = [
    {
      item : {
      name : 'Account',
      data : [{
        title: 'Profile',
         url: '/folder/Inbox',
          icon: 'person'
      },
      {
        title: 'Profile',
         url: '/rent-car',
          icon: 'person'
      }]
    }},
    {
      item : {
      name : 'Offers',
      data : [{
        title: 'Promo Code', url: '/folder/Favorites', icon: 'heart'
      }]
    }},
    {
      item : {
      name : 'Settings',
      data : [{
        title: 'History', url: '/rent', icon: 'paper-plane'
      }]
    }},
    {
      item : {
      name : 'Support',
      data : [{
        title: 'Help', url: '/folder/Archived', icon: 'archive'
      }]
    }}
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private authService: AuthenticationService,
     private router: Router,
     private menuCtrl: MenuController,
    //  private statusBar: StatusBar,
     private platform: Platform
     ) {
       this.platform.ready().then(() =>{
         console.log('Platform ready');
       });
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
