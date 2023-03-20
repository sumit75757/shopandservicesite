import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  constructor(private auth: ApiService, private fb: FormBuilder, private route: Router) { }
  singin: any = false
  ngOnInit() {
    let userdata: any = localStorage.getItem("userData")
    let otp: any = localStorage.getItem("otp")
    this.otp = false;
    this.btnhidde = false;
    if (userdata && (otp == null || otp == false)) {
      this.resend(JSON.parse(userdata).email)
    }
  }
  otp: boolean = false;
  btnhidde: any = true;
  userdata: any;
  //signup:any;
  singupForm = this.fb.group({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    character: new FormControl('User', [Validators.required]),
    otp: new FormControl('', [Validators.required])
  })
  async singup() {
    if (!this.singin) {
      this.auth.loginin(this.singupForm.value)
        .subscribe((res: any) => {
          if (res.response.respons == "succses" && res.response.user) {
            this.otp = true;
            this.btnhidde = false;
            this.userdata = res.useData;
            ////get otp api
            let email = { email: this.userdata.email };
            this.auth.otp(email).subscribe((res: any) => {
            });
            localStorage.setItem('token', res.token);
            localStorage.setItem('userData', JSON.stringify(res.useData));
            //this.signinForm.addControl(  "otp", new FormControl('',[Validators.required]) )
            // this.route.navigate(['/'])
          }
        })
    } else {
      this.auth.singup(this.singupForm.value)
        .subscribe((res: any) => {
          if (res.response.respons == "succses" && res.response.user) {
            this.otp = true;
            this.btnhidde = false;
            this.userdata = res.useData;
            ////get otp api
            let email = { email: this.userdata.email };
            this.auth.otp(email).subscribe((res: any) => {
            });
            localStorage.setItem('token', res.token);
            localStorage.setItem('userData', JSON.stringify(res.useData));
            //this.signinForm.addControl(  "otp", new FormControl('',[Validators.required]) )
            // this.route.navigate(['/'])
          }
        })
    }
  }
  toggle() {
    this.singin = this.singin ? false : true
  }
  resend(email: any) {
    let obj = {
      email: email
    }
    this.auth.otp(obj).subscribe((res: any) => {
    })
  }
  sendOtp() {
    this.auth.veryfyotp(this.singupForm.controls["otp"].value).subscribe((res: any) => {
      if (res) {
        localStorage.setItem("otp", "true")
        this.route.navigate(['/'])
      }
    },
      (err: any) => {
      })
  }
  forgotpass(){
    this.route.navigate(['/forgote-password'])

  }
}
// function res(res: any) {
//   throw new Error('Function not implemented.');
// }
