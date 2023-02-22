import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ProductInfo } from '../../Interface/data-type';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  modeel: boolean = false
  productId: any;
  product: any;
  baseURL = environment.Imageurl
  Qty: any
  viewImage: number;
  constructor(private api: ApiService, private activeRoute: ActivatedRoute) {
    this.viewImage = 0;
  }
  ngOnInit() {
    this.activeRoute.params.subscribe((params: any) => {
      this.productId = params.id
    })
    this.getproduct()
  }

  getproduct() {
    this.api.product(this.productId).subscribe((res: any) => {
      this.product = res
    })
  }
  setqnt(e: any) {
    this.Qty = e.target.value
    console.log(this.Qty);

  }
  addtocart(data: any) {
    let userid: any = localStorage.getItem("userData")
    let cart = {
      userId: JSON.parse(userid)._id,
      productId: data._id,
      quantity: 1,
    }
    this.api.gettocart(JSON.parse(userid)._id).subscribe((res: any) => {
      let dat = res.data.filter((d: any) => d.productId == data._id)
      if (dat.length) {
        this.api.addtocart({ quantity: dat[0].qty + 1 }, dat[0]._id).subscribe((res: any) => { })
      } else { }
    })
  }
  buye(product: any) {
    console.log(product, this.Qty);
    if (this.Qty > 1) {
      product.quantity = this.Qty
      this.modeel = true
    }
    else {
      product.quantity = 1
      this.modeel = true
    }
    console.log(this.modeel);

  }
  close() {
    this.modeel = false

  }
}
