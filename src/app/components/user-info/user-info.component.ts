import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class UserInfoComponent {

  public user!: FormGroup;
  public today = new Date();
  constructor(private serverconnectorService: ServerconnectorService,
    private store: Store<{
      error: {
        code: string,
        message: string
      }
    }>
  ) {
    this.user = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      ppsNumber: new FormControl('', Validators.required),
      dob: new FormControl('', [Validators.required]),
      mobile: new FormControl('', Validators.pattern(/^08\d{8,10}$/)),

    });
  }

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

  public clearForm(): void{

  }
}
