import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
import Swal from "sweetalert2";
declare var Razorpay: any;
@Component({
  selector: "app-buying",
  templateUrl: "./buying.component.html",
  styleUrls: ["./buying.component.css"],
})
export class BuyingComponent implements OnInit {
  @Output("closemodel") closemodel: EventEmitter<any> = new EventEmitter();
  @Input() product: any;
  productarr: any[] = []
  sta: any;
  paymentID: any;
  message: any;
  total: any = 0;
  state: any;
  city: any;
  tabIndex = 0;
  addressHow: any;
  addressss: any = JSON.parse(localStorage.getItem("userData") + "");
  userdata = JSON.parse(localStorage.getItem("userData") + "");
  address = this.fb.group({
    address: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
    zip: new FormControl("", [Validators.required]),
  });
  constructor(
    private service: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) {

  }

   ngOnInit() {
    console.log(this.product);
    try {
      this.product.forEach((element: any) => {
        this.productarr.push(element)
      });
      this.productarr.forEach((element: any) => {
        this.total += (element.qty == 1 ? element.price : element.price * element.qty)
        console.log(this.total, element.qty);
      });
      console.log(this.productarr);
    } catch (error) {
      this.productarr = [this.product]
      debugger
      this.productarr.forEach((element: any) => {
        this.total += (element.quantity == 1 ? element.price : element.price * element.quantity)
        console.log(this.total, element.quantity);
      });
    }

    this.service.state().subscribe((res) => {
      console.log(res);
      this.sta = res;
      this.state = Object.keys(res);
      console.log(this.state);
    });
    console.log(this.product);

    if (this.addressss.city && this.addressss.state && this.addressss.address) {
      this.addressHow = true;
    }

  }

  razorPayOptions: any = {
    key: "rzp_test_aEuup9ULohHsIp",
    amount: "",
    name: "Shop&Service",
    order_id: "",
    description: "Load Wallet",
    image:
      "https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg",
    prefill: {
      name: "Shop&Service",
      email: "shopandservice@gmail.com",
      contact: "",
      method: "",
    },
    handler: (response: any) => {
      console.log(response);
      this.responhendel(response);
    },
    modal: {
      ondismiss: function () {
        if (confirm("Are you sure, you want to close the form?")) {
          let txt = "You pressed OK!";
          console.log("Checkout form closed by the user");
        } else {
          let txt = "You pressed Cancel!";
          console.log("Complete the Payment");
        }
      },
    },
    theme: {
      color: "#0096C5",
    },
  };



  chnagedd() {
    this.addressHow = this.addressHow ? false : true;
  }

  setState(e: any) {
    const state = e.target.value;
    this.city = this.sta[state];
    console.log(this.city);
  }

  method: any;
  select(e: any) {
    console.log(e.target.value);
    this.method = e.target.value;
  }

  next() {
    if (this.tabIndex == 0) {
      if (this.addressHow) {
        this.address.patchValue(this.addressss);
      }
      if (this.address.valid) {
        this.service.updateSeller(this.address.value, this.userdata._id).subscribe((res: any) => {
          if ((res.response = "success")) {
            localStorage.setItem("userData", JSON.stringify(res));
            this.tabIndex++;
          } else {
            this.toastr.error("Somthing Wrong!");
          }
        });
      }
    } else if (this.tabIndex == 1) {
      this.tabIndex = 2;
    } else if (this.tabIndex == 2) {
      if (this.method == "online") {
        this.proceed();
      } else if (this.method == "COD") {
        this.placeorder();
      }
    }
  }
   placeorder() {
    this.spinner.show();
    if (this.address.valid && (this.paymentID || this.method == "COD")) {
      for (let index = 0; index < this.productarr.length; index++) {
        const element = this.productarr[index];
        debugger
        let data: any = this.address.value;
        data.userId = this.addressss._id;
        data.productId = element._id;
        data.quantity = element.quantity ? element.quantity : element.qty;
        data.price = element.price * (element.quantity ? element.quantity : element.qty) ;
        data.payment = this.paymentID ? this.paymentID.razorpay_payment_id : "COD";
         this.service.orderplace(data).subscribe(
          (res) => {
            if (this.productarr.length == index+1 ) {
              this.closemodels()
            }
          },
          (err) => {
            console.log(err);
            this.spinner.hide();
          }
        );
        console.log(data);
      }
      this.spinner.hide();
    }
  }

  closemodels(){
    Swal.fire('ORDER!', 'Your Order Place Successfully ', 'success');
    this.closemodel.emit()
  }

  back() {
    this.tabIndex--;
  }

  proceed() {
    this.razorPayOptions.amount = this.total * 100;
    var rzp1 = new Razorpay(this.razorPayOptions);
    rzp1.open();
    document.getElementById("butn")?.click();
    this.responhendel(this.razorPayOptions.handler);
  }
  responhendel(res?: any): any {
    this.paymentID = res;
    if (res["razorpay_payment_id"]) {
      this.spinner.show();
      this.message = res.razorpay_payment_id;
      this.placeorder();
      console.log(this.tabIndex, res);
    }
  }
}
