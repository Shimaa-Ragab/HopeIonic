import { FormControl } from "@angular/forms";

export class NumberValidator {
  static validNumber(fc: FormControl) {
    console.log(parseInt(fc.value) <= 10 && parseInt(fc.value) >= 1);
    if (parseInt(fc.value) <= 10 && parseInt(fc.value) >= 1) {
      return {
        validNumber: true
      };
    } else {
      return null;
    }
  }
}
