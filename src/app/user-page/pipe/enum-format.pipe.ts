import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  standalone: true,
  name: "enumFormat"
})
export class EnumFormatPipe implements PipeTransform{
  transform(value: string): string {
    if(!value) return '';
    return value
      .toLowerCase()
      .split('_')
      .map(it => it.replace(it.at(0) ?? '', it.at(0)?.toUpperCase() ?? ''))
      .toString()
      .replaceAll(',', ' ')
  }

}
