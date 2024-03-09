import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "date",
  standalone: true
})
export class DatePipe implements PipeTransform{
  transform(timestamp : number | undefined): any {
    if(!timestamp)
      return '';
    let date;
    if(timestamp) date = new Date(timestamp);
    else date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', // Full name of the day of the week
      hour: 'numeric', // Hour in 24-hour format
      minute: '2-digit', // Minutes
      hour12: false // Use 24-hour format
    };

    const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(date);
  }

}
