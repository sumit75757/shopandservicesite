import { Component } from "@angular/core";
import { ApiService } from "../../service/api.service";
import { ProductInfo } from "../../Interface/data-type";
import { Router } from "@angular/router";
@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
})
export class HomepageComponent {
  posts: ProductInfo[] = [];
  prod: any = true;
  searchShow: any = false;
  bannershow = true;
  constructor(private api: ApiService, private route: Router) {}
  product() {
    
    this.prod = true;
    console.log(this.prod);
  }
  service() {
    this.prod = false;
  }
  serch() {
    console.log(this.searchShow);
    this.searchShow = this.searchShow ? false:true;
  }
  bannershows(date: any):void {
    this.bannershow =date
}

}
