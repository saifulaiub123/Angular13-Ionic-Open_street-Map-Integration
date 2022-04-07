import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Storage } from '@capacitor/storage';

export const INTRO_KEY = 'intro-seen';



@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {

  constructor(private router: Router){ }

  async canLoad(): Promise<boolean>{
    const hasIntroSeen = await Storage.get({key : INTRO_KEY});

    if(hasIntroSeen && (hasIntroSeen.value === 'true'))
    {
      return true;
    }
    else
    {
      this.router.navigateByUrl('/intro',{ replaceUrl : true });
      return true;
    }
    return true;
  }
}
