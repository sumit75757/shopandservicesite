import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchs: any
  @Input() data: any;

  constructor(private router: Router) {
    if (this.data) {
      this.searchs = JSON.parse(localStorage.getItem("product/serch") + '')

    } else {
      this.searchs = JSON.parse(localStorage.getItem("service/serch") + '')

    }
  }
  search() {
    if (this.data) {
      this.router.navigate(["product/serch/" + this.searchs]);
      console.log(this.searchs);
      localStorage.setItem("product/serch", JSON.stringify(this.searchs))
    } else {
      this.router.navigate(["service/serch/" + this.searchs]);
      console.log(this.searchs);
      localStorage.setItem("service/serch", JSON.stringify(this.searchs))
    }
  }
}
