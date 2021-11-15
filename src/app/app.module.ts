import { JwtInterceptorInterceptor } from './jwt-interceptor.interceptor';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ListProductsComponent } from './page/list-products/list-products.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [AppComponent, LoginComponent, ListProductsComponent],
  imports: [
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    NgxPaginationModule,    
    PdfViewerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
