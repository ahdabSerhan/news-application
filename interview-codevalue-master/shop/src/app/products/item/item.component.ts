import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from "../../models/product";
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input()
  public product: Product;
  @Output()
  public OnSelectProduct = new EventEmitter();
  @Output()
  public OnDeleteProduct = new EventEmitter();
  private image = environment.staticImage;
  constructor() { }

  ngOnInit() {
  }
  onProductSelectClick(selectedProduct) {
    this.OnSelectProduct.emit(selectedProduct);
  }
  onProductDeleteClick(selectedProduct) {
    this.OnDeleteProduct.emit(selectedProduct);
  }
}
