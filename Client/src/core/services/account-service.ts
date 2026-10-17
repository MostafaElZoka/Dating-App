import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { RegisterCreds, User } from '../../shared/Interfaces/user';
import { tap } from 'rxjs';

@Service()
export class AccountService {

    private httpClient = inject(HttpClient);
    public currentUser = signal<User | null>(null)

    private baseUrl = "https://localhost:5001/api/";

    register(creds: RegisterCreds) {
        return this.httpClient.post<User>(`${this.baseUrl}account/register`, creds).pipe(
            tap((user: User) => {
                if (user) {
                    this.setCurrentUser(user)
                }
            }
        )
        )
    }

    login(creds: any) {
        return this.httpClient.post<User>(`${this.baseUrl}account/login`, creds).pipe(
            tap((user: User) => {
                this.setCurrentUser(user)
            })
        );
    }

    logout() {
        this.currentUser.set(null);
        localStorage.removeItem("user");
    }

    setCurrentUser(user: User) {
        if (user) {
            this.currentUser.set(user)
            localStorage.setItem("user", JSON.stringify(this.currentUser()))
        }
    }
}
