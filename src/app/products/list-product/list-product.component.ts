import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import {ShoppingCartItem,ProductInfo} from '../../Interface/data-type';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
  productdetails :any;
  product : undefined | ProductInfo;

  imgeurl = "http://localhost:4000"
  //  data:ShoppingCartItem[] =[];

  constructor(private api: ApiService, private activeroute: ActivatedRoute ,private route : Router ) {
    activeroute.params.subscribe((res: any) => {
        api.catserch(res).subscribe((res: any) => {
          this.productdetails = res;
          // debugger
        })
    })
  }
  navigate(data:any){
    this.route.navigate(['view/'+data._id])
  }

   userid:any = localStorage.getItem("userdata") ;
   cart={
  userid:JSON.parse(this.userid)._id,
  productid : 'manisha',
  quantity : 1,

  }


  addtocart()
  {

    return this.api.addtocart(this.cart).subscribe((res:any)=>{
      console.log(res);
    })

  }
}
