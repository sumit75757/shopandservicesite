import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ProductInfo } from '../../Interface/data-type';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  posts: ProductInfo[] = [];
  prod: any = true
  constructor(private api: ApiService) {
  }
  product() {
    this.prod = true
  }
  service() {
    this.prod = false
  }
}
