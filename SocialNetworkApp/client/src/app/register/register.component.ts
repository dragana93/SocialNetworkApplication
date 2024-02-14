import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../services/account-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};

  @Output() cancelRegister = new EventEmitter();
  maxDate: Date = new Date();
  registerForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });
  validationErrors: string[] = [];

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
   // this.initializeForm();

   this.registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm() {
    // this.registerForm = this.fb.group({
    //   username: [''],
    //   // gender: ['male'],
    //   // knownAs: ['', Validators.required],
    //   // dateOfBirth: ['', Validators.required],
    //   // city: ['', Validators.required],
    //   // country: ['', Validators.required],
    //   //password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
    //   password: [''],
    //   // confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    // });

    // // this.registerForm.controls['confirmPassword'].valueChanges.subscribe(() => {
    // //   this.registerForm.controls['confirmPassword'].updateValueAndValidity();
    // // })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return null;
      //return control?.value === control?.parent?.controls[matchTo].value ? null : { isMatching: true}
    }
  }

  register() {

    console.log(this.registerForm.value)
    this.accountService.register(this.registerForm.value).subscribe(
      (response) => {
        this.router.navigateByUrl('/members')
      },
      (error) => {
        console.log('error register', error);
        this.validationErrors = error;
      }
    );
  }

  cancel() {
    console.log('canceled');
    this.cancelRegister.emit(false);
  }

}
