import { Component } from "@angular/core";
import { FormControl, Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from "src/app/service/api.service";
import { environment } from "../../../environments/environment";
@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent {
  username: FormGroup | any
  userupdate: FormGroup | any
  sta: any;
  states: any;
  imageURl = environment.Imageurl;

  constructor(private service: ApiService, private route: Router, private fb: FormBuilder, private api: ApiService, private spiner: NgxSpinnerService) {
    this.service.getorder(this.userdata._id).subscribe((res: any) => {
      this.orders = res.data;
      console.log(res.result);
    });
    this.service.getimentbook(this.userdata._id).subscribe((res: any) => {
      this.servicebook = res.data;
      console.log(res.result);
    })
    this.api.getState().subscribe((res: any) => {
      // for (let index = 0; index < 34; index++) {
      //   const element = array[index];

      // }
      this.sta = res;
      this.states = Object.keys(res);
      console.log(this.states);

    });

    this.userupdate = this.fb.group({
      userImage: new FormControl("", [Validators.required]),
      username: new FormControl(this.userdata?.username, [Validators.required]),
      email: new FormControl(this.userdata?.email, [Validators.required]),
      phone: new FormControl(this.userdata?.phone, [Validators.required]),
      address: new FormControl(this.userdata?.address, [Validators.required]),
      zender: new FormControl(this.userdata?.zender, [Validators.required]),
      city: new FormControl(this.userdata?.city, [Validators.required]),
      state: new FormControl(this.userdata?.state, [Validators.required]),
      zip: new FormControl(this.userdata?.zip, [Validators.required]),
    })
  }
  fild: any = false
  userdata: any = JSON.parse(localStorage.getItem("userData") + "");
  orders: any;
  servicebook: any;
  prod: any = true;
  file: any;
  city: any;

  fileHendler(e: any) {
    let file = e.target.files[0]
    this.file = file
    this.userupdate.controls['userImage'].setValue(this.file)
  }
  submit() {

    this.spiner.show()
    console.log(this.userupdate.value);
    console.log(this.userupdate.controls['zender'].value);
    // formdata.set('data',this.userupdate.)


    this.api.userupdate(this.userupdate.value, this.userdata._id).subscribe((res: any) => {
      if (res.response = 'success') {
        console.log(res);
        this.api.getuser(this.userdata._id).subscribe((res: any) => {
          if (res.response = 'success') {
            localStorage.setItem('userData', JSON.stringify(res))
            this.userdata = JSON.parse(localStorage.getItem("userData") + "");
    document.getElementById("close")!.click();


          } else {
          }
        })
        this.spiner.hide()
      } else {
        this.spiner.hide()
      }
    })

    this.spiner.hide()
  }

  product() {
    this.prod = true;
  }
  servicee() {
    this.prod = false;
  }
  navigate(item: any) {
    this.route.navigate(['/view/' + item.productId]);
  }
  updateProfile() {
    this.fild = true
  }
  setState(e: any) {
    const state = e.target.value;

    this.city = this.sta[state];
    console.log(this.city);

  }
}
