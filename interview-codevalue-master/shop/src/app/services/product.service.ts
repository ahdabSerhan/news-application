
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { RequestMethod, CommonServer } from './CommonService';
import _ from 'lodash';
import { Product } from "../models/product";
import * as moment from 'moment';
@Injectable()
export class ProductService extends CommonServer {

  private uri = environment.uri_address + '/products';
  constructor(public http: Http) {
    super(http);
  }

  getProducts(sortBy, page, limit) {
    return this.Request(RequestMethod.GET, this.uri + `/?p=${page}&l=${limit}&sortBy=${sortBy}&order=desc`, {}).map(items => {
      return _.map(items, item => {
        const dateTime = moment(item.createdAt);
        return new Product(item.id, item.name, item.description, item.price, item.image, dateTime.format('dddd, MMMM Do YYYY, h:mm:ss a'));
      })
    });
  }

  getProductsByName(sortBy, name, page, limit) {
    return this.Request(RequestMethod.GET, this.uri + `/?p=${page}&l=${limit}&sortBy=${sortBy}&order=desc&search=${name}`, {}).map(items => {
      return _.map(items, item => {
        const dateTime = moment(item.createdAt);
        return new Product(item.id, item.name, item.description, item.price, item.image, dateTime.format('dddd, MMMM Do YYYY, h:mm:ss a'));
      })
    });
  }

  getProduct(productId) {
    return this.Request(RequestMethod.GET, this.uri + '/' + productId, {}).map(item => {
      const dateTime = moment(item.createdAt);
      return new Product(item.id, item.name, item.description, item.price, item.image, dateTime.format('dddd, MMMM Do YYYY, h:mm:ss a'));
    });
  }

  deleteProduct(productId) {
    return this.Request(RequestMethod.DELETE, this.uri + '/' + productId, {});
  }

  addProduct(name, description, price) {
    return this.Request(RequestMethod.POST, this.uri, { name, description, price });
  }

  updateProduct(productId, name, description, price) {
    return this.Request(RequestMethod.PUT, this.uri + '/' + productId, {
      id: productId, name, description, price
    });
  }
}
