import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './@core/gurds/auth.guard';
import { AutologinGuard } from './@core/gurds/autologin.guard';
import { IntroGuard } from './@core/gurds/intro.guard';
import { ROUTER_UTILS } from './@core/utils/router.utils';

const routes: Routes = [
  {
    path: ROUTER_UTILS.config.auth.login,
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canLoad : [IntroGuard, AutologinGuard]
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canLoad : [AuthGuard]
  },
  {
    path: 'rent',
    loadChildren: () => import('./pages/rent/rent.module').then( m => m.RentPageModule),
    canLoad : [AuthGuard]
  },
  {
    path: ROUTER_UTILS.config.base.intro,
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: '',
    redirectTo: ROUTER_UTILS.config.auth.login,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
