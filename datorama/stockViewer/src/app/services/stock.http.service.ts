import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';;

@Injectable()
export class StockService {
    constructor(private _http: HttpClient) {

    }
    // the function sends http request depending on symbol name and it returns the response 
    public getStock(stockName) {
        return this._http.get('http://query1.finance.yahoo.com/v7/finance/quote?symbols='+stockName);

    }
  
}