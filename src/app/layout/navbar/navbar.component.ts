import {
  Component
} from '@angular/core';
import {
  ApiService
} from 'src/app/service/api.service'; @Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cartItem: any
  constructor(private api: ApiService) {
    let data: any = localStorage.getItem("userData")
    if (data) {
      api.gettocart(JSON.parse(data)._id).subscribe((res: any) => {
        this.cartItem = res.count
        if (res.count > 9) this.cartItem = "9+"
        if (res.count == 0) this.cartItem = "0"
      }, (err: any) => {
        console.log(err);
      })
    }
  }
}
