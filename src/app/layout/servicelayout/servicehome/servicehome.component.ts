import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OwlOptions } from "ngx-owl-carousel-o";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
@Component({
  selector: "app-servicehome",
  templateUrl: "./servicehome.component.html",
  styleUrls: ["./servicehome.component.css"],
})
export class ServicehomeComponent {
  servicedata: any;
  service: any;
  modeel: any = false;
  constructor(
    private api: ApiService,
    private activeroute: ActivatedRoute,
    private route: Router,
    private tosty: ToastrService,
    private spiner: NgxSpinnerService
  ) {
    spiner.show();
    this.getservice();
  }
  imgeurl = "http://localhost:4000";

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    animateIn: true,
    navSpeed: 700,
    navText: ["<<", ">>"],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  getservice() {
    this.api.service().subscribe((data: any) => {
      this.service = data.result;
      this.spiner.hide();
    });
  }
  navigate(id: any) {
    this.route.navigate(["service", id]);
  }
  booking(data: any) {
    this.servicedata = data;
    this.modeel = true;
    console.log(this.modeel);
  }
  close() {
    this.modeel = false;
  }
  toggel(e: any) {
    console.log(e);

    this.modeel = e;
    console.log(this.modeel);
  }
}
