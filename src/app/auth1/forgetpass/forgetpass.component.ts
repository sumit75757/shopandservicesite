import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent {
  constructor(private auth: ApiService, private route: Router) {

  }
  data = {
    email: '',
    otp: '',
    password:''
  }
  showinput = false
  otp: any = false;
  sendotp() {
    console.log(this.data);
    let obj = {
      email: this.data.email
    }
    this.auth.otp(obj).subscribe((res: any) => {
      this.otp = true
    })
  }

  veryfy() {
    this.auth.veryfyotp(this.data.otp).subscribe((res: any) => {
      if (res) {
        this.showinput = true;
      }
    },
      (err: any) => {
      })
  }
  updatepass(){debugger
    if (this.data.password != ' ' && this.data.password!=null && this.data.password != "") {
      this.auth.forgot(this.data).subscribe((res: any) => {
        Swal.fire('Success!', 'Password Updateed ', 'success');
        this.route.navigate(['/auth']);
      })
    }
  }
}
