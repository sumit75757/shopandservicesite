import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Route, Router } from "@angular/router";
import { ApiService } from "src/app/service/api.service";
@Component({
  selector: "app-catgorynav",
  templateUrl: "./catgorynav.component.html",
  styleUrls: ["./catgorynav.component.css"],
})
export class CatgorynavComponent {
  @Input() data: any;
  catogory: any;
  searchShow:any =false
  constructor(private api: ApiService, private route: Router) {
    

  }
  ngOnInit() {
    if (this.data == true) {
      this.api.catogory().subscribe((res: any) => {
        this.catogory = res.data;
      });
    } else {
      this.api.servicecat().subscribe((res: any) => {
        this.catogory = res.data;
      });
    }
    if (localStorage.getItem("product") == "false") {
      console.log(this.searchShow);
      this.searchShow = false;
      localStorage.removeItem("product/serch");
    }
    else{
      this.searchShow = true
    }
    // this.searchShow = localStorage.getItem("product")
    console.log(this.searchShow);
  }
  navigate(cat: any) {
    if (this.data) {
      this.route.navigate(["product/" + cat]);
    }else{
      this.route.navigate(["services/" + cat]);
    }
  }
  serchshow() {
    this.searchShow =this.searchShow ? false:true;
    console.log(this.searchShow);
    
    localStorage.setItem("product",this.searchShow)
    if (this.searchShow == false) {
      localStorage.removeItem("product/serch");
      
    }
    
  }
}
