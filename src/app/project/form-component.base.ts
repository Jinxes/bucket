import { FormGroup, FormBuilder } from "@angular/forms";

export abstract class FormComponentBase {

  protected _systemError = null;
  protected _formGroup: FormGroup = null;

  abstract onSubmit();

  protected setSystemError(message: String) {
    this._systemError = message;
  }

  protected formGroupRegister(formGroup: FormGroup) {
    this._formGroup = formGroup;
  }

  protected getFormGroup(): FormGroup {
    return this._formGroup;
  }

  protected formInvalidHandle() {
    const that = this;
    return (error) => {
      if (error.status === 0) {
        that.setSystemError('系统繁忙，请稍后再试');
      } else {
        const errors = error.error.errors;
        const formGroup = this.getFormGroup();
        for (const key of Object.keys(errors)) {
          if (key !== '_system') {
            formGroup.controls[key].setErrors({
              async: errors[key][0]
            });
          } else {
            that.setSystemError(errors._system);
          }
        }
      }
    };
  }

  protected fieldInvalid(field: string): boolean {
    const formGroup = this.getFormGroup();
    const control = formGroup.controls[field];
    return control.invalid && (control.dirty || control.touched);
  }

  protected isValid() {
    this._systemError = null;
    const formGroup = this.getFormGroup();
    return formGroup.valid;
  }
}
