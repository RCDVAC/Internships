import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../data/data.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (company(); as c) {
      <div class="heroWrap">
        <div class="heroImg" [style.background-image]="'url(' + (c.heroImageUrl || heroFallback()) + ')'"></div>
        <div class="heroFade"></div>
      </div>

      <section class="section" style="padding-top: 22px;">
        <div class="container">
          <div class="card card-pad topCard">
            <div class="topLeft">
              <div class="logo">
                <img [src]="c.logoUrl || placeholderLogo(c.name)" alt="" />
              </div>
              <div class="meta">
                <div class="name">{{ c.name }}</div>
                <div class="industry">{{ c.industry }}</div>

                <div class="facts">
                  <span>📍 {{ c.location }}</span>
                  <span>👥 {{ c.size }} employees</span>
                  <span>🏢 Founded {{ c.founded }}</span>
                  <span>🧾 {{ c.openPositions }} open positions</span>
                </div>
              </div>
            </div>

            <button class="btn btn-primary" (click)="visit(c.website)">🌐 Visit Website</button>
          </div>

          <div class="layout">
            <div class="left">
              <div class="card card-pad">
                <h3>About {{ c.name }}</h3>
                <p style="line-height:1.75;">{{ c.about }}</p>

                <div class="tags">
                  @for (t of c.tags; track t) { <span class="pill">{{ t }}</span> }
                </div>
              </div>

              <div class="card card-pad">
                <h3>Company Culture</h3>
                <p class="muted">What makes us unique</p>

                <ul>
                  @for (item of c.culture; track item) { <li>{{ item }}</li> }
                </ul>
              </div>

              <div class="card card-pad">
                <h3>Open Internship Positions</h3>
                <p class="muted">{{ jobs().length }} opportunities available</p>

                <div class="jobList">
                  @for (j of jobs(); track j.id) {
                    <div class="jobRow">
                      <div>
                        <div class="jt">{{ j.title }}</div>
                        <div class="mini">📍 {{ j.location }} • 💲 {{ j.pay }} • 🕒 {{ j.postedAgo }}</div>
                        <div class="tags" style="margin-top: 10px;">
                          @for (t of j.tags; track t) { <span class="pill">{{ t }}</span> }
                        </div>
                      </div>
                      <a class="btn" [routerLink]="['/jobs', j.id]">View Details</a>
                    </div>
                  }

                  @if (jobs().length === 0) {
                    <div class="muted" style="margin-top: 10px;">No open positions found.</div>
                  }
                </div>
              </div>
            </div>

            <div class="right">
              <div class="card card-pad">
                <h3>Intern Benefits</h3>
                <ul>
                  @for (b of c.benefits; track b) { <li>{{ b }}</li> }
                </ul>
              </div>

              <div class="card card-pad">
                <h3>Quick Actions</h3>
                <a class="btn btn-primary full" routerLink="/jobs">View All Jobs</a>
                <a class="btn full" routerLink="/companies">← Back to Companies</a>
              </div>
            </div>
          </div>

        </div>
      </section>
    } @else {
      <section class="section">
        <div class="container">
          <div class="card card-pad">Company not found.</div>
        </div>
      </section>
    }
  `,
  styles: [`
    .heroWrap {
      position: relative;
      height: 260px;
      overflow: hidden;
    }
    .heroImg {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      filter: saturate(0.9) contrast(0.95);
      transform: scale(1.02);
    }
    .heroFade {
      position: absolute;
      inset: 0;
      background: radial-gradient(70% 55% at 50% 30%, rgba(0,0,0,0.15), rgba(0,0,0,0.82) 70%, var(--bg) 100%);
    }

    .topCard {
      margin-top: -90px;
      position: relative;
      display:flex;
      justify-content: space-between;
      align-items:flex-start;
      gap: 18px;
    }

    .topLeft { display:flex; gap: 16px; }
    .logo {
      width: 72px; height: 72px;
      border-radius: 16px;
      overflow:hidden;
      border: 1px solid var(--border);
      background: rgba(255,255,255,0.03);
      flex: 0 0 auto;
    }
    .logo img { width: 100%; height: 100%; object-fit: cover; }

    .name { font-size: 22px; font-weight: 900; letter-spacing: -0.02em; }
    .industry { margin-top: 6px; color: var(--muted); font-size: 13px; }

    .facts {
      margin-top: 12px;
      display:flex;
      gap: 14px;
      flex-wrap: wrap;
      color: var(--muted2);
      font-size: 13px;
    }

    .layout { margin-top: 18px; display:grid; grid-template-columns: 2fr 1fr; gap: 18px; }
    @media (max-width: 980px){ .layout { grid-template-columns: 1fr; } }

    .left, .right { display:flex; flex-direction: column; gap: 18px; }

    h3 { margin: 0 0 10px 0; font-size: 14px; letter-spacing: 0.01em; }

    .muted { margin-top: 2px; color: var(--muted2); font-size: 13px; }

    ul { margin: 10px 0 0 18px; color: var(--muted); }
    li { margin: 8px 0; line-height: 1.6; }

    .tags { margin-top: 14px; display:flex; gap: 8px; flex-wrap: wrap; }

    .jobList { margin-top: 14px; display:flex; flex-direction: column; gap: 14px; }
    .jobRow {
      display:flex;
      justify-content: space-between;
      gap: 14px;
      align-items:flex-start;
      padding-top: 14px;
      border-top: 1px solid var(--border);
    }
    .jt { font-weight: 900; }
    .mini { margin-top: 6px; color: var(--muted2); font-size: 13px; }

    .full { width: 100%; margin-top: 12px; }
  `]
})
export class CompanyDetailPage {
  private route = inject(ActivatedRoute);
  private data = inject(DataService);

  companyId = computed(() => this.route.snapshot.paramMap.get('id') || '');
  company = computed(() => this.data.getCompany(this.companyId()));

  jobs = computed(() => this.data.getCompanyJobs(this.companyId()));

  placeholderLogo(name: string) {
    const initials = name.split(' ').map(x => x[0]).slice(0,2).join('').toUpperCase();
    return `https://placehold.co/72x72/png?text=${encodeURIComponent(initials)}`;
  }

  heroFallback() {
    return 'https://placehold.co/1600x500/png?text=Company+Hero';
  }

  visit(url?: string) {
    if (!url || url === '#') {
      alert('No website URL set yet. Add it in mock-data.ts (company.website).');
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
