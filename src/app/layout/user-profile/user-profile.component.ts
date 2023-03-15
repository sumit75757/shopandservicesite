import { Component } from "@angular/core";
import { ApiService } from "src/app/service/api.service";
import { environment } from "../../../environments/environment";
@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent {
  imageURl = environment.Imageurl;
  userdata: any = JSON.parse(localStorage.getItem("userData") + "");
  orders: any;
  servicebook: any;
  constructor(private service: ApiService) {
    this.service.getorder(this.userdata._id).subscribe((res: any) => {
      this.orders = res.data;
      console.log(res.result);
    });
    this.service.getimentbook(this.userdata._id).subscribe((res: any) => {
      this.servicebook = res.data;
      console.log(res.result);
    });
  }
  prod: any = true;
  product() {
    this.prod = true;
  }
  servicee() {
    this.prod = false;
  }
}
