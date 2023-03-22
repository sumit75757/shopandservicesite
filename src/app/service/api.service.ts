import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { ProductInfo } from "../Interface/data-type";
@Injectable({
  providedIn: "root",
})
export class ApiService {
  token: any = localStorage.getItem("token");
  // baseurl = environment.baseurl
  //baseurl:any='https://localhost:80/';
  baseurl: any = "http://localhost:4000/";
  constructor(private http: HttpClient) {}
  header = new HttpHeaders({
    Authorization: "Bearer " + this.token,
  });
  loginin(data: any) {
    return this.http.post(this.baseurl + "api/auth/singin", data, {
      headers: this.header,
    });
  }
  singup(data: any) {
    return this.http.post(this.baseurl + "api/auth/singup", data);
  }
  forgot(data: any) {
    return this.http.post(this.baseurl + "api/auth/forgot", data);
  }
  otp(data: any) {
    return this.http.post(this.baseurl + "api/auth/varification/", data, {
      headers: this.header,
    });
  }
  veryfyotp(data: any) {
    return this.http.post(this.baseurl + "api/auth/varification/otp", data, {
      headers: this.header,
    });
  }
  catlog() {
    return this.http.get(this.baseurl + "api/catogory", {
      headers: this.header,
    });
  }
  catogory() {
    return this.http.get(this.baseurl + "api/catogory", {
      headers: this.header,
    });
  }
  catserch(serh: any) {
    return this.http.get(this.baseurl + "api/serche/catogory/" + serh.catogory);
  }
  servicecatserch(serh: any) {
    return this.http.get(this.baseurl + "api/serche/service/" + serh);
  }
  
  product(id?: any) {
    if (id) {
      return this.http.get(this.baseurl + "api/product/" + id, {
        headers: this.header,
      });
    } else {
      return this.http.get(this.baseurl + "api/product", {
        headers: this.header,
      });
    }
  }
  serviceserch(serch:any){
    return this.http.get(this.baseurl + "api/serche/serviceserch/"+serch, {
      headers: this.header,
    });
  }
  service(id?: any) {
    console.log(id);

    if (!id) {
      return this.http.get(this.baseurl + "api/service", {
        headers: this.header,
      });
    } else {
      return this.http.get(this.baseurl + "api/service/" + id, {
        headers: this.header,
      });
    }
  }
  servicecat(){
    return this.http.get(this.baseurl + "api/servicecat", {
      headers: this.header,
    });
  }
  addtocart(data: any, id?: any) {
    if (id) {
      return this.http.put(this.baseurl + "api/cart/" + id, data, {
        headers: this.header,
      });
    } else {
      return this.http.post(this.baseurl + "api/cart", data, {
        headers: this.header,
      });
    }
  }
  gettocart(userid: any) {
    return this.http.get(this.baseurl + "api/cart/" + userid, {
      headers: this.header,
    });
  }
  rmovecart(id: any) {
    return this.http.delete(this.baseurl + "api/cart/" + id, {
      headers: this.header,
    });
  }
  state() {
    return this.http.get("../../assets/state.json");
  }
  updateSeller(data: any, id: any) {
    return this.http.put(this.baseurl + "api/auth/userUpdate/" + id, data, {
      headers: this.header,
    });
  }

  getorder(data: any) {
    return this.http.get(this.baseurl + "api/orders/" + data, {
      headers: this.header,
    });
  }
  orderplace(data: any) {
    return this.http.post(this.baseurl + "api/orders", data, {
      headers: this.header,
    });
  }
  apoimentbook(data: any) {
    return this.http.post(this.baseurl + "api/bookapoinment", data, {
      headers: this.header,
    });
  }
  getimentbook(id: any) {
    return this.http.get(this.baseurl + "api/bookapoinment/" + id, {
      headers: this.header,
    });
  }
  serch(res: any) {
    console.log(res);

    return this.http.get(this.baseurl + "api/serche?serch=" + res.serch);
  }
  userupdate(data:any,id:any){
    return this.http.put(this.baseurl + "api/auth/userUpdate/"+id, data, {
      headers: this.header,
    });
  }
  getState() {
    return this.http.get('../../../assets/state.json')

  }
  getuser(id:any){
    return this.http.get(this.baseurl + "api/auth/seller/"+id, {
      headers: this.header,
    });
    
  }
  updatecart(id:any,data:any){
    return this.http.put(this.baseurl + "api/cart/"+id, data, {
      headers: this.header,
    });
  }
  cancelOrder(id:any,data:any){
    return this.http.put(this.baseurl + "api/orders/"+id, data,{
      headers: this.header,
    });
  }
  setemail(data:any){
    return this.http.post(this.baseurl + "api/auth/varification/refund",data, {
      headers: this.header,
    });
  }
  sentemail(data:any){
    return this.http.post(this.baseurl + "api/auth/varification/appoinmetbook",data, {
      headers: this.header,
    });
  }
  feedbacksend(data:any){
    return this.http.post(this.baseurl + "api/feeback",data, {
      headers: this.header,
    });
  }

}
