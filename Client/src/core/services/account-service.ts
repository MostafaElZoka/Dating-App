import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class AccountService {

    private httpClient = inject(HttpClient);

    private baseUrl = "https://localhost:5001";
    login(creds:any)
    {
        return this.httpClient.post(`${this.baseUrl}/api/account/login`, creds);
    }
}
