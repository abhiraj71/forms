import { Component, OnInit } from '@angular/core';
import {IFormField} from "../models";

@Component({
  selector: 'app-formtest',
  templateUrl: './formtest.component.html',
  styleUrls: ['./formtest.component.css']
})
export class FormtestComponent implements OnInit {
  formId = 'formtest-form';
  forms: IFormField[] = [];
  constructor() {
  }

  ngOnInit() {
    this.forms = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      validators: {
        required: {
          message: 'Email is required'
        },
        email: {
          message: 'Invalid email address'
        }
      }
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      value: 'SERVICE_PROVIDER',
      options: [],
      validators: {
        required: {
          message: 'Role is required'
        }
      }
    }
  ];
  }

}

