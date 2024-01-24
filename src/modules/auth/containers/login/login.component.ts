import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '../../data/login';
import { AuthService } from '../../services';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,         
    private cdRef: ChangeDetectorRef,
    private authService: AuthService
  ) {}
  loginForm: FormGroup = new FormGroup({});
  public loginInvalid: boolean = false;
  isLoading: boolean = false;
  private formSubmitAttempt: boolean = false;
  private returnUrl: string = <string>{};
  public isAuthenticated = false;

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.loginForm = this.fb.group({
      email: ['',Validators.compose([Validators.email, Validators.required]) ],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }
  async onSubmit() {
    this.formSubmitAttempt = true;
    this.loginInvalid = false;
    this.isLoading = true;

    if (this.loginForm.invalid) {
      this.formSubmitAttempt = false;
      this.loginInvalid = true;
      this.isLoading = false;
      for (const key in this.loginForm.controls) {
        const control = this.loginForm.controls[key];
        control.markAllAsTouched();
    }
    }

    const loginData: Login = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password,
      rememberMe: this.loginForm.value.rememberMe,
      returnUrl:"/POS/new"
    };

    this.authService.Login(loginData).subscribe({
      next: (value) => {
        this.formSubmitAttempt = false;
        this.loginInvalid = false;
        this.isLoading = false;
        this.cdRef.detectChanges()
      },
      error: (value) => {
        this.formSubmitAttempt = false;
        this.loginInvalid = true;
        this.isLoading = false;
        this.cdRef.detectChanges()
      },
      complete: () => {
        console.log("value --> complete!!")
      },
    }
    );
  }
  public logout(): void {
    // todo
    this.authService.logout()
  }
  
    /* Accessor Methods */

    get emailControl() {
      return this.loginForm.get('email') as FormControl;
  }

  get emailControlValid() {
      return this.emailControl.touched && !this.emailControlInvalid;
  }

  get emailControlInvalid() {
      return (
          this.emailControl.touched &&
          (this.emailControl.hasError('required') || this.emailControl.hasError('email'))
      );
  }

  get passwordControl() {
      return this.loginForm.get('password') as FormControl;
  }

  get passwordControlValid() {
      return this.passwordControl.touched && !this.passwordControlInvalid;
  }

  get passwordControlInvalid() {
      return (
          this.passwordControl.touched &&
          (this.passwordControl.hasError('required') ||
              this.passwordControl.hasError('minlength'))
      );
  }
}
