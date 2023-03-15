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
  constructor(private api: ApiService, private route: Router) {}
  product() {
    this.prod = true;
  }
  service() {
    this.prod = false;
  }
  serch() {
    this.searchShow = true;
    console.log(this.searchShow);
  }
  search(item: any) {
    this.route.navigate(["product/serch/" + item.value]);
    console.log(item.value);
  }
}
