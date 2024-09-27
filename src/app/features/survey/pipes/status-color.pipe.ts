import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor',
  standalone: true
})
export class StatusColorPipe implements PipeTransform {
  color: string = "bg-transparent"

  transform(value: string): string {



    if (typeof value === 'string') {
      const lowerCaseValue = value.toLowerCase();

      switch (lowerCaseValue) {
        case "high":
          this.color = "bg-[#84cc16]"
          // Code for "high" #84cc16 500 green
          break;
        case "good":
          this.color = "bg-[#a3e635]"
          // Code for "good" #a3e635 400 green
          break;
        case "low":
          this.color = "bg-[#d9f99d]"
          // Code for "low" #fef08a 200 green
          break;
        case "n/c":
           this.color = "bg-[#fef08a]"
          // Code for "n/c" #fef08a 200 yellow
          break;
        case "pass":
          this.color = "bg-[#a3e635]"
          // Code for "pass #a3e635 400 green"
          break;
        case "remove":
          this.color = "bg-[#ef4444]"
          // Code for "n/c #ef4444 500 Red"
          break;
        default:
          this.color = "bg-transparent"
          // Code for values that don't match any case
          break;
      }
    }

    return this.color;
    // return `${value.getDate()}-${value.getMonth()}-${value.getFullYear()}`;


  }

}
