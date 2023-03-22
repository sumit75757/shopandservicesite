import { Component } from '@angular/core'; 
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent { 
    constructor(private fb: FormBuilder,private api :ApiService){

  }
  feedback = this.fb.group({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required]),
    message: new FormControl("", [Validators.required]),
  });
  submit(){
    if (this.feedback.valid) {
      this.api.feedbacksend(this.feedback.value).subscribe((res:any)=>{
        console.log(res);
        Swal.fire('Sent?', 'Thanks For ContectUs We Give Respose as Soon as Posibal ', 'success')
      },(err:any)=>{
        console.log(err);
        
      })
    }
  }
}
