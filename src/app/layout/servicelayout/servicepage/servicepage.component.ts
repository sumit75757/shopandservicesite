import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { environment } from "../../../../environments/environment";
@Component({
  selector: 'app-servicepage',
  templateUrl: './servicepage.component.html',
  styleUrls: ['./servicepage.component.css']
})
export class ServicepageComponent {
  userservice: any
  baseURL = environment.Imageurl
  constructor(private service: ApiService, private activeRoute: ActivatedRoute) {
    activeRoute.params.subscribe((res: any) => {
      this.service.service("62cd758ef1649b074279f99e").subscribe((res: any) => {
        this.userservice = res.result
        console.log(res);
      })
    })
  }

  ngOnInit() {

  }
}
