import { Component } from "@angular/core";
import { FormControl, Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ImageCroppedEvent, LoadedImage } from "ngx-image-cropper";
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from "src/app/service/api.service";
import Swal from "sweetalert2";
import { environment } from "../../../environments/environment";
@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent {

  file: any;
  sta: any;
  states: any;
  imageURl = environment.Imageurl;
  croppedImage: any;
  userdata: any = JSON.parse(localStorage.getItem("userData") + "");
  fild: any = false
  orders: any;
  servicebook: any;
  prod: any = true;
  city: any;
  imageChangedEvent: any

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
      this.sta = res;
      this.states = Object.keys(res);
      console.log(this.states);
    });
  }

  userupdate = this.fb.group({
    userImage: new FormControl<any>('', [Validators.required]),
    username: new FormControl(this.userdata?.username, [Validators.required]),
    email: new FormControl(this.userdata?.email, [Validators.required]),
    phone: new FormControl(this.userdata?.phone, [Validators.required]),
    address: new FormControl(this.userdata?.address, [Validators.required]),
    zender: new FormControl(this.userdata?.zender, [Validators.required]),
    city: new FormControl(this.userdata?.city, [Validators.required]),
    state: new FormControl(this.userdata?.state, [Validators.required]),
    zip: new FormControl(this.userdata?.zip, [Validators.required]),
  })
  fileHendler(e: any) {
    this.imageChangedEvent = e;
    console.log(e);
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    const fileToReturn = this.base64ToFile(
      event.base64,
      this.imageChangedEvent.target.files[0].name,
    )
    console.log(fileToReturn);
    this.file = fileToReturn;
    this.userupdate.controls['userImage'].setValue(fileToReturn)

    console.log(this.userupdate.value)

  }

  base64ToFile(data: any, filename: any) {

    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
    // console.log(image);

  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  submit() {
    this.spiner.show()
    console.log(this.userupdate.value);
    console.log(this.userupdate.controls['zender'].value);
    let formdata = new FormData();
    formdata.set('username', this.userupdate.controls['username'].value ? this.userupdate.controls['username'].value : '');
    formdata.set('email', this.userupdate.controls['email'].value ? this.userupdate.controls['email'].value : '');
    formdata.set('phone', this.userupdate.controls['phone'].value ? this.userupdate.controls['phone'].value : '');
    formdata.set('address', this.userupdate.controls['address'].value ? this.userupdate.controls['address'].value : '');
    formdata.set('city', this.userupdate.controls['city'].value ? this.userupdate.controls['city'].value : '');
    formdata.set('zip', this.userupdate.controls['zip'].value ? this.userupdate.controls['zip'].value : '');
    formdata.set('state', this.userupdate.controls['state'].value ? this.userupdate.controls['state'].value : '');
    formdata.set('zender', this.userupdate.controls['zender'].value ? this.userupdate.controls['zender'].value : '');
    formdata.append('userImage', this.userupdate.controls['userImage'].value ? this.userupdate.controls['userImage'].value : '');
    this.api.userupdate(formdata, this.userdata._id).subscribe((res: any) => {
      if (res.response = 'success') {
        console.log(res);
        this.api.getuser(this.userdata._id).subscribe((ress: any) => {
          if (res.response = 'success') {
            localStorage.setItem('userData', JSON.stringify(ress))
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
  refund(item: any) {
    console.log(item);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      showCloseButton: true,
    }).then(res => {
      if (item.payment == "COD") {
        this.api.cancelOrder(item._id, { cancel: true }).subscribe(res => {
          Swal.fire('Order Canceled !', '', 'success');

        })

      } else {

        this.api.cancelOrder(item._id, { cancel: true }).subscribe(res => {
          let data = {
            email: JSON.parse(localStorage.getItem("userData") + '').email,
            name: JSON.parse(localStorage.getItem("userData") + '').username,
            productname: item.productName,
            price: item.price
          }
          console.log(data);

          this.api.setemail(data).subscribe(res => {
            Swal.fire('Refund Success !', ' Email sented to you', 'success');
          }, (err: any) => {
            // Swal.fire('Refund Success !', ' Email sented to you', 'error');
            console.log(err);

          })
        })

      }
    }).catch(err => {
      console.log(err)
    })

  }

}
