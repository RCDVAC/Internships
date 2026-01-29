import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../data/data.service';
import type { Job } from '../../data/mock-data';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="section">
      <div class="container">
        <a class="back" routerLink="/jobs">← Back to Jobs</a>

        @if (job(); as j) {
          <div class="grid">
            <div class="card card-pad heroCard">
              <div class="heroTop">
                <div class="logo">
                  <img [src]="companyLogo()" alt="Company logo" />
                </div>

                <div class="heroMain">
                  <h1 class="title">{{ j.title }}</h1>
                  <div class="meta">
                    <span class="muted">🏢 {{ j.companyName }}</span>
                    <span class="muted">📍 {{ j.location }}</span>
                    <span class="muted">💲 {{ j.pay }}</span>
                    <span class="muted">⏱ {{ j.postedAgo }}</span>
                  </div>

                  <div class="tags">
                    @for (t of j.tags; track t) {
                      <span class="pill">{{ t }}</span>
                    }
                  </div>
                </div>

                <div class="heroRight">
                  <div class="pill type">{{ j.jobType }}</div>
                </div>
              </div>
            </div>

            <div class="card card-pad applyCard">
              <div class="applyTitle">Apply for this Position</div>
              <div class="muted small">🗓 Deadline: {{ j.deadline }}</div>

              <a class="btn btn-primary w100" href="#" (click)="$event.preventDefault(); fakeApply()">
                Apply Now ↗
              </a>

              <div class="rowBtns">
                <button class="btn" type="button" (click)="fakeSave()">Save</button>
                <button class="btn" type="button" (click)="fakeShare()">Share</button>
              </div>
            </div>

            <div class="card card-pad">
              <div class="h3">About the Role</div>
              <p class="muted lh">{{ j.description }}</p>
            </div>

            <div class="card card-pad">
              <div class="h3">Responsibilities</div>
              <ul class="list">
                @for (r of j.responsibilities; track r) {
                  <li>{{ r }}</li>
                }
              </ul>
            </div>

            <div class="card card-pad">
              <div class="h3">Qualifications</div>
              <ul class="list">
                @for (q of j.qualifications; track q) {
                  <li>{{ q }}</li>
                }
              </ul>
            </div>

            <div class="card card-pad companyCard">
              <div class="h3">About {{ j.companyName }}</div>
              <p class="muted lh">{{ companyBlurb() }}</p>
              <a class="btn w100" [routerLink]="['/companies', j.companyId]">View Company Profile</a>
            </div>

            <div class="card card-pad similarCard">
              <div class="h3">Similar Positions</div>

              @for (s of similar(); track s.id) {
                <div class="miniCard">
                  <div class="miniTop">
                    <div class="miniTitle">{{ s.title }}</div>
                    <div class="miniPay">{{ s.pay }}</div>
                  </div>
                  <div class="miniMeta muted small">{{ s.companyName }} • {{ s.location }}</div>
                  <a class="btn w100" [routerLink]="['/jobs', s.id]">View Details</a>
                </div>
              }
            </div>
          </div>
        } @else {
          <div class="card card-pad">
            <div class="h3">Job not found</div>
            <div class="muted">This job ID doesn’t exist in mock data.</div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .back{ display:inline-block; margin: 10px 0 18px; color: var(--foreground); text-decoration:none; opacity:.9; }
    .back:hover{ opacity:1; text-decoration: underline; }

    .grid{ display:grid; grid-template-columns: 2fr 1fr; gap: 16px; align-items:start; }
    @media (max-width: 980px){ .grid{ grid-template-columns: 1fr; } }

    .heroCard{ grid-column: 1 / span 1; }
    .applyCard{ grid-column: 2 / span 1; }
    @media (max-width: 980px){
      .heroCard, .applyCard{ grid-column: auto; }
    }

    .heroTop{ display:flex; gap: 16px; align-items:flex-start; }
    .logo{ width: 54px; height: 54px; border-radius: 14px; overflow:hidden; border: 1px solid var(--border); background: rgba(255,255,255,0.03); flex: 0 0 auto; }
    .logo img{ width:100%; height:100%; object-fit: cover; }

    .heroMain{ flex:1; }
    .title{ margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -0.02em; }
    .meta{ margin-top: 10px; display:flex; flex-wrap: wrap; gap: 10px; }
    .tags{ margin-top: 12px; display:flex; flex-wrap: wrap; gap: 8px; }

    .heroRight{ display:flex; justify-content:flex-end; min-width: 120px; }
    .pill.type{ padding: 6px 10px; border-radius: 999px; border: 1px solid var(--border); background: rgba(255,255,255,0.03); font-size: 12px; font-weight: 800; }

    .applyTitle{ font-weight: 900; margin-bottom: 6px; }
    .rowBtns{ margin-top: 10px; display:flex; gap: 10px; }
    .w100{ width:100%; justify-content:center; }

    .h3{ font-weight: 900; margin-bottom: 8px; }
    .muted{ color: color-mix(in srgb, var(--foreground) 60%, transparent); }
    .small{ font-size: 12px; }
    .lh{ line-height: 1.75; }

    .list{ margin: 0; padding-left: 18px; color: color-mix(in srgb, var(--foreground) 75%, transparent); line-height: 1.9; }

    .companyCard{ grid-column: 2 / span 1; }
    .similarCard{ grid-column: 2 / span 1; }
    @media (max-width: 980px){
      .companyCard, .similarCard{ grid-column: auto; }
    }

    .miniCard{
      margin-top: 12px;
      padding: 12px;
      border-radius: 14px;
      border: 1px solid var(--border);
      background: rgba(255,255,255,0.02);
    }
    .miniTop{ display:flex; justify-content:space-between; gap: 12px; }
    .miniTitle{ font-weight: 900; }
    .miniPay{ font-weight: 900; }
    .miniMeta{ margin-top: 6px; }
  `]
})
export class JobDetailPage {
  private route = inject(ActivatedRoute);
  data = inject(DataService);

  jobId = signal(this.route.snapshot.paramMap.get('id') || '');

  job = computed(() => this.data.getJob(this.jobId()));
  companyLogo = computed(() => this.data.getCompany(this.job()?.companyId || '')?.logoUrl || 'https://placehold.co/120x120');
  companyBlurb = computed(() => this.data.getCompany(this.job()?.companyId || '')?.blurb || '');

  similar = computed<Job[]>(() => {
    const j = this.job();
    if (!j) return [];
    return this.data
      .filteredJobs()
      .filter(x => x.id !== j.id && x.category === j.category)
      .slice(0, 2);
  });

  fakeApply() {
    alert('Demo: Apply action clicked.');
  }
  fakeSave() {
    alert('Demo: Saved.');
  }
  fakeShare() {
    alert('Demo: Shared.');
  }
}
