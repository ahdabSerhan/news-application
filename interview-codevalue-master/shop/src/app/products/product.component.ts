
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Product } from "../models/product";
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { MdDialog } from "@angular/material";
import { AddComponent } from "./form/add.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {
  products: Array<Product>;
  private page = 1;
  private perPageLimit = 5;
  private perPageLimitDefinitions = [5, 10, 25, 100];
  private sortByOptions = [{ name: "Create By", key: "createdAt" }, { name: "Price", key: "price" }, { name: "Name", key: "name" }];
  private sortBy = this.sortByOptions[0]['key'];
  private selectedProduct: Product;
  private productId;
  private searchByName = '';
  private sub;
  constructor(
    private service: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MdDialog
  ) { }

  ngOnInit() {
    this.updateProducts();
    this.sub = this.route.params.subscribe(params => {
      // (+) before `params.get()` turns the string into a number
      if (params['id'] && +params['id'] != 0) {
        this.productId = +params['id'];
        this.service.getProduct(this.productId).subscribe(data => {
          this.selectedProduct = data;
        })
      }
    });
  }
  onSelectedProduct(selectProduct) {
    //this.selectedProduct = selectProduct;
    this.router.navigateByUrl(`products/${selectProduct.Id}`);
  }

  onDeleteProduct(product) {
    this.service.deleteProduct(product.Id).subscribe(data => {
      console.log(data);

      this.updateProducts();
      if (product.Id == this.productId) {
        this.productId = null;
        this.selectedProduct = null;
      }
    })
  }
  onSearchByName($event) {
    //getProductsByName
    if ($event.target.value.length >= 3) {
      console.log($event.target.value, $event);
      this.products = [];
      this.service.getProductsByName(this.sortBy, $event.target.value, this.page, this.perPageLimit).subscribe(data => {
        this.products = data;
      });
    }
  }
  onUpdate() {
    this.updateProducts();
    if (this.selectedProduct) {
      this.service.getProduct(this.productId).subscribe(data => {
        //this.selectedProduct = data;
        this.router.navigateByUrl(`products/${this.productId}`);
      })
    }
  }
  onAdd() {
    let dialogRef = this.dialog.open(AddComponent, {
      height: '400px',
      width: '600px',
      hasBackdrop: true,
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateProducts();
    });
  }
  onUpdatePage() {
    this.updateProducts();
  }
  onPageSelect($event) {
    this.page = $event.pageIndex + 1;
    this.perPageLimit = $event.pageSize;
    this.updateProducts();
  }
  updateProducts() {
    this.products = [];
    this.service.getProducts(this.sortBy, this.page, this.perPageLimit).subscribe(data => {
      this.products = data;
    });

  }

}
