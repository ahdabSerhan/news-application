import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from "../../models/product";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() title;
  @Input() product: Product;
  @Output() OnSubmitForm = new EventEmitter();
  public complexForm;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.complexForm = this.fb.group({
      // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
      'name': [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
      'description': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      'price': [null, Validators.required]
    });
    if (this.product) {
      this.complexForm = this.fb.group({
        // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
        'name': [this.product.Name, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
        'description': [this.product.Description, Validators.compose([Validators.required, Validators.minLength(5)])],
        'price': [this.product.Price, Validators.required]
      });
    }
  }
  onSubmit(values) {
    this.OnSubmitForm.emit(values);
  }
}
