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
    path: ROUTER_UTILS.config.base.intro,
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: '',
    redirectTo: ROUTER_UTILS.config.auth.login,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'rent-car',
    loadChildren: () => import('./pages/rent-car/rent-car.module').then( m => m.RentCarPageModule)
  },
  {
    path: 'rent-truck',
    loadChildren: () => import('./pages/rent-truck/rent-truck.module').then( m => m.RentTruckPageModule)
  },
  {
    path: 'rent-wedding',
    loadChildren: () => import('./pages/rent-wedding/rent-wedding.module').then( m => m.RentWeddingPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'promo-code',
    loadChildren: () => import('./pages/promo-code/promo-code.module').then( m => m.PromoCodePageModule)
  },
  {
    path: 'offers',
    loadChildren: () => import('./pages/offers/offers.module').then( m => m.OffersPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./pages/history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'points',
    loadChildren: () => import('./pages/points/points.module').then( m => m.PointsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
