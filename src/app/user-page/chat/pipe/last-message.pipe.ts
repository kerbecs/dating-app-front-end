import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  standalone: true,
  name: 'message'
})
export class LastMessagePipe implements PipeTransform{

  transform(value: string | undefined): any {
    if(!value) return '';
    if(value.length < 30) return value;
    return value.slice(0,27)+'...';
  }
}
