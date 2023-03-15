import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
@Component({
  selector: "app-list-product",
  templateUrl: "./list-product.component.html",
  styleUrls: ["./list-product.component.css"],
})
export class ListProductComponent {
  productdetails: any;
  imgeurl = "http://localhost:4000";
  constructor(
    private api: ApiService,
    private activeroute: ActivatedRoute,
    private route: Router,
    private tosty: ToastrService
  ) {
    activeroute.params.subscribe((ress: any) => {
      console.log(ress);
      if (ress.serch) {
        api.serch(ress).subscribe((res: any) => {
          this.productdetails = res;
        });
      } else {
        api.catserch(ress).subscribe((res: any) => {
          this.productdetails = res;
        });
      }
    });
  }

  navigate(data: any) {
    this.route.navigate(["view/" + data._id]);
    this.getrecomndedprod(data);
  }

  addtocart(data: any) {
    let userid: any = localStorage.getItem("userData");
    let cart = {
      userId: JSON.parse(userid)._id,
      productId: data._id,
      quantity: 1,
    };
    this.api.gettocart(JSON.parse(userid)._id).subscribe((res: any) => {
      let dat = res.data.filter((d: any) => d.productId == data._id);
      if (dat.length) {
        this.api
          .addtocart(
            {
              quantity: dat[0].qty + 1,
            },
            dat[0]._id
          )
          .subscribe((res: any) => {
            this.tosty.success("Add to Cart");
          });
      } else {
        this.api.addtocart(cart).subscribe((res: any) => {
          this.tosty.success("Add to Cart");
        });
      }
    });
  }

  getrecomndedprod(data: any) {
    let arr = [];
    arr = JSON.parse(localStorage.getItem("recomnded") + "");
    let dat = arr.filter((d: any) => d.productId == data._id);
    if (dat) {
      return;
    } else {
      arr.push(data);
      localStorage.setItem("recomnded", JSON.stringify(arr));
    }
  }
}
