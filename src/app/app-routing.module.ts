import { AuthGuard } from './guards/auth.guard';
import { ListProductsComponent } from './page/list-products/list-products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'list_products', component: ListProductsComponent, canActivate: [ AuthGuard ] },
    { path: '**', redirectTo: 'login' },
    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }