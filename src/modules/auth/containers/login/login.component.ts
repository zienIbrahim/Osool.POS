import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      email: ['', Validators.email],
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
    }
    const loginData: Login = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password,
      rememberMe: this.loginForm.value.rememberMe,
      returnUrl:"/Tenant/List"
    };
    this.authService.Login(loginData).subscribe((res:any)=>{
      console.log("value --> res",res)
      this.formSubmitAttempt = false;
      this.loginInvalid = false;
      this.isLoading = false;  
      this.cdRef.detectChanges()
  
    },
    (error:any)=>{
      console.log("value --> error",error)
      this.formSubmitAttempt = false;
      this.loginInvalid = true;
      this.isLoading = false; 
      this.cdRef.detectChanges()
   
    },
    ()=>{

    }
    );
    // {
    //   next: (value) => {
    //     console.log("value --> next",value)
    //     this.formSubmitAttempt = true;
    //     this.loginInvalid = false;
    //     this.isLoading = false;

    //   },
    //   error: (value) => {
    //     this.loginInvalid = true;
    //   },
    //   complete: () => {        console.log("value --> complete!!")
    // },
    // }

  }
  public logout(): void {
    // todo
  }
}
