import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceformate'
})
export class PriceformatePipe implements PipeTransform {

  transform(number: any, ...args: any[]): any {

    console.log(number);
    let num: string = number.toString()
    if (number == 0) {
      return 0;
    }
    else {
      // hundreds
      if (number <= 999) {

        return "₹  " + num;
      }
      // thousands
      else if (number >= 1000 && number <= 9999) {


        return "₹  " + num.charAt(0) + ',' + num.slice(1, 4);
      }
      else if (number >= 10000 && number <= 99999) {


        return "₹  " + num.slice(0, 2) + ',' + num.slice(2, 5);
      }
      // millions
      else if (number >= 100000 && number <= 9999999) {
        return "₹ " + num.slice(0, 1) + ',' + num.slice(2, 4) + ',' + num.slice(3, 9);
      }
      // billions
      // else if (number >= 1000000000 && number <= 999999999999) {
      //   return (number / 1000000000) + 'B';
      // }
      else
        return number;
    }
  }

}
