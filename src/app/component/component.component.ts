
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../validators/custom-forms.module';
import { IFormField, IFormFieldOption, IFormValidators } from '../models';


@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.css']
})
export class ComponentComponent implements OnChanges {

  form: FormGroup;
  Object = Object;

  @Input() fields: IFormField[] = [];
  @Input() formId = Math.random().toString(36).substring(7);
  @Output() onSubmit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() formEvents: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _ref: ChangeDetectorRef) {
  }

  static parseFields(fields: IFormField[], formId: string) {
    let _fields = [];
    let _fg: any = {};
    _fields = fields
      .filter((field: IFormField) => field.isVisible !== false)
      .map((field: IFormField, i: number) => {
        field.id = (formId + '-' + i);
        if (field.type === 'image' || field.type === 'html') {
          return field;
        }
        if (field.options) {
          field.options = field.options.map((option: IFormFieldOption, j: number) => {
            option.id = (formId + '-' + i + '-' + j);
            if (option.name) {
              _fg = {
                ..._fg,
                [option.name]: new FormControl()
              };
            }
            return option;
          });
        }
        if (field.name) {
          _fg = {
            ..._fg,
            [field.name]: new FormControl({
              value: field.value,
              disabled: field.disabled
            }, ComponentComponent.parseValidators(field.validators))
          };
        }
        return field;
      });
    return {
      fields: _fields,
      fg: _fg
    };
  }

  static parseValidators(validators: IFormValidators) {
    let _v: any = [];
    for (const v in validators) {
      if (!validators.hasOwnProperty(v)) {
        continue;
      }
      switch (v) {
        case 'minlength':
          _v = [..._v, Validators.minLength(validators[v].value)];
          break;
        case 'maxlength':
          _v = [..._v, Validators.maxLength(validators[v].value)];
          break;
        case 'pattern':
          _v = [..._v, Validators.pattern(validators[v].value)];
          break;
        case 'required':
          _v = [..._v, Validators.required];
          break;
        case 'rangeLength':
          _v = [..._v, CustomValidators.rangeLength(validators[v].value)];
          break;
        case 'min':
          _v = [..._v, CustomValidators.min(validators[v].value)];
          break;
        case 'max':
          _v = [..._v, CustomValidators.max(validators[v].value)];
          break;
        case 'gt':
          _v = [..._v, CustomValidators.gt(validators[v].value)];
          break;
        case 'lt':
          _v = [..._v, CustomValidators.lt(validators[v].value)];
          break;
        case 'digits':
          _v = [..._v, CustomValidators.digits];
          break;
        case 'number':
          _v = [..._v, CustomValidators.number];
          break;
        case 'url':
          _v = [..._v, CustomValidators.url];
          break;
        case 'email':
          _v = [..._v, CustomValidators.email];
          break;
        case 'date':
          _v = [..._v, CustomValidators.date];
          break;
        case 'minDate':
          _v = [..._v, CustomValidators.minDate(validators[v].value)];
          break;
        case 'maxDate':
          _v = [..._v, CustomValidators.maxDate(validators[v].value)];
          break;
        case 'equal':
          _v = [..._v, CustomValidators.equal(validators[v].value)];
          break;
        case 'notEqual':
          _v = [..._v, CustomValidators.notEqual(validators[v].value)];
          break;
      }
    }
    return _v;
  }

  ngOnChanges() {
    // logger.debug(this.fields);
    const f = ComponentComponent.parseFields(this.fields, this.formId);
    this.fields = [...f.fields];
    this.form = new FormGroup(f.fg);
    this.markForCheck();
  }

  submit() {
    // logger.debug('Submit');
    // logger.debug(this.form);
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });
    if (this.form.valid) {
      this.onSubmit.emit(this.form);
    }
  }

  onImageEvent(field: IFormField, ev: any) {
    this.emit('image', field, ev, this.form);
  }

  onAddEvent(field: IFormField, ev: any) {
    this.emit('add', field, ev, this.form);
  }

  onSelectEvent(field: IFormField, ev: any) {
    this.emit('select', field, ev, this.form);
  }

  emit(type: string, field: IFormField, ev?: any, form?: any) {
    this.formEvents.emit({ type: type, data: ev, field: field, form: form });
  }

  markForCheck() {
    setTimeout(() => {
      if (!this._ref['destroyed']) {
        this._ref.markForCheck();
        this._ref.detectChanges();
      }
    });
  }
}
