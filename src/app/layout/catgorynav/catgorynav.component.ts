import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Output } from "@angular/core";
import { Route, Router } from "@angular/router";
import { ApiService } from "src/app/service/api.service";
@Component({
  selector: "app-catgorynav",
  templateUrl: "./catgorynav.component.html",
  styleUrls: ["./catgorynav.component.css"],
})
export class CatgorynavComponent {
  catogory: any;
  @Output("serch") serch: EventEmitter<any> = new EventEmitter();
  constructor(private api: ApiService, private route: Router) {
    this.api.catogory().subscribe((res: any) => {
      this.catogory = res.data;
    });
  }
  navigate(cat: any) {
    this.route.navigate(["product/" + cat]);
  }
  serchshow() {
    this.serch.emit();
  }
}
