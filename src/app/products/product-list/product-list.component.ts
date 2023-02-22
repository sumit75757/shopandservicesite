import {
  Component
} from '@angular/core';
import {
  ApiService
} from '../../service/api.service';
import {
  OwlOptions
} from 'ngx-owl-carousel-o';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  ToastrService
} from 'ngx-toastr';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  productdetails: any;
  service: any
  imgeurl = "http://localhost:4000"
  recomendedpro = JSON.parse(localStorage.getItem("recomnded") + '')
  constructor(private api: ApiService, private activeroute: ActivatedRoute, private route: Router, private tosty: ToastrService, private spiner: NgxSpinnerService) {
    this.getprod()
    this.getservice()
  }
  navigate(data: any) {
    this.getrecomndedprod(data)
    this.route.navigate(['view/' + data._id])
  }
  getprod() {
    this.spiner.show()
    this.api.product().subscribe((data: any) => {
      this.productdetails = data.data.filter((d: any) => d.onhome == true)
      this.spiner.hide()
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
    animateIn: true,
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
        this.api.addtocart({
          quantity: dat[0].qty + 1
        }, dat[0]._id).subscribe((res: any) => {
          this.tosty.success("Add to Cart")
        })
      } else {
        this.api.addtocart(cart).subscribe((res: any) => {
          this.tosty.success("Add to Cart")
        })
      }
    })
  }
  getrecomndedprod(data: any) {
    let arr: any[] = []
    let dataa = JSON.parse(localStorage.getItem("recomnded") + '')

    if (dataa) {
      arr = dataa
      console.log(arr);
      let dat = arr.filter((d: any) => d._id == data._id)
      if (dat.length) {
        return;
      } else {
        arr.push(data)
        localStorage.setItem("recomnded", JSON.stringify(arr))
      }
    } else {

      localStorage.setItem("recomnded", JSON.stringify([data]))


    }
  }
}