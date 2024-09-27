import { Component, Renderer2, importProvidersFrom } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { AuthService } from 'src/app/shared/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../../../../environments/environment';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,AngularFireAuthModule,FormsModule, ReactiveFormsModule ,AngularFireModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,ToastrModule
],

    providers: [FirebaseService,{ provide: ToastrService, useClass: ToastrService }],


  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // public showPassword = false;
  disabled = '';
  active: any;
  showLoader:boolean | undefined;

  constructor(
    public authservice: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private firebaseService: FirebaseService,
    private toastr: ToastrService
  ) {
    // AngularFireModule.initializeApp(environment.firebase);

     const bodyElement = this.renderer.selectRootElement('body', true);
    //  this.renderer.setAttribute(bodyElement, 'class', 'cover1 justify-center');
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['spruko@admin.com', [Validators.required, Validators.email]],
      password: ['sprukoadmin', Validators.required],
    });

  }
   firestoreModule = this.firebaseService.getFirestore();
   databaseModule = this.firebaseService.getDatabase();
   authModule = this.firebaseService.getAuth();
  // firebase
  email = 'spruko@admin.com';
  password = 'sprukoadmin';
  errorMessage = ''; // validation _error handle
  _error: { name: string; message: string } = { name: '', message: '' }; // for firbase _error handle

  clearErrorMessage() {
    this.errorMessage = '';
    this._error = { name: '', message: '' };
  }

  login() {
    console.log(this.loginForm)

    // this.disabled = "btn-loading"
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.authservice
        .loginWithEmail(this.email, this.password)
        .then(() => {
          this.router.navigate(['/dashboard/crm']);
          console.clear();

        })
        .catch((_error: any) => {
          this._error = _error;
          this.router.navigate(['/']);
        });
        this.toastr.success('log in successful','ynex', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
    }

  }

  validateForm(email: string, password: string) {
    if (email.length === 0) {
      this.errorMessage = 'please enter email id';
      return false;
    }

    if (password.length === 0) {
      this.errorMessage = 'please enter password';
      return false;
    }

    if (password.length < 6) {
      this.errorMessage = 'password should be at least 6 char';
      return false;
    }

    this.errorMessage = '';
    return true;
  }

  //angular
  public loginForm!: FormGroup;
  public error: any = '';

  get form() {
    return this.loginForm.controls;
  }

  Submit() {
    console.log(this.loginForm)
    if (
      this.loginForm.controls['username'].value === 'spruko@admin.com' &&
      this.loginForm.controls['password'].value === 'sprukoadmin'
    ) {
      this.router.navigate(['/dash/']);
    } else {
      this.error = 'Please check email and passowrd';
    }

  }

  // public togglePassword() {
  //   this.showPassword = !this.showPassword;
  // }

  ngOnDestroy(): void {
    const bodyElement = this.renderer.selectRootElement('body', true);
    this.renderer.removeAttribute(bodyElement, 'class');
  }
  showPassword = false;
  toggleClass = "off-line";
  toggleVisibility() {
    this.showPassword = !this.showPassword;
    if (this.toggleClass === "off-line") {
      this.toggleClass = "line";
    } else {
      this.toggleClass = "off-line";
    }
  }
}

