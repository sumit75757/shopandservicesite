import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
declare var Razorpay: any
@Component({
  selector: 'app-buying',
  templateUrl: './buying.component.html',
  styleUrls: ['./buying.component.css']
})

export class BuyingComponent implements OnInit {
  @Input() product: any
  sta: any;
  paymentID: any;
  constructor(private service: ApiService, private fb: FormBuilder, private toastr: ToastrService, private spinner: NgxSpinnerService,
    private cd: ChangeDetectorRef) {
    console.log(this.product);


  }



  state: any
  city: any
  userdata = JSON.parse(localStorage.getItem("userData") + '')
  address = this.fb.group({
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required]),
  });
  tabIndex = 0



  razorPayOptions: any = {
    "key": "rzp_test_aEuup9ULohHsIp",
    "amount": "",
    "name": "Shop&Service",
    "order_id": "",
    "description": "Load Wallet",
    "image": "https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg",
    "prefill": {
      "name": "Shop&Service",
      "email": "shopandservice@gmail.com",
      "contact": "",
      "method": ""
    },
    "handler": (response: any) => {
      console.log(response);
      this.responhendel(response)

    },
    "modal": {
      "ondismiss": function () {
        if (confirm("Are you sure, you want to close the form?")) {
          let txt = "You pressed OK!";
          console.log("Checkout form closed by the user");
        } else {
          let txt = "You pressed Cancel!";
          console.log("Complete the Payment")
        }
      }
    },
    "theme": {
      "color": "#0096C5"
    }
  };

  addressHow: any
  addressss: any = JSON.parse(localStorage.getItem("userData") + '')

  ngOnInit() {
    this.service.state().subscribe(res => {
      console.log(res);
      this.sta = res;
      this.state = Object.keys(res);
      console.log(this.state);
    })
    console.log(this.product);

    if (this.addressss.city && this.addressss.state && this.addressss.address) {
      this.addressHow = true

    }

  }
  chnagedd() {
    this.addressHow = this.addressHow ? false : true;
  }

  setState(e: any) {
    const state = e.target.value;

    this.city = this.sta[state];
    console.log(this.city);

  }

  method: any
  select(e: any) {
    console.log(e.target.value);
    this.method = e.target.value
  }

  next() {
    console.log(this.tabIndex);

    if (this.tabIndex == 0) {
      if (this.addressHow) {
        this.address.patchValue(this.addressss)
      }
      if (this.address.valid) {
        this.service.updateSeller(this.address.value, this.userdata._id).subscribe((res: any) => {
          if (res.response = 'success') {
            localStorage.setItem("userData", JSON.stringify(res))
            this.tabIndex++
          } else {
            this.toastr.error('Somthing Wrong!')
          }
        })
      }
    } else if (this.tabIndex == 1) {
      if (this.method == "online") {
        this.proceed()
      } else if (this.method == "COD") {
        this.tabIndex = 2
        this.placeorder()
      }
    }

  }
  placeorder() {
    if (this.address.valid && (this.paymentID || this.method == "COD")) {
      let data: any = this.address.value
      data.userId = this.addressss._id
      data.productId = this.product._id
      data.quantity = this.product.quantity
      data.price = this.product.price * this.product.quantity
      data.payment = this.paymentID.razorpay_payment_id ? this.paymentID.razorpay_payment_id : "COD"
      this.service.orderplace(data).subscribe(res => {
        setTimeout(() => {
          this.tabIndex = 2
          this.spinner.hide()
          this.next()
        }, 2000);

      }, err => {
        console.log(err);
        this.spinner.hide()

      })
      console.log(data);

    }
  }
  back() {
    this.tabIndex--
  }

  proceed() {
    this.razorPayOptions.amount = (this.product.price * this.product.quantity) * 100
    var rzp1 = new Razorpay(this.razorPayOptions);
    rzp1.open();
    document.getElementById("butn")?.click()
    this.responhendel(this.razorPayOptions.handler)


  }
  message: any
  responhendel(res?: any): any {
    this.paymentID = res
    if (res["razorpay_payment_id"]) {
      this.spinner.show()
      this.message = res.razorpay_payment_id
      this.placeorder()
      console.log(this.tabIndex, res);
    }
  }
}