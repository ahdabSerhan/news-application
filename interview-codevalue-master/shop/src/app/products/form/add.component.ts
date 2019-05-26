import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [ProductService]
})
export class AddComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddComponent>, private service: ProductService) { }

  ngOnInit() {
  }

  onSubmit(values) {
    console.log(values);
    this.service.addProduct(values.name, values.description, values.price).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
    });
  }
}
