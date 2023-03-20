import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignupComponent } from "./auth1/signup/signup.component";
import { CatgorynavComponent } from "./layout/catgorynav/catgorynav.component";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { ProductDetailsComponent } from "./products/product-details/product-details.component";
import { HomepageComponent } from "./pages/homepage/homepage.component";
import { ProductListComponent } from "./products/product-list/product-list.component";
import { ListProductComponent } from "./products/list-product/list-product.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { AboutUsComponent } from "./pages/about-us/about-us.component";
import { CartComponent } from "./layout/cart/cart.component";
import { UserProfileComponent } from "./layout/user-profile/user-profile.component";
import { ServicepageComponent } from "./layout/servicelayout/servicepage/servicepage.component";
import { ForgetpassComponent } from "./auth1/forgetpass/forgetpass.component";
import { ServicehomeComponent } from "./layout/servicelayout/servicehome/servicehome.component";
const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "",
    children: [
      {
        path: "home",
        component: HomepageComponent,
      },
      {
        path: "contact",
        component: ContactComponent,
      },
      {
        path: "about",
        component: AboutUsComponent,
      },
      {
        path: "product/:catogory",
        component: ListProductComponent,
      },
      {
        path: "product/serch/:serch",
        component: ListProductComponent,
      },
      {
        path: "service/serch/:serch",
        component: ServicehomeComponent,
      },
      
      {
        path: "view/:id",
        component: ProductDetailsComponent,
      },
      {
        path: "services/:cat",
        component: ServicehomeComponent,
      },
      {
        path: "service/:id",
        component: ServicepageComponent,
      },
      {
        path: "cart",
        component: CartComponent,
      },
      {
        path: "user",
        component: UserProfileComponent,
      },
    ],
  },
  {
    path: "auth",
    component: SignupComponent,
  },
  {
    path: "forgote-password",
    component: ForgetpassComponent,
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppRoutingModule {}
