import { Component } from '@angular/core';
import { Router } from '@angular/router'; @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-site';
  constructor(private router: Router) {
    let otp = localStorage.getItem('otp')
    if (otp && otp == "true") {
      this.router.navigate(['/'])
    }
    else {
      this.router.navigate(['auth'])
    }
  }
}
