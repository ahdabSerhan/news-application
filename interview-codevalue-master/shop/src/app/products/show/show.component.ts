import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from "../../models/product";
import { MdDialog, MdDialogRef } from '@angular/material';
import { EditComponent } from "../form/edit.component";
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  @Input()
  public product: Product;
  @Output()
  public OnRequestUpdate = new EventEmitter();
  private image = environment.staticImage;
  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }
  onEditProduct() {
    let dialogRef = this.dialog.open(EditComponent, {
      height: '400px',
      width: '600px',
      hasBackdrop: true,
      data: {
        product: this.product
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.OnRequestUpdate.emit();
    });
  }
}
