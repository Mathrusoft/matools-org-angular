import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indianCurrencyFormatter',
  standalone: true
})
export class IndianCurrencyFormatterPipe implements PipeTransform {
  transform(value: number | string): string {
    if (!value && value !== 0) {
      return '';
    }

    // Ensure the value is treated as a string
    let numString = value.toString();

    // Split into integer and decimal parts
    const [integerPart, decimalPart] = numString.split('.');

    // Format the integer part as per the Indian numbering system
    const lastThree = integerPart.slice(-3);
    const otherDigits = integerPart.slice(0, -3);
    const formattedInteger = otherDigits
      ? otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree
      : lastThree;

    // Combine integer and decimal parts
    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
  }
}
