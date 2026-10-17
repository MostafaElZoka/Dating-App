import { Component, inject, NgModule, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected creds: any = {};

  protected accountService = inject(AccountService);
  
  login() {
    this.accountService.login(this.creds).subscribe({
      next: response => {
        console.log(response)

      },
      
      error(err) {
        alert(err.message)
      },
    });
  }

  logout(){
    this.accountService.logout();
  }
}
