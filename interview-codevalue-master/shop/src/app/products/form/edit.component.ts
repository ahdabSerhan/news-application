import { Component, OnInit, Input, Inject } from '@angular/core';
import { Product } from "../../models/product";
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from "@angular/material";
import { ProductService } from "../../services/product.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [ProductService]
})
export class EditComponent implements OnInit {
  public product: Product;
  constructor( @Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<EditComponent>, private service: ProductService) { }

  ngOnInit() {
    this.product = this.data.product;
  }

  onSubmit(values) {
    const productId = this.product.Id;
    console.log(productId, values);
    this.service.updateProduct(productId, values.name, values.description, values.price).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
    });
  }
}
