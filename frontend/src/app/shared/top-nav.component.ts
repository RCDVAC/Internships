import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="nav">
      <div class="container nav-inner">
        <a class="brand" routerLink="/" aria-label="Softlytic Home">
          <span class="brand-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
                    stroke="currentColor" stroke-width="2"/>
              <path d="M9 7h6M9 11h6M9 15h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="brand-text">Softlytic</span>
        </a>

        <nav class="links" aria-label="Primary">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
          <a routerLink="/jobs" routerLinkActive="active">Browse Jobs</a>
          <a routerLink="/companies" routerLinkActive="active">Companies</a>
          <a routerLink="/cv-maker" routerLinkActive="active">CV Maker</a>
          <a routerLink="/chat-room" routerLinkActive="active">Chat Room</a>
          <a routerLink="/resources" routerLinkActive="active">Resources</a>
          <a routerLink="/contact" routerLinkActive="active">Contact</a>
        </nav>

        <div class="right">
          <div class="toggles" role="group" aria-label="Appearance controls">
            <button
              class="iconBtn"
              type="button"
              (click)="theme.setTheme('light')"
              [class.on]="theme.theme() === 'light'"
              aria-label="Light mode"
              title="Light mode"
            >☀️</button>

            <button
              class="iconBtn"
              type="button"
              (click)="theme.setTheme('dark')"
              [class.on]="theme.theme() === 'dark'"
              aria-label="Dark mode"
              title="Dark mode"
            >🌙</button>
          </div>

          <a class="btn btn-primary auth" routerLink="/auth">Sign In / Sign Up</a>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent {
  theme = inject(ThemeService);
}
