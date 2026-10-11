import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from '../layout/nav/nav';

@Component({
  selector: 'app-root',
  imports: [Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  protected readonly title = signal('Dating App');
  private http = inject(HttpClient);
  protected members = signal<any>([]);

  async ngOnInit()  {
         this.members.set(await this.getMembers());
  }

  async getMembers(){
    try {
      return lastValueFrom(this.http.get('https://localhost:5001/api/members'))
 
    } catch (error) {
      console.log(error);
      throw error;
      
    }
  }
}
