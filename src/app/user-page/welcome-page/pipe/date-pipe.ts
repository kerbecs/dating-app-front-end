import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  standalone: true,
  name: 'date'
})
export class DatePipe implements PipeTransform{
  transform(value: Date | undefined): any {
    if(!value) return '';
    value = new Date(value);

    return String(value.getDate()).padStart(2,'0') + '.' + String(value.getMonth()).padStart(2, '0') + '.' + value.getFullYear();
  }

}
