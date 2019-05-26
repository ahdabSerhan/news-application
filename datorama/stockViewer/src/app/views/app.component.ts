import { Component } from '@angular/core';
import { StockService } from '../services/stock.http.service';
import { Chart } from 'angular-highcharts';

@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StockService]
})
export class AppComponent {
  title = 'Stock App Viewer';
  public stocks = [];
  options: any;
  chart: Chart;
  constructor(private stockService: StockService) {

  }
  ngOnInit() {
    //chart definition - initial state
    this.options = {
      chart: {
        type: 'column',
        polar: false,
      },
      title: {
        text: 'Difference in percentage of YearLow and YearHigh'
      },
      xAxis: {
        categories: ['yearHighDiff', 'yearLowDiff']
      },
      series: []
    };
    // draw a new chart
    this.chart = new Chart(this.options);

  }

  //function takes symbol name and depending on http response it add the arrived data to stock's array,
  //this function is also invoke changeStockPrice function
  //the function return array of stocks
  public getStock(stockName) {
    const self = this;
    self.stockService.getStock(stockName).subscribe(function (data: any) {
      self.stocks = [];
      data.quoteResponse.result.forEach(stock => {
        self.stocks.push({
          symbol: stock.symbol,
          name: stock.shortName,
          previousClose: stock.regularMarketPreviousClose,
          yearLow: stock.fiftyTwoWeekLow,
          yearHigh: stock.fiftyTwoWeekHigh,
          changeFromYearLow: stock.fiftyTwoWeekLowChange,
          changeFromYearHigh: stock.fiftyTwoWeekHighChange
        });

      });
      self.changeStockPrice();
      return self.stocks;
    });
  }
  //the function calculates the changeFromYearLow and changeFromYearHigh and saved their value on new array of objects
  //also it draw a new chart with the new options (data) that we've calculate 
  public changeStockPrice() {
    const self = this;
    let changePrices = [];
    self.stocks.forEach(function (stock) {
      if (changePrices.length < 6) {
        var changeFromYearLow = ((stock.previousClose - stock.yearLow) * 100) / stock.yearLow;
        var changeFromYearHigh = ((stock.previousClose - stock.yearHigh) * 100) / stock.yearHigh;
        changePrices.push({
          name: stock.symbol,
          data: [['yearHighDiff', changeFromYearHigh], ['yearLowDiff', changeFromYearLow]]
        })

      }
    });
    this.options.series = changePrices;
    this.chart = new Chart(this.options)
  }
  // sort rows by the key of the column
  public sortData(stocks, keyName) {
    stocks.sort(function (a, b) {
      if (a[keyName] < b[keyName]) {
        return -1;
      }
      if (a[keyName] > b[keyName]) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    return stocks;
  }

}
