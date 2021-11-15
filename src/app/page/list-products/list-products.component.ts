import { Payment } from './models/payment';
import { Product } from './models/product.';

import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Modal } from 'bootstrap';

declare var bootstrap:any;

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  public total: number = 0;
  public p: number = 1;
  public ListProduct: Product[] = [];
  public stocknoDisp: boolean = false;
  public totalnoDisp: boolean = false;
  public noSelectMP: boolean = false;
  public showPdf: boolean = false;
  public confirmPay: boolean = false;
  private testModal: Modal | undefined;
  public metodoDePago: string = '';
  public payment: Payment = {
    paymentMethod: '',
    userName: localStorage.getItem('username'),
    detail: [
      {
        sku: '',
        qty: 0,
      }
    ],
  }
  pdfSrc = '';
  constructor(
    private productsService: ProductService)
  {}

  ngOnInit(): void {
    this.getProducts();
  }
  public getProducts(): void {
    this.productsService.getProducts().subscribe(
      async (resp) => {
        this.ListProduct = await resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public restarProduct(product: Product): void {
    product.qty = product.qty - 1;
    this.totalnoDisp = false;
    this.total = this.sumarTotal();
  }
  public agregarProduct(product: Product): void {
    if (product.qty > product.stock) {
      this.stocknoDisp = true;
      setTimeout(() => {
        this.stocknoDisp = false;
      }, 3000);
    } else {
      product.qty = product.qty + 1;
      this.totalnoDisp = false;
      this.total = this.sumarTotal();
    }
  }
  public sumarTotal(): number {
    let suma: number = 0;
    return (suma = this.ListProduct.reduce((a, b) => a + b.qty * b.price, 0));
  }
  public pagar(): void {
    if (this.total == 0) {
      this.totalnoDisp = true;

      setTimeout(() => {
        this.totalnoDisp = false;
      }, 3000);
    } else {
      this.metodoDePago = '';
      this.testModal = new bootstrap.Modal(
        document.getElementById('exampleModal'),
        {
          keyboard: false,
        }
      );
      this.testModal?.show();
    }
  }
  close() {
    this.testModal?.toggle();
  }
  save() {
    this.testModal?.toggle();
  }
  metodoPago(metodoPago: string) {
    this.metodoDePago = metodoPago;
    this.noSelectMP = false;
  }
  finalizar() {
    if (this.metodoDePago == '') {
      this.noSelectMP = true;
      setTimeout(() => {
        this.noSelectMP = false;
      }, 3000);
    } else {
      console.log('entroi acas');
      
      this.confirmPay = true;      
    }
  }
  confirmPayment() {
console.log(this.metodoDePago);
      this.payment.paymentMethod = this.metodoDePago;
      this.payment.detail = this.ListProduct.filter(a=>a.qty > 0).map(a=>{ return {sku: a.sku, qty: a.qty} });
      console.log(this.payment);
      
      this.productsService.postPayment(this.payment).subscribe(async (resp)=>{
        console.log(resp);
        if (await resp) {          
          this.testModal?.toggle();
          this.getProducts();
      }
      },async (error)=>{
      console.log(error);
      if (error.status == 200) {
        this.testModal?.toggle();
        this.getProducts();
        console.log('lanzar pago');
        this.pdfSrc = 'data:application/pdf;base64,' + error.error.text;
          setTimeout(() => {
            this.showPdf = true;
          }, 500);
      }
      });
  }
  cancelPay() {
    this.confirmPay = false;
  }
  volver(){
    this.showPdf = false;
    this.pdfSrc = '';
    this.total = 0;
  }
}
