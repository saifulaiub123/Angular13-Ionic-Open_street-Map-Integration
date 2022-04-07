import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Button } from 'protractor';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
    ) { }

    get email() {
      return this.credentials.get('email');
    }
    get password() {
      return this.credentials.get('password');
    }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
      password: ['cityslickaaa', [Validators.required, Validators.minLength(6)]],
    });
  }



  async login()
  {
    const loading = this.loadingController.create();
    (await loading).present();

    this.authService.login(this.credentials.value).subscribe(async (res)=>{
      (await loading).dismiss();
      console.log('success');
      this.router.navigateByUrl('/folder/inbox', { replaceUrl: true});
    },
    async (res)=>{
      (await loading).dismiss();
      console.log('failed');
      const alert = this.alertController.create({
        header: 'Login failed',
        message: 'Username/Password was incorrect',
        buttons: ['Ok']
      });
      (await alert).present();
    }
    );
   }
}
