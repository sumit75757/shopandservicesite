import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ToastrService } from 'ngx-toastr'; import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  userdata: any;
  cartdata: any;
  total: any = 0;
  baseURl: any = environment.Imageurl
  constructor(private api: ApiService, private tosty: ToastrService) {
    this.userdata = localStorage.getItem("userData")
    this.getcart()
  }
  getcart() {
    let userid: any = JSON.parse(localStorage.getItem("userData") + '')._id
    this.api.gettocart(userid).subscribe((res: any) => {
      this.cartdata = res.data
      this.cartdata.forEach((element: any) => {
        this.total += (element.qty == 1 ? element.price : element.price * element.qty)
        console.log(this.total, element.qty);
      });
    }, (err: any) => {
    })
  }
  removecart(id: any) {
    this.api.rmovecart(id).subscribe((res: any) => {
      this.getcart()
      this.tosty.warning("From Cart", "Remove")
    }, (err: any) => {
      this.tosty.error("Something Wrong")
    })
  }
}
