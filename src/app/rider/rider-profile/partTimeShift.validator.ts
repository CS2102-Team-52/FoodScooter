import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const PartTimeShiftValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const startHour = control.get('startHour');
    const endHour = control.get('endHour');

    return startHour.value > endHour.value ? { 'error': true } : null;
};
