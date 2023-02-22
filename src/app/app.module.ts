import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ApiService } from './service/api.service';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignupComponent } from './auth1/signup/signup.component';
import { CatgorynavComponent } from './layout/catgorynav/catgorynav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ContactComponent } from './pages/contact/contact.component'; import { BannerComponent } from './layout/banner/banner.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AddComponent } from './layout/add/add.component';
import { LeftSidebarComponent } from './layout/left-sidebar/left-sidebar.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SrinkPipe } from './pipe/srink.pipe';
import { ListProductComponent } from './products/list-product/list-product.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewcatComponent } from './newcat/newcat.component';
import { ServicehomeComponent } from './layout/servicelayout/servicehome/servicehome.component';
import { CartComponent } from "./layout/cart/cart.component";
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { BuyingComponent } from './layout/buying/buying.component';
import { UserProfileComponent } from './layout/user-profile/user-profile.component';
import { PriceformatePipe } from './pipe/priceformate.pipe';
import { ServicepageComponent } from './layout/servicelayout/servicepage/servicepage.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    SignupComponent,
    CatgorynavComponent,
    FooterComponent,
    ProductDetailsComponent,
    ContactComponent,
    BannerComponent,
    ProductListComponent,
    AddComponent,
    LeftSidebarComponent,
    SrinkPipe,
    ListProductComponent,
    AboutUsComponent,
    NewcatComponent,
    ServicehomeComponent,
    CartComponent,
    BuyingComponent,
    UserProfileComponent,
    PriceformatePipe,
    ServicepageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule.forRoot()
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule { }
