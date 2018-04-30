import { FormGroup, FormBuilder } from "@angular/forms";

export abstract class FormComponentBase {

  public _systemError = null;
  public _formGroup: FormGroup = null;

  abstract onSubmit();

  public setSystemError(message: String) {
    this._systemError = message;
  }

  public getSystemError(): string {
    return this._systemError;
  }

  public formGroupRegister(formGroup: FormGroup) {
    this._formGroup = formGroup;
  }

  public getFormGroup(): FormGroup {
    return this._formGroup;
  }

  public formInvalidHandle() {
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

  public fieldInvalid(field: string): boolean {
    const formGroup = this.getFormGroup();
    const control = formGroup.controls[field];
    return control.invalid && (control.dirty || control.touched);
  }

  public isValid() {
    this._systemError = null;
    const formGroup = this.getFormGroup();
    return formGroup.valid;
  }
}
