import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'age',
    standalone: true
})
export class AgePipe implements PipeTransform{
    transform(value: Date | undefined): any {
        if(!value) return '';
        return new Date().getFullYear() - new Date(value).getFullYear();
    }

}
