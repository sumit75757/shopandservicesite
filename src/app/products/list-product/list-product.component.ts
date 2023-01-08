import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
  productdetails:any
  imgeurl = "http://localhost:4000"

  constructor(private api: ApiService, private activeroute: ActivatedRoute ,private route : Router ) {
    activeroute.params.subscribe((res: any) => {
        api.catserch(res).subscribe((res: any) => {
          this.productdetails = res   
          debugger
        })
    })
  }
  navigate(data:any){
    this.route.navigate(['view/'+data._id])
  }
}
