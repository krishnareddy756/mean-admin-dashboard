import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading = false;
  errMsg = '';
  scriptReady = false;
  email = '';
  pwd = '';
  activeTab = 0;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // CHECK IF ALREADY LOGGED IN
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/admin/dashboard']);
      return;
    }

    this.waitForGoogle();
  }

  // WAIT FOR GOOGLE SCRIPT
  waitForGoogle(): void {
    if (typeof google !== 'undefined' && google.accounts) {
      this.initGoogle();
    } else {
      setTimeout(() => this.waitForGoogle(), 100);
    }
  }

  // INITIALIZE GOOGLE SIGN IN
  initGoogle(): void {
    try {
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: (response: any) => this.handleGoogle(response),
      });

      // RENDER BUTTON - RETRY IF NOT FOUND YET
      setTimeout(() => {
        const btn = document.getElementById('googleSignInButton');
        if (btn) {
          google.accounts.id.renderButton(btn, {
            theme: 'outline',
            size: 'large',
            width: '300',
            text: 'signin_with',
          });
          this.scriptReady = true;
        }
      }, 200);
    } catch (error) {
      console.error('Google init error:', error);
      this.errMsg = 'Failed to load Google Sign-In. Refresh page.';
    }
  }

  // TAB CHANGE HANDLER
  onTabChange(idx: number): void {
    this.activeTab = idx;
    // RE-RENDER GOOGLE BUTTON WHEN SWITCHING TO GOOGLE TAB
    if (idx === 1 && !this.scriptReady && typeof google !== 'undefined') {
      this.initGoogle();
    }
  }

  // HANDLE EMAIL LOGIN
  loginWithEmail(): void {
    if (!this.email || !this.pwd) {
      this.errMsg = 'Enter email and password';
      return;
    }

    this.loading = true;
    this.errMsg = '';

    this.auth.emailLogin(this.email, this.pwd).subscribe(
      (res) => {
        this.loading = false;
        this.router.navigate(['/admin/dashboard']);
      },
      (error) => {
        this.loading = false;
        this.errMsg = error.error?.msg || 'Login failed';
      }
    );
  }

  // HANDLE GOOGLE LOGIN
  handleGoogle(response: any): void {
    if (!response.credential) {
      this.errMsg = 'Google login failed';
      return;
    }

    this.loading = true;
    const payload = this.decode(response.credential);

    this.auth.googleLogin(payload.sub, payload.email, payload.name, payload.picture).subscribe(
      (res) => {
        this.loading = false;
        this.router.navigate(['/admin/dashboard']);
      },
      (error) => {
        this.loading = false;
        this.errMsg = 'Login failed. Try again.';
      }
    );
  }

  // DECODE JWT
  decode(token: string): any {
    try {
      const parts = token.split('.');
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(json);
    } catch (error) {
      console.error('JWT decode error:', error);
      this.errMsg = 'Failed to decode login response';
      return {};
    }
  }
}
