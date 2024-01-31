import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  ngOnInit(): void {
    this.onSubmit();
  }

  onSubmit(){
    const salesforceLoginUrl = 'https://valorx62-dev-ed.develop.lightning.force.com/';
    const clientId = '3MVG9pRzvMkjMb6mnBnFqt8.J_nY5d_buzJMA3VOiwqzgYTwNSa5pNKCp9qtkBtGjwswPBDADh.Fp0MsX2WLh';
    const redirectUri = 'http://localhost:4200/';
    
    // Construct the OAuth URL
    const oauthUrl = `${salesforceLoginUrl}/services/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
    const oauthWindow = (window.location.href=oauthUrl)

    // Open a new window for Salesforce login
    //const oauthWindow = window.open(oauthUrl, '_blank', 'width=600,height=400');
  }

}
