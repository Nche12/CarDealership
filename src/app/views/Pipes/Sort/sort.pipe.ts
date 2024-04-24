import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(items: any[] | null, fieldName: string): any[] | null {
    // Check if items are null or the fieldName is not provided
    if (!items || !fieldName) {
      return items;
    }
    // Sort items assuming they are not null and fieldName is valid
    return items.sort((a, b) => {
      const textA = (a[fieldName] || "").toUpperCase(); // handle case insensitivity
      const textB = (b[fieldName] || "").toUpperCase(); // handle case insensitivity
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

}
