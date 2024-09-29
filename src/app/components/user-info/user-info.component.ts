import { ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UserVO } from '../../model/user-vo';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ServerconnectorService } from '../../service/serverconnector.service';
import { Store } from '@ngrx/store';
import { errorAction } from '../../store/error-action';
import { MatCardModule } from '@angular/material/card';
import { MediaMatcher } from '@angular/cdk/layout';


@Component({
  selector: 'app-user-info',
  standalone: true,
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule
  ],
})
export class UserInfoComponent implements OnDestroy{

  public user!: FormGroup;
  public today = new Date();
  mobileQuery!: MediaQueryList;
  constructor(private serverconnectorService: ServerconnectorService,
    private store: Store<{
      error: {
        code: string,
        message: string
      }
    }>
  ) {
    this._cerateUserForm();
    /**
     * To Handle resposiveness in resgitarion form for small devices
     */
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 650px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  private _cerateUserForm(): void{
    this.user = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      ppsNumber: new FormControl('', Validators.required),
      dob: new FormControl('', [Validators.required, this._dateValidator]),
      mobile: new FormControl('', Validators.pattern(/^08\d{8,10}$/)),

    });
  }

  /**
   * @description Creatig custom validator for DOB check
   * @param control DOB value
   * @returns 
   */
  private _dateValidator(control: FormControl):ValidationErrors | null {
    if (control.value) {
      const birthDate = new Date(control.value);
      const today = new Date();

      // Calculate the difference in years between today and the birthdate
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      // Adjust if the birthdate hasn't been reached this year yet
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      // Check if the age is less than the required minimum age
      if(age < 16){
       return { invalidDate: true };
      }
    }
    return null;
  }

  /**
   * @description Form submission to server
   */
  public submitForm(): void {

    const uservo = {} as UserVO;
    uservo.name = this.user.get('name')?.value;
    uservo.dob = this.user.get('dob')?.value;
    uservo.ppsNumber = this.user.get('ppsNumber')?.value;
    uservo.mobile = this.user.get('mobile')?.value;
    uservo.mobile = (uservo.mobile) ? uservo.mobile : null;
    console.log(uservo);
    this.serverconnectorService.post('addUser', uservo).subscribe((res => {
      if (res.id) {
        this.store.dispatch(errorAction({ code: '200', message: 'User Created Successfully...' }));
      }
    }))
  }

  /**
   * Reset form to initial state
   */
  public clearForm(): void {
    this.user.reset();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
