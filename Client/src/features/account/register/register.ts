import { Component, inject, Input, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds, User } from '../../../shared/Interfaces/user';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  protected creds = {} as RegisterCreds;
  private accountService = inject(AccountService)

  cancelRegister = output<boolean>();

   logCreds(){
    console.log(this.creds);
    
  }

  register(){
    this.accountService.register(this.creds).subscribe({
      next: response =>{
        console.log(response);
      },
      error: err=>{
        console.log(err);
      }
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
