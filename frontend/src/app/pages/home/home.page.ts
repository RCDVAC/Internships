import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data/data.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div class="container">
        <div class="pillTop">🧑‍🎓 Built for Students & Recent Grads</div>

        <h1 class="h1">
          Launch Your Career with<br />
          the Perfect Internship
        </h1>

        <p class="sub">
          Discover thousands of internship opportunities from top companies.
          Get real-world experience and kickstart your professional journey.
        </p>

        <div class="actions">
          <a class="btn btn-primary" routerLink="/jobs">
            Browse Internships <span aria-hidden="true">→</span>
          </a>
          <a class="btn" routerLink="/companies">Explore Companies</a>
        </div>

        <div class="stats">
          <div class="stat">
            <div class="num">2,500+</div>
            <div class="lbl">Active Internships</div>
          </div>
          <div class="stat">
            <div class="num">850+</div>
            <div class="lbl">Partner Companies</div>
          </div>
          <div class="stat">
            <div class="num">15,000+</div>
            <div class="lbl">Students Hired</div>
          </div>
          <div class="stat">
            <div class="num">95%</div>
            <div class="lbl">Success Rate</div>
          </div>
        </div>

        <div class="divider"></div>

        <h2 class="h2">Explore by Category</h2>
        <p class="sub2">Find internships in your field of interest</p>

        <div class="cats">
          <a class="cat" routerLink="/jobs">
            <div class="icon">🧰</div>
            <div>
              <div class="ct">Engineering</div>
              <div class="cm">234 positions</div>
            </div>
          </a>

          <a class="cat" routerLink="/jobs">
            <div class="icon">🎨</div>
            <div>
              <div class="ct">Design</div>
              <div class="cm">156 positions</div>
            </div>
          </a>

          <a class="cat" routerLink="/jobs">
            <div class="icon">📈</div>
            <div>
              <div class="ct">Business</div>
              <div class="cm">189 positions</div>
            </div>
          </a>

          <a class="cat" routerLink="/jobs">
            <div class="icon">📣</div>
            <div>
              <div class="ct">Marketing</div>
              <div class="cm">142 positions</div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- ===== Added section below (matches your screenshots) ===== -->
    <section class="section">
      <div class="container">
        <div class="sectionHead">
          <div>
            <h3 class="sh">Featured Internships</h3>
            <p class="sm">Hand-picked opportunities from top companies</p>
          </div>
          <a class="btn" routerLink="/jobs">View All</a>
        </div>

        <div class="featuredGrid">
          @for (j of data.featuredJobs(); track j.id) {
            <article class="card card-pad jobCard">
              <div class="jobTop">
                <div class="jt">{{ j.title }}</div>
                <span class="pill jobType">{{ j.jobType }}</span>
              </div>

              <div class="companyRow">🏢 {{ j.companyName }}</div>
              <div class="metaRow">📍 {{ j.location }}</div>

              <div class="pay">{{ j.pay }}</div>

              <div class="tags">
                @for (t of j.tags; track t) {
                  <span class="pill">{{ t }}</span>
                }
              </div>

              <a class="btn btn-primary full" [routerLink]="['/jobs', j.id]">View Details</a>
            </article>
          }
        </div>

        <!-- CTA card like your screenshot -->
        <div class="cta card">
          <div class="ctaInner">
            <h3 class="ctaTitle">Ready to Start Your Journey?</h3>
            <p class="ctaSub">
              Join thousands of students who have found their dream internships through InternHub
            </p>
            <div class="ctaActions">
              <a class="btn btn-primary" routerLink="/jobs">Browse All Internships</a>
              <a class="btn" routerLink="/resources">Career Resources</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero { padding: 66px 0 64px; text-align: center; }

    .pillTop{
      display:inline-flex;
      align-items:center;
      gap: 8px;
      padding: 6px 12px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: rgba(255,255,255,0.03);
      color: color-mix(in srgb, var(--foreground) 75%, transparent);
      font-size: 12px;
      margin-top: 18px;
    }

    .h1{
      margin: 18px auto 0;
      font-size: 58px;
      line-height: 1.03;
      letter-spacing: -0.035em;
      font-weight: 950;
      max-width: 980px;
    }
    @media (max-width: 760px){ .h1{ font-size: 40px; } }

    .sub{
      margin: 14px auto 0;
      max-width: 820px;
      line-height: 1.85;
      color: color-mix(in srgb, var(--foreground) 62%, transparent);
      font-size: 14px;
    }

    .actions{
      margin-top: 22px;
      display:flex;
      justify-content:center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .stats{
      margin-top: 42px;
      display:grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 18px;
      align-items: center;
    }
    @media (max-width: 980px){ .stats{ grid-template-columns: repeat(2, 1fr); } }

    .stat .num{
      font-size: 30px;
      font-weight: 950;
      letter-spacing: -0.02em;
    }
    .stat .lbl{
      margin-top: 6px;
      color: color-mix(in srgb, var(--foreground) 55%, transparent);
      font-size: 12px;
    }

    .divider{
      margin: 44px auto 0;
      height: 1px;
      width: min(980px, 100%);
      background: var(--border);
      opacity: 0.95;
    }

    .h2{
      margin-top: 46px;
      font-size: 34px;
      font-weight: 950;
      letter-spacing: -0.02em;
    }

    .sub2{
      margin-top: 10px;
      color: color-mix(in srgb, var(--foreground) 60%, transparent);
      font-size: 13px;
    }

    .cats{
      margin-top: 26px;
      display:grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
    }
    @media (max-width: 1100px){ .cats{ grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 560px){ .cats{ grid-template-columns: 1fr; } }

    .cat{
      display:flex;
      align-items:center;
      gap: 12px;
      padding: 18px;
      text-align:left;
      text-decoration:none;
      color: var(--foreground);
      border-radius: calc(var(--radius) + 10px);
      background: rgba(255,255,255,0.03);
      border: 1px solid var(--border);
      transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;
    }
    .cat:hover{
      background: rgba(255,255,255,0.06);
      border-color: rgba(255,255,255,0.12);
      transform: translateY(-1px);
    }

    .icon{
      width: 44px;
      height: 44px;
      border-radius: 14px;
      border: 1px solid var(--border);
      background: rgba(255,255,255,0.03);
      display:grid;
      place-items:center;
      flex: 0 0 auto;
    }

    .ct{ font-weight: 950; }
    .cm{ margin-top: 4px; font-size: 12px; color: color-mix(in srgb, var(--foreground) 55%, transparent); }

    /* Featured internships section */
    .sectionHead{
      display:flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 14px;
      margin-bottom: 18px;
    }

    .sh{ margin: 0; font-size: 22px; font-weight: 950; letter-spacing: -0.02em; }
    .sm{ margin: 6px 0 0; color: color-mix(in srgb, var(--foreground) 60%, transparent); font-size: 13px; }

    .featuredGrid{
      display:grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    @media (max-width: 980px){ .featuredGrid{ grid-template-columns: 1fr; } }

    .jobCard{
      display:flex;
      flex-direction: column;
      gap: 10px;
    }

    .jobTop{
      display:flex;
      justify-content: space-between;
      align-items:center;
      gap: 10px;
    }

    .jt{ font-weight: 950; }
    .jobType{ opacity: 0.95; }

    .companyRow, .metaRow{
      font-size: 13px;
      color: color-mix(in srgb, var(--foreground) 60%, transparent);
    }

    .pay{
      margin-top: 6px;
      font-weight: 900;
    }

    .tags{
      margin-top: 6px;
      display:flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .full{ width: 100%; margin-top: 8px; }

    /* CTA card */
    .cta{
      margin-top: 32px;
      padding: 0;
      border-radius: calc(var(--radius) + 14px);
      overflow: hidden;
      background:
        radial-gradient(900px 380px at 50% 20%, rgba(255,255,255,0.22), rgba(255,255,255,0.06)),
        rgba(255,255,255,0.03);
    }
    .ctaInner{
      padding: 34px 26px;
      text-align: center;
    }
    .ctaTitle{
      margin: 0;
      font-size: 28px;
      font-weight: 950;
      letter-spacing: -0.02em;
    }
    .ctaSub{
      margin: 10px auto 0;
      max-width: 700px;
      line-height: 1.75;
      color: color-mix(in srgb, var(--foreground) 65%, transparent);
      font-size: 13px;
    }
    .ctaActions{
      margin-top: 18px;
      display:flex;
      justify-content:center;
      gap: 12px;
      flex-wrap: wrap;
    }
  `]
})
export class HomePage {
  data = inject(DataService);
}
