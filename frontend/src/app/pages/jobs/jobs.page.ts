import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data/data.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="section">
      <div class="container">
        <h1 class="h1">Browse Internships</h1>
        <p class="sub">Discover {{ data.filteredJobs().length }} internship opportunities tailored for students</p>

        <div class="card card-pad filterBox">
          <div class="filterTitle">🔎 Search & Filter</div>

          <div class="filters">
            <div class="field span2">
              <label class="label">Search</label>
              <input
                class="input"
                placeholder="Job title, company, or skills..."
                [value]="data.jobQuery()"
                (input)="data.jobQuery.set(($any($event.target)).value)"
              />
            </div>

            <div class="field">
              <label class="label">Location</label>
              <select (change)="data.jobLocation.set(($any($event.target)).value)">
                @for (opt of data.jobLocations(); track opt) {
                  <option [selected]="opt === data.jobLocation()">{{ opt }}</option>
                }
              </select>
            </div>

            <div class="field">
              <label class="label">Job Type</label>
              <select (change)="data.jobType.set(($any($event.target)).value)">
                @for (opt of data.jobTypes(); track opt) {
                  <option [selected]="opt === data.jobType()">{{ opt }}</option>
                }
              </select>
            </div>

            <div class="field">
              <label class="label">Category</label>
              <select (change)="data.jobCategory.set(($any($event.target)).value)">
                @for (opt of data.jobCategories(); track opt) {
                  <option [selected]="opt === data.jobCategory()">{{ opt }}</option>
                }
              </select>
            </div>
          </div>
        </div>

        <div class="meta muted">Showing {{ data.filteredJobs().length }} of {{ data.jobs().length }} internships</div>

        <div class="grid">
          @for (job of data.filteredJobs(); track job.id) {
            <div class="card card-pad jobCard">
              <div class="top">
                <div class="jt">{{ job.title }}</div>
                <span class="pill">{{ job.jobType }}</span>
              </div>

              <div class="muted small">🏢 {{ job.companyName }}</div>
              <div class="muted small" style="margin-top: 6px;">📍 {{ job.location }} • {{ job.postedAgo }}</div>

              <div class="pay">{{ job.pay }}</div>

              <div class="tags">
                @for (t of job.tags; track t) {
                  <span class="pill">{{ t }}</span>
                }
              </div>

              <a class="btn btn-primary w100" [routerLink]="['/jobs', job.id]">View Details</a>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .h1{ font-size: 40px; font-weight: 900; margin: 10px 0 6px; letter-spacing: -0.02em; }
    .sub{ margin: 0 0 18px; color: color-mix(in srgb, var(--foreground) 60%, transparent); }

    .filterTitle{ font-weight: 900; margin-bottom: 12px; }
    .filters{ display:grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 12px; align-items:end; }
    .span2{ grid-column: span 2; }
    @media (max-width: 980px){
      .filters{ grid-template-columns: 1fr; }
      .span2{ grid-column: auto; }
    }

    .meta{ margin: 14px 0; }
    .grid{ display:grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
    @media (max-width: 980px){ .grid{ grid-template-columns: 1fr; } }

    .jobCard .top{ display:flex; justify-content:space-between; gap: 12px; align-items:flex-start; }
    .jt{ font-weight: 900; font-size: 18px; }
    .pay{ margin-top: 12px; font-weight: 900; }
    .tags{ margin-top: 10px; display:flex; flex-wrap:wrap; gap: 8px; }
    .pill{ border: 1px solid var(--border); background: rgba(255,255,255,0.03); border-radius: 999px; padding: 4px 8px; font-size: 12px; }
    .w100{ width:100%; justify-content:center; margin-top: 14px; }
    .muted{ color: color-mix(in srgb, var(--foreground) 60%, transparent); }
    .small{ font-size: 12px; }
  `]
})
export class JobsPage {
  data = inject(DataService);
}
