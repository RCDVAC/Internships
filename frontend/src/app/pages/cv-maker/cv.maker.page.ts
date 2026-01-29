import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

type CvBasics = {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
};

type CvExperience = {
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  bullets: string[];
};

type CvEducation = {
  school: string;
  degree: string;
  start: string;
  end: string;
  location: string;
  notes: string;
};

type CvProject = {
  name: string;
  link: string;
  description: string;
  bullets: string[];
};

type CvData = {
  basics: CvBasics;
  skills: string[];
  experience: CvExperience[];
  education: CvEducation[];
  projects: CvProject[];
};

const STORAGE_KEY = 'softlytic.cv.v1';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="section cvWrap">
      <div class="container">
        <div class="head">
          <div>
            <h1 class="h1">CV Maker</h1>
            <p class="sub">Build a clean, professional CV with live preview.</p>
          </div>

          <div class="headBtns">
            <button class="btn" type="button" (click)="reset()">Reset</button>
            <button class="btn" type="button" (click)="downloadJson()">Download JSON</button>

            <label class="btn fileBtn">
              Load JSON
              <input type="file" accept="application/json" (change)="loadJson($event)" />
            </label>

            <button class="btn btn-primary" type="button" (click)="printCv()">Print / Save PDF</button>
          </div>
        </div>

        <div class="grid">
          <!-- LEFT: BUILDER -->
          <div class="builder">
            <div class="card card-pad">
              <div class="blockTitle">Basics</div>

              <div class="two">
                <div>
                  <label class="label">Full Name</label>
                  <input class="input" [formControl]="basics().controls.fullName" placeholder="John Doe" />
                </div>
                <div>
                  <label class="label">Title</label>
                  <input class="input" [formControl]="basics().controls.title" placeholder="Software Engineer" />
                </div>
              </div>

              <div class="two">
                <div>
                  <label class="label">Email</label>
                  <input class="input" [formControl]="basics().controls.email" placeholder="john@email.com" />
                </div>
                <div>
                  <label class="label">Phone</label>
                  <input class="input" [formControl]="basics().controls.phone" placeholder="+359 ..." />
                </div>
              </div>

              <div class="two">
                <div>
                  <label class="label">Location</label>
                  <input class="input" [formControl]="basics().controls.location" placeholder="Sofia, Bulgaria" />
                </div>
                <div>
                  <label class="label">Website</label>
                  <input class="input" [formControl]="basics().controls.website" placeholder="portfolio.com" />
                </div>
              </div>

              <div class="two">
                <div>
                  <label class="label">LinkedIn</label>
                  <input class="input" [formControl]="basics().controls.linkedin" placeholder="linkedin.com/in/..." />
                </div>
                <div>
                  <label class="label">GitHub</label>
                  <input class="input" [formControl]="basics().controls.github" placeholder="github.com/..." />
                </div>
              </div>

              <div>
                <label class="label">Professional Summary</label>
                <textarea class="input" style="min-height: 110px; padding-top: 12px;"
                  [formControl]="basics().controls.summary"
                  placeholder="1–3 sentences: your strengths, what you're seeking, and what you deliver."></textarea>
              </div>
            </div>

            <div class="card card-pad">
              <div class="rowTitle">
                <div class="blockTitle">Skills</div>
                <div class="muted small">Type a skill and press Enter</div>
              </div>

              <div class="skillInput">
                <input
                  class="input"
                  [formControl]="skillDraft"
                  placeholder="TypeScript, Angular, SQL..."
                  (keydown.enter)="addSkill(); $event.preventDefault()"
                />
                <button class="btn" type="button" (click)="addSkill()">Add</button>
              </div>

              <div class="chips">
                @for (s of skills(); track s) {
                  <button class="chip" type="button" (click)="removeSkill(s)" title="Remove">
                    {{ s }} <span class="x">×</span>
                  </button>
                }
              </div>
            </div>

            <div class="card card-pad">
              <div class="rowTitle">
                <div class="blockTitle">Experience</div>
                <button class="btn" type="button" (click)="addExperience()">+ Add</button>
              </div>

              @for (grp of experience().controls; track $index) {
                <div class="item">
                  <div class="itemHead">
                    <div class="itemTitle">
                      {{ grp.controls.role.value || 'New role' }} · {{ grp.controls.company.value || 'Company' }}
                    </div>
                    <div class="itemBtns">
                      <button class="btn tiny" type="button" (click)="moveExperience($index, -1)" [disabled]="$index === 0">↑</button>
                      <button class="btn tiny" type="button" (click)="moveExperience($index, 1)" [disabled]="$index === experience().length - 1">↓</button>
                      <button class="btn tiny" type="button" (click)="removeExperience($index)">Remove</button>
                    </div>
                  </div>

                  <div class="two">
                    <div>
                      <label class="label">Role</label>
                      <input class="input" [formControl]="grp.controls.role" placeholder="Frontend Intern" />
                    </div>
                    <div>
                      <label class="label">Company</label>
                      <input class="input" [formControl]="grp.controls.company" placeholder="TechCorp" />
                    </div>
                  </div>

                  <div class="two">
                    <div>
                      <label class="label">Start</label>
                      <input class="input" [formControl]="grp.controls.start" placeholder="Jun 2025" />
                    </div>
                    <div>
                      <label class="label">End</label>
                      <input class="input" [formControl]="grp.controls.end" placeholder="Sep 2025 / Present" />
                    </div>
                  </div>

                  <div>
                    <label class="label">Location</label>
                    <input class="input" [formControl]="grp.controls.location" placeholder="Remote / Sofia" />
                  </div>

                  <div class="bullets">
                    <div class="rowTitle">
                      <div class="muted">Bullet points</div>
                      <button class="btn tiny" type="button" (click)="addBullet(grp.controls.bullets)">+ Bullet</button>
                    </div>

                    @for (b of grp.controls.bullets.controls; track $index) {
                      <div class="bulletRow">
                        <input class="input" [formControl]="b" placeholder="Built X, improved Y by Z%..." />
                        <button class="btn tiny" type="button" (click)="removeBullet(grp.controls.bullets, $index)">Remove</button>
                      </div>
                    }
                  </div>
                </div>
              }
            </div>

            <div class="card card-pad">
              <div class="rowTitle">
                <div class="blockTitle">Education</div>
                <button class="btn" type="button" (click)="addEducation()">+ Add</button>
              </div>

              @for (grp of education().controls; track $index) {
                <div class="item">
                  <div class="itemHead">
                    <div class="itemTitle">
                      {{ grp.controls.degree.value || 'Degree' }} · {{ grp.controls.school.value || 'School' }}
                    </div>
                    <div class="itemBtns">
                      <button class="btn tiny" type="button" (click)="removeEducation($index)">Remove</button>
                    </div>
                  </div>

                  <div class="two">
                    <div>
                      <label class="label">School</label>
                      <input class="input" [formControl]="grp.controls.school" placeholder="University of..." />
                    </div>
                    <div>
                      <label class="label">Degree</label>
                      <input class="input" [formControl]="grp.controls.degree" placeholder="BSc Computer Science" />
                    </div>
                  </div>

                  <div class="two">
                    <div>
                      <label class="label">Start</label>
                      <input class="input" [formControl]="grp.controls.start" placeholder="2022" />
                    </div>
                    <div>
                      <label class="label">End</label>
                      <input class="input" [formControl]="grp.controls.end" placeholder="2026" />
                    </div>
                  </div>

                  <div>
                    <label class="label">Location</label>
                    <input class="input" [formControl]="grp.controls.location" placeholder="Sofia" />
                  </div>

                  <div>
                    <label class="label">Notes</label>
                    <textarea class="input" style="min-height: 80px; padding-top: 12px;" [formControl]="grp.controls.notes"
                      placeholder="GPA, awards, relevant coursework..."></textarea>
                  </div>
                </div>
              }
            </div>

            <div class="card card-pad">
              <div class="rowTitle">
                <div class="blockTitle">Projects</div>
                <button class="btn" type="button" (click)="addProject()">+ Add</button>
              </div>

              @for (grp of projects().controls; track $index) {
                <div class="item">
                  <div class="itemHead">
                    <div class="itemTitle">
                      {{ grp.controls.name.value || 'Project' }}
                    </div>
                    <div class="itemBtns">
                      <button class="btn tiny" type="button" (click)="removeProject($index)">Remove</button>
                    </div>
                  </div>

                  <div class="two">
                    <div>
                      <label class="label">Name</label>
                      <input class="input" [formControl]="grp.controls.name" placeholder="Portfolio Builder" />
                    </div>
                    <div>
                      <label class="label">Link</label>
                      <input class="input" [formControl]="grp.controls.link" placeholder="https://github.com/..." />
                    </div>
                  </div>

                  <div>
                    <label class="label">Description</label>
                    <textarea class="input" style="min-height: 80px; padding-top: 12px;"
                      [formControl]="grp.controls.description"
                      placeholder="One sentence describing what it is."></textarea>
                  </div>

                  <div class="bullets">
                    <div class="rowTitle">
                      <div class="muted">Bullet points</div>
                      <button class="btn tiny" type="button" (click)="addBullet(grp.controls.bullets)">+ Bullet</button>
                    </div>

                    @for (b of grp.controls.bullets.controls; track $index) {
                      <div class="bulletRow">
                        <input class="input" [formControl]="b" placeholder="Implemented X using Y..." />
                        <button class="btn tiny" type="button" (click)="removeBullet(grp.controls.bullets, $index)">Remove</button>
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- RIGHT: PREVIEW -->
          <aside class="previewCol">
            <div class="previewWrap">
              <div id="cvPrint" class="cvPaper">
                <div class="cvHead">
                  <div class="name">{{ value().basics.fullName || 'Your Name' }}</div>
                  <div class="role">{{ value().basics.title || 'Your Title' }}</div>

                  <div class="contact">
                    @if (value().basics.email) { <span>{{ value().basics.email }}</span> }
                    @if (value().basics.phone) { <span>{{ value().basics.phone }}</span> }
                    @if (value().basics.location) { <span>{{ value().basics.location }}</span> }
                    @if (value().basics.website) { <span>{{ value().basics.website }}</span> }
                    @if (value().basics.linkedin) { <span>{{ value().basics.linkedin }}</span> }
                    @if (value().basics.github) { <span>{{ value().basics.github }}</span> }
                  </div>
                </div>

                @if (value().basics.summary) {
                  <div class="cvSection">
                    <div class="cvTitle">Summary</div>
                    <div class="cvText">{{ value().basics.summary }}</div>
                  </div>
                }

                @if (value().skills.length) {
                  <div class="cvSection">
                    <div class="cvTitle">Skills</div>
                    <div class="cvSkills">
                      @for (s of value().skills; track s) {
                        <span class="cvSkill">{{ s }}</span>
                      }
                    </div>
                  </div>
                }

                @if (value().experience.length) {
                  <div class="cvSection">
                    <div class="cvTitle">Experience</div>

                    @for (e of value().experience; track e.company + e.role + e.start) {
                      <div class="cvItem">
                        <div class="cvItemTop">
                          <div class="cvItemMain">
                            <span class="cvItemRole">{{ e.role }}</span>
                            <span class="cvItemSep">·</span>
                            <span class="cvItemOrg">{{ e.company }}</span>
                          </div>
                          <div class="cvItemSide">
                            <span>{{ e.start }}</span>
                            <span>–</span>
                            <span>{{ e.end }}</span>
                            @if (e.location) { <span class="cvDot">•</span><span>{{ e.location }}</span> }
                          </div>
                        </div>
                        @if (e.bullets?.length) {
                          <ul class="cvList">
                            @for (b of e.bullets; track b) { <li>{{ b }}</li> }
                          </ul>
                        }
                      </div>
                    }
                  </div>
                }

                @if (value().projects.length) {
                  <div class="cvSection">
                    <div class="cvTitle">Projects</div>

                    @for (p of value().projects; track p.name) {
                      <div class="cvItem">
                        <div class="cvItemTop">
                          <div class="cvItemMain">
                            <span class="cvItemRole">{{ p.name }}</span>
                            @if (p.link) { <span class="cvItemSep">·</span><span class="cvItemOrg">{{ p.link }}</span> }
                          </div>
                        </div>
                        @if (p.description) { <div class="cvText" style="margin-top:6px;">{{ p.description }}</div> }
                        @if (p.bullets?.length) {
                          <ul class="cvList">
                            @for (b of p.bullets; track b) { <li>{{ b }}</li> }
                          </ul>
                        }
                      </div>
                    }
                  </div>
                }

                @if (value().education.length) {
                  <div class="cvSection">
                    <div class="cvTitle">Education</div>

                    @for (ed of value().education; track ed.school + ed.degree) {
                      <div class="cvItem">
                        <div class="cvItemTop">
                          <div class="cvItemMain">
                            <span class="cvItemRole">{{ ed.degree }}</span>
                            <span class="cvItemSep">·</span>
                            <span class="cvItemOrg">{{ ed.school }}</span>
                          </div>
                          <div class="cvItemSide">
                            <span>{{ ed.start }}</span>
                            <span>–</span>
                            <span>{{ ed.end }}</span>
                            @if (ed.location) { <span class="cvDot">•</span><span>{{ ed.location }}</span> }
                          </div>
                        </div>
                        @if (ed.notes) { <div class="cvText" style="margin-top:6px;">{{ ed.notes }}</div> }
                      </div>
                    }
                  </div>
                }
              </div>
            </div>

            <div class="hint muted small">
              Tip: “Print / Save PDF” uses your browser’s PDF printer. Set margins to “None” if available.
            </div>
          </aside>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .cvWrap { padding-top: 26px; }
    .head{ display:flex; justify-content: space-between; gap: 14px; align-items: flex-start; flex-wrap: wrap; margin-bottom: 18px; }
    .h1{ margin: 0; font-size: 34px; font-weight: 950; letter-spacing: -0.02em; }
    .sub{ margin: 8px 0 0; color: color-mix(in srgb, var(--foreground) 60%, transparent); }

    .headBtns{ display:flex; gap: 10px; flex-wrap: wrap; align-items:center; }
    .fileBtn{ position: relative; overflow:hidden; }
    .fileBtn input{ position:absolute; inset:0; opacity:0; cursor:pointer; }

    .grid{
      display:grid;
      grid-template-columns: 1.05fr 0.95fr;
      gap: 16px;
      align-items: start;
    }
    @media (max-width: 1100px){
      .grid{ grid-template-columns: 1fr; }
      .previewCol{ order: -1; }
    }

    .builder{ display:flex; flex-direction: column; gap: 14px; }
    .blockTitle{ font-weight: 950; margin-bottom: 14px; letter-spacing: -0.01em; }
    .rowTitle{ display:flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 12px; }
    .two{ display:grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
    @media (max-width: 680px){ .two{ grid-template-columns: 1fr; } }

    .skillInput{ display:flex; gap: 10px; align-items:center; }
    .chips{ margin-top: 12px; display:flex; flex-wrap: wrap; gap: 8px; }
    .chip{
      border: 1px solid var(--border);
      background: rgba(255,255,255,0.03);
      color: var(--foreground);
      border-radius: 999px;
      padding: 6px 10px;
      cursor:pointer;
      transition: background 160ms ease, border-color 160ms ease, transform 120ms ease;
      display:inline-flex; gap: 8px; align-items:center;
    }
    .chip:hover{ background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.12); }
    .chip:active{ transform: translateY(1px); }
    .x{ opacity: .7; }

    .item{
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 14px;
      background: rgba(255,255,255,0.02);
      margin-top: 12px;
    }
    .itemHead{ display:flex; justify-content: space-between; gap: 10px; align-items: center; margin-bottom: 12px; }
    .itemTitle{ font-weight: 900; }
    .itemBtns{ display:flex; gap: 8px; align-items: center; }

    .tiny{ height: 34px; padding: 0 10px; font-size: 12px; border-radius: 10px; }

    .bullets{ margin-top: 12px; }
    .bulletRow{ display:flex; gap: 10px; align-items:center; margin-top: 10px; }

    .previewCol{ position: sticky; top: 86px; }
    .previewWrap{ border-radius: 18px; border: 1px solid var(--border); background: rgba(255,255,255,0.02); padding: 14px; }
    .cvPaper{
      background: #fff;
      color: #111;
      border-radius: 10px;
      padding: 26px;
      min-height: 860px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.12);
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
    }

    .cvHead{ border-bottom: 1px solid rgba(0,0,0,0.08); padding-bottom: 14px; margin-bottom: 14px; }
    .name{ font-size: 28px; font-weight: 800; letter-spacing: -0.02em; }
    .role{ margin-top: 4px; font-size: 14px; opacity: .8; }
    .contact{ margin-top: 10px; display:flex; flex-wrap: wrap; gap: 10px; font-size: 12px; opacity: .85; }
    .contact span{ white-space: nowrap; }

    .cvSection{ margin-top: 14px; }
    .cvTitle{ font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: .08em; opacity: .75; }
    .cvText{ margin-top: 8px; font-size: 13px; line-height: 1.6; }

    .cvSkills{ margin-top: 10px; display:flex; flex-wrap: wrap; gap: 8px; }
    .cvSkill{ font-size: 12px; padding: 4px 8px; border: 1px solid rgba(0,0,0,0.12); border-radius: 999px; }

    .cvItem{ margin-top: 12px; }
    .cvItemTop{ display:flex; justify-content: space-between; gap: 12px; align-items: baseline; }
    .cvItemMain{ font-size: 13px; font-weight: 700; }
    .cvItemRole{ font-weight: 800; }
    .cvItemOrg{ opacity: .85; font-weight: 650; }
    .cvItemSide{ font-size: 12px; opacity: .75; display:flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }
    .cvItemSep{ opacity: .5; margin: 0 6px; }
    .cvDot{ opacity: .5; margin: 0 2px; }

    .cvList{ margin: 8px 0 0; padding-left: 18px; font-size: 12.5px; line-height: 1.55; opacity: .95; }

    .hint{ margin-top: 10px; }

    /* Print: only the CV page */
    @media print {
      body * { visibility: hidden !important; }
      #cvPrint, #cvPrint * { visibility: visible !important; }
      #cvPrint {
        position: fixed;
        inset: 0;
        padding: 0;
        margin: 0;
        border: none;
        box-shadow: none;
        background: #fff;
      }
      .cvPaper {
        box-shadow: none !important;
        border-radius: 0 !important;
        min-height: auto !important;
      }
    }
  `],
})
export class CvMakerPage {
  private fb = inject(FormBuilder);

  // Form root
  form = this.fb.group({
    basics: this.fb.group({
      fullName: this.fb.control('', { validators: [Validators.required] }),
      title: this.fb.control(''),
      email: this.fb.control(''),
      phone: this.fb.control(''),
      location: this.fb.control(''),
      website: this.fb.control(''),
      linkedin: this.fb.control(''),
      github: this.fb.control(''),
      summary: this.fb.control(''),
    }),
    skills: this.fb.control<string[]>([]),
    experience: this.fb.array<FormGroup>([]),
    education: this.fb.array<FormGroup>([]),
    projects: this.fb.array<FormGroup>([]),
  });

  // Draft skill input
  skillDraft = new FormControl<string>('', { nonNullable: true });

  // Helpers
  basics = signal(this.form.controls.basics as FormGroup);
  experience = signal(this.form.controls.experience as FormArray<FormGroup>);
  education = signal(this.form.controls.education as FormArray<FormGroup>);
  projects = signal(this.form.controls.projects as FormArray<FormGroup>);
  skills = signal<string[]>([]);

  // Derived data for preview
  value = computed<CvData>(() => {
    const b = (this.form.value.basics ?? {}) as Partial<CvBasics>;
    return {
      basics: {
        fullName: b.fullName ?? '',
        title: b.title ?? '',
        email: b.email ?? '',
        phone: b.phone ?? '',
        location: b.location ?? '',
        website: b.website ?? '',
        linkedin: b.linkedin ?? '',
        github: b.github ?? '',
        summary: b.summary ?? '',
      },
      skills: this.skills(),
      experience: this.experience().controls.map((g) => this.mapExperience(g)),
      education: this.education().controls.map((g) => this.mapEducation(g)),
      projects: this.projects().controls.map((g) => this.mapProject(g)),
    };
  });

  constructor() {
    // Load from storage (or seed defaults)
    const loaded = this.loadFromStorage();
    if (loaded) {
      this.applyData(loaded);
    } else {
      this.seed();
    }

    // Autosave
    effect(() => {
      const data = this.value(); // track everything
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    });
  }

  // ----- Experience group factory
  private expGroup(v?: Partial<CvExperience>) {
    return this.fb.group({
      company: this.fb.control(v?.company ?? ''),
      role: this.fb.control(v?.role ?? ''),
      start: this.fb.control(v?.start ?? ''),
      end: this.fb.control(v?.end ?? ''),
      location: this.fb.control(v?.location ?? ''),
      bullets: this.fb.array<FormControl<string>>(
        (v?.bullets?.length ? v.bullets : ['']).map((x) => this.fb.control(x ?? '', { nonNullable: true }))
      ),
    });
  }

  private eduGroup(v?: Partial<CvEducation>) {
    return this.fb.group({
      school: this.fb.control(v?.school ?? ''),
      degree: this.fb.control(v?.degree ?? ''),
      start: this.fb.control(v?.start ?? ''),
      end: this.fb.control(v?.end ?? ''),
      location: this.fb.control(v?.location ?? ''),
      notes: this.fb.control(v?.notes ?? ''),
    });
  }

  private projGroup(v?: Partial<CvProject>) {
    return this.fb.group({
      name: this.fb.control(v?.name ?? ''),
      link: this.fb.control(v?.link ?? ''),
      description: this.fb.control(v?.description ?? ''),
      bullets: this.fb.array<FormControl<string>>(
        (v?.bullets?.length ? v.bullets : ['']).map((x) => this.fb.control(x ?? '', { nonNullable: true }))
      ),
    });
  }

  // ----- Mapping
  private mapExperience(g: FormGroup): CvExperience {
    const v = g.value as any;
    return {
      company: v.company ?? '',
      role: v.role ?? '',
      start: v.start ?? '',
      end: v.end ?? '',
      location: v.location ?? '',
      bullets: (v.bullets ?? []).filter((x: string) => (x ?? '').trim().length > 0),
    };
  }

  private mapEducation(g: FormGroup): CvEducation {
    const v = g.value as any;
    return {
      school: v.school ?? '',
      degree: v.degree ?? '',
      start: v.start ?? '',
      end: v.end ?? '',
      location: v.location ?? '',
      notes: v.notes ?? '',
    };
  }

  private mapProject(g: FormGroup): CvProject {
    const v = g.value as any;
    return {
      name: v.name ?? '',
      link: v.link ?? '',
      description: v.description ?? '',
      bullets: (v.bullets ?? []).filter((x: string) => (x ?? '').trim().length > 0),
    };
  }

  // ----- UI Actions
  addSkill() {
    const raw = (this.skillDraft.value ?? '').trim();
    if (!raw) return;

    const parts = raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const set = new Set(this.skills().map((s) => s.toLowerCase()));
    const next = [...this.skills()];

    for (const p of parts) {
      if (!set.has(p.toLowerCase())) next.push(p);
    }

    this.skills.set(next);
    this.form.controls.skills.setValue(next);
    this.skillDraft.setValue('');
  }

  removeSkill(s: string) {
    const next = this.skills().filter((x) => x !== s);
    this.skills.set(next);
    this.form.controls.skills.setValue(next);
  }

  addExperience() {
    this.experience().push(this.expGroup());
  }
  removeExperience(i: number) {
    this.experience().removeAt(i);
  }
  moveExperience(i: number, delta: number) {
    const arr = this.experience();
    const to = i + delta;
    if (to < 0 || to >= arr.length) return;
    const item = arr.at(i);
    arr.removeAt(i);
    arr.insert(to, item);
  }

  addEducation() {
    this.education().push(this.eduGroup());
  }
  removeEducation(i: number) {
    this.education().removeAt(i);
  }

  addProject() {
    this.projects().push(this.projGroup());
  }
  removeProject(i: number) {
    this.projects().removeAt(i);
  }

  addBullet(bullets: FormArray<FormControl<string>>) {
    bullets.push(this.fb.control('', { nonNullable: true }));
  }
  removeBullet(bullets: FormArray<FormControl<string>>, i: number) {
    bullets.removeAt(i);
    if (bullets.length === 0) bullets.push(this.fb.control('', { nonNullable: true }));
  }

  printCv() {
    // Uses @media print rules above (prints only the CV)
    window.print();
  }

  downloadJson() {
    const data = this.value();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'softlytic-cv.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  loadJson(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const f = input.files?.[0];
    if (!f) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as CvData;
        this.applyData(parsed);
        input.value = '';
      } catch {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(f);
  }

  reset() {
    localStorage.removeItem(STORAGE_KEY);
    this.form.reset();
    this.experience().clear();
    this.education().clear();
    this.projects().clear();
    this.skills.set([]);
    this.form.controls.skills.setValue([]);
    this.seed();
  }

  // ----- Storage + seeding
  private loadFromStorage(): CvData | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as CvData;
    } catch {
      return null;
    }
  }

  private applyData(data: CvData) {
    this.form.controls.basics.patchValue(data.basics);
    this.skills.set(data.skills ?? []);
    this.form.controls.skills.setValue(data.skills ?? []);

    this.experience().clear();
    (data.experience ?? []).forEach((e) => this.experience().push(this.expGroup(e)));
    if (this.experience().length === 0) this.experience().push(this.expGroup());

    this.education().clear();
    (data.education ?? []).forEach((e) => this.education().push(this.eduGroup(e)));
    if (this.education().length === 0) this.education().push(this.eduGroup());

    this.projects().clear();
    (data.projects ?? []).forEach((p) => this.projects().push(this.projGroup(p)));
    if (this.projects().length === 0) this.projects().push(this.projGroup());
  }

  private seed() {
    // Good-looking defaults so it doesn’t feel empty
    this.form.controls.basics.patchValue({
      fullName: 'Your Name',
      title: 'Software Engineer (Internship)',
      location: 'Sofia, Bulgaria',
      email: 'you@email.com',
      github: 'github.com/yourname',
      linkedin: 'linkedin.com/in/yourname',
      summary:
        'Motivated student developer focused on clean UI, reliable logic, and shipping. Looking for an internship to contribute and learn in a product team.',
    });

    this.skills.set(['TypeScript', 'Angular', 'HTML/CSS', 'Git', 'REST APIs']);
    this.form.controls.skills.setValue(this.skills());

    this.experience().push(
      this.expGroup({
        role: 'Frontend Intern',
        company: 'Example Company',
        start: 'Jun 2025',
        end: 'Sep 2025',
        location: 'Remote',
        bullets: [
          'Built reusable UI components and improved page responsiveness.',
          'Integrated REST endpoints and handled loading / error states.',
          'Collaborated with designers to achieve pixel-perfect layouts.',
        ],
      })
    );

    this.education().push(
      this.eduGroup({
        school: 'University Name',
        degree: 'BSc Computer Science',
        start: '2022',
        end: '2026',
        location: 'Sofia',
        notes: 'Relevant coursework: Data Structures, Web Development, Databases.',
      })
    );

    this.projects().push(
      this.projGroup({
        name: 'Internship Tracker',
        link: 'github.com/yourname/internship-tracker',
        description: 'A simple app to track applications, statuses, and reminders.',
        bullets: ['Angular + signals state', 'Filtering & search', 'Local persistence'],
      })
    );
  }
}
