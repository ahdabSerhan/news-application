import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemComponent } from './products/item/item.component';
import { ProductComponent } from './products/product.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdDialogModule, MdCardModule, MdPaginatorModule, MdSelectModule, MdButtonModule, MdCheckboxModule, MdListModule, MdGridListModule, MdInputModule } from '@angular/material';
import { ShowComponent } from './products/show/show.component';
import { RootComponent } from './root/root.component';
import { FormComponent } from './products/form/form.component';
import { AddComponent } from './products/form/add.component';
import { EditComponent } from './products/form/edit.component';
@NgModule({
  declarations: [
    RootComponent,
    ItemComponent,
    ProductComponent,
    PageNotFoundComponent,
    ShowComponent,
    FormComponent,
    AddComponent,
    EditComponent
  ],
  entryComponents: [EditComponent, AddComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    MdCardModule,
    FormsModule,
    ReactiveFormsModule,
    MdButtonModule,
    MdDialogModule,
    MdGridListModule,
    MdSelectModule,
    MdInputModule,
    MdPaginatorModule,
    MdCheckboxModule,
    MdListModule,
    NgbModule.forRoot()
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
