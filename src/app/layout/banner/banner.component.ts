import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  @Input() data: any;
  img: any[] =  []
  constructor() {
    console.log(this.data);

    setTimeout(() => {
      if (this.data) {
        this.img = [
          "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/f6bbfa120767719.60b8196525cf4.jpg",
          "https://img.freepik.com/free-vector/sale-banner-with-product-description_1361-1333.jpg?w=2000",
          "https://i.pinimg.com/originals/f7/06/49/f706494e21b13eea7001df5fadc003be.jpg"
        ]
      } else {
        this.img = [
          "https://res.cloudinary.com/urbanclap/image/upload/images/growth/home-screen/1615375782838-f890f8.jpeg",
          "https://thumbs.dreamstime.com/b/ac-electrician-technician-repairing-air-conditioner-ac-electrician-technician-repairing-air-conditioner-appliance-228373389.jpg",
          "https://media.istockphoto.com/id/1163753970/photo/hes-always-ready-to-help.jpg?s=612x612&w=0&k=20&c=qQ5U2x-swbC8Rou_S5qXdQiHht8LvnRstZ224sWceoE="
        ]

      }
    }, 2000);
  }
}
