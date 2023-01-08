import { Component } from '@angular/core';
import {ApiService} from '../../service/api.service';
import{ProductInfo} from '../../Interface/data-type';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productId: any;
  product: any;
  baseURL = environment.Imageurl
  viewImage: number;

  constructor(private api: ApiService, private activeRoute: ActivatedRoute) {
    this.viewImage = 0;
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params:any) => {
      this.productId = params.id
    })
    this.getproduct()
  }
  getproduct() {
    this.api.product(this.productId).subscribe((res:any) => {
      this.product = res
    })
  }




}
