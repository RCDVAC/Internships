import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data/data.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="section">
      <div class="container">
        <h1 class="title">Browse Companies</h1>
        <p class="subtitle">
          Explore {{ data.filteredCompanies().length }} companies hiring interns and discover your next opportunity
        </p>

        <div class="card card-pad filters">
          <div class="head">🔎 Search & Filter</div>

          <div class="row">
            <div class="col search">
              <label class="label">Search</label>
              <input class="input" placeholder="Company name or keywords..."
                     [value]="data.companyQuery()"
                     (input)="data.companyQuery.set(($any($event.target)).value)" />
            </div>

            <div class="col">
              <label class="label">Industry</label>
              <select (change)="data.companyIndustry.set(($any($event.target)).value)">
                @for (opt of data.industries(); track opt) {
                  <option [selected]="opt === data.companyIndustry()">{{ opt }}</option>
                }
              </select>
            </div>

            <div class="col">
              <label class="label">Company Size</label>
              <select (change)="data.companySize.set(($any($event.target)).value)">
                @for (opt of data.sizes(); track opt) {
                  <option [selected]="opt === data.companySize()">{{ opt }}</option>
                }
              </select>
            </div>
          </div>
        </div>

        <div class="meta">
          Showing {{ data.filteredCompanies().length }} of {{ data.companies().length }} companies
        </div>

        <div class="grid">
          @for (c of data.filteredCompanies(); track c.id) {
            <article class="card card-pad company">
              <div class="top">
                <div class="logo">
                  <img [src]="c.logoUrl || placeholderLogo(c.name)" alt="" />
                </div>
                <div class="nameBlock">
                  <div class="name">{{ c.name }}</div>
                  <div class="industry">{{ c.industry }}</div>
                </div>
              </div>

              <p class="blurb">{{ c.blurb }}</p>

              <div class="facts">
                <span>📍 {{ c.location }}</span>
                <span>👥 {{ c.size }} employees</span>
                <span>🧾 {{ c.openPositions }} open positions</span>
              </div>

              <div class="tags">
                @for (t of c.tags; track t) { <span class="pill">{{ t }}</span> }
              </div>

              <a class="btn btn-primary full" [routerLink]="['/companies', c.id]">View Company</a>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .title { font-size: 40px; letter-spacing: -0.02em; margin: 0; }
    .subtitle { margin-top: 8px; color: var(--muted); }

    .filters { margin-top: 24px; }
    .head { font-weight: 800; color: var(--text); margin-bottom: 14px; }

    .row {
      display:grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 14px;
      align-items:end;
    }
    @media (max-width: 980px){
      .row { grid-template-columns: 1fr; }
    }

    .meta { margin-top: 16px; color: var(--muted2); font-size: 13px; }

    .grid { margin-top: 18px; display:grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
    @media (max-width: 980px){ .grid { grid-template-columns: 1fr; } }

    .company .top { display:flex; gap: 14px; align-items:center; }
    .logo {
      width: 56px; height: 56px;
      border-radius: 14px;
      overflow:hidden;
      border: 1px solid var(--border);
      background: rgba(255,255,255,0.03);
      flex: 0 0 auto;
    }
    .logo img { width: 100%; height: 100%; object-fit: cover; }
    .name { font-weight: 900; font-size: 18px; letter-spacing: -0.01em; }
    .industry { margin-top: 4px; color: var(--muted); font-size: 13px; }

    .blurb { margin-top: 14px; line-height: 1.7; }

    .facts {
      margin-top: 14px;
      display:flex;
      gap: 14px;
      flex-wrap: wrap;
      color: var(--muted2);
      font-size: 13px;
    }

    .tags { margin-top: 14px; display:flex; gap: 8px; flex-wrap: wrap; }

    .full { width: 100%; margin-top: 16px; }
  `]
})
export class CompaniesPage {
  data = inject(DataService);

  placeholderLogo(name: string) {
    const initials = name.split(' ').map(x => x[0]).slice(0,2).join('').toUpperCase();
    return `https://placehold.co/72x72/png?text=${encodeURIComponent(initials)}`;
  }
}
