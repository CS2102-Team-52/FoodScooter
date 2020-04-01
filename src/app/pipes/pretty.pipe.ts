import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pretty'
})
export class PrettyPipe implements PipeTransform {
  transform(type: string): string {
    let words = type.split("_");
    let prettyType = '';
    for (let word of words) {
      prettyType += word[0] + word.slice(1).toLowerCase() + " ";
    }
    return prettyType.trim();
  }
}
