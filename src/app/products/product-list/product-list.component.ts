import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  productdetails: any;
  service :any
  imgeurl = "http://localhost:4000"

  constructor(private api: ApiService, private activeroute: ActivatedRoute,private route :Router) {
 
        this.getprod()
    this.getservice()
  }
  navigate(data:any){
    this.route.navigate(['view/'+data._id])
  }
  getprod() {
    this.api.product().subscribe((data: any) => {
      this.productdetails = data.data.filter((d:any)=> d.onhome == true)
    })
  }
  getservice() {
    this.api.service().subscribe((data: any) => {
      this.service = data.result
    })
  }
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    animateIn : true,
    navSpeed: 700,
    navText: ["<<", '>>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  addtocart(data:any){
    this.api.product()
  }
}
