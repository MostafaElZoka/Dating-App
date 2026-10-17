import { Component, Input, signal } from '@angular/core';
import { Register } from '../account/register/register';
import { User } from '../../shared/Interfaces/user';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  registerMode = signal(false);
  @Input() membersFromApp:User[] = [];

  inRegisterMode(value: boolean){
    this.registerMode.set(value);
  }

}
