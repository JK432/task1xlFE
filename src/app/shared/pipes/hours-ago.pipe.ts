import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hoursAgo',
  standalone: true
})
export class HoursAgoPipe implements PipeTransform {
   date = new Date(Date.now());

  transform(value: string): string {

    if (!value) return '';

    if (typeof value === 'string') {
      // If the input is a string, attempt to parse it as a Date
      this.date = new Date(value);
    }

    if (!(this.date instanceof Date) || isNaN(this.date.getTime())) {
      return 'Invalid Date';
    }

    return this.date.toDateString()
    // return `${value.getDate()}-${value.getMonth()}-${value.getFullYear()}`;


  }

}
