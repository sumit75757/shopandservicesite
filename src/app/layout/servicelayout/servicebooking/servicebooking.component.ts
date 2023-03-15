import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AmazingTimePickerService } from "amazing-time-picker";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
@Component({
  selector: "app-servicebooking",
  templateUrl: "./servicebooking.component.html",
  styleUrls: ["./servicebooking.component.css"],
})
export class ServicebookingComponent {
  @Input() data: any;
  userdata: any;
  service: FormGroup;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private tosat: ToastrService
  ) {
    this.userdata = JSON.parse(localStorage.getItem("userData") + "");
    this.service = this.fb.group({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      date: new FormControl("", [Validators.required]),
      startTime: new FormControl("", [Validators.required]),
    });
    this.service.setValue({
      name: this.userdata.username,
      email: this.userdata.email,
      phone: this.userdata.phone ? this.userdata.phone : "",
      date: "",
      startTime: "",
    });
  }
  submit() {
    debugger;
    if (this.service.valid) {
      let data = {
        userId: this.userdata._id,
        serviceId: this.data._id,
        userdata: this.service.value,
      };

      this.api.apoimentbook(data).subscribe((res) => {
        this.tosat.success("Apoinment Booked");
      });
    }
  }
}
