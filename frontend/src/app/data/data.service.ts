import { Injectable, computed, signal } from '@angular/core';
import type { Company, Job } from './mock-data';
import { companies, jobs } from './mock-data';

@Injectable({ providedIn: 'root' })
export class DataService {
  // Raw data
  companies = signal<Company[]>(companies);
  jobs = signal<Job[]>(jobs);

  // ---------------------------
  // Companies: filters + lists
  // ---------------------------
  companyQuery = signal<string>('');
  companyIndustry = signal<string>('All Industries');
  companySize = signal<string>('All Sizes');

  industries = computed<string[]>(() => {
    const set = new Set(this.companies().map((c: Company) => c.industry));
    return ['All Industries', ...Array.from(set)];
  });

  sizes = computed<string[]>(() => {
    const set = new Set(this.companies().map((c: Company) => c.size));
    return ['All Sizes', ...Array.from(set)];
  });

  filteredCompanies = computed<Company[]>(() => {
    const q = this.companyQuery().trim().toLowerCase();
    const ind = this.companyIndustry();
    const size = this.companySize();

    return this.companies().filter((c: Company) => {
      const matchesQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.blurb.toLowerCase().includes(q) ||
        c.tags.some((t: string) => t.toLowerCase().includes(q));

      const matchesInd = ind === 'All Industries' || c.industry === ind;
      const matchesSize = size === 'All Sizes' || c.size === size;

      return matchesQ && matchesInd && matchesSize;
    });
  });

  // ---------------------------
  // Jobs: filters + lists
  // ---------------------------
  jobQuery = signal<string>('');
  jobLocation = signal<string>('All Locations');
  jobType = signal<string>('All Types');
  jobCategory = signal<string>('All Categories');

  // NOTE: your Jobs page expects these names:
  // jobLocations(), jobTypes(), jobCategories()
  jobLocations = computed<string[]>(() => {
    const set = new Set(this.jobs().map((j: Job) => j.location));
    return ['All Locations', ...Array.from(set)];
  });

  jobTypes = computed<string[]>(() => {
    const set = new Set(this.jobs().map((j: Job) => j.jobType));
    return ['All Types', ...Array.from(set)];
  });

  jobCategories = computed<string[]>(() => {
    const set = new Set(this.jobs().map((j: Job) => j.category));
    return ['All Categories', ...Array.from(set)];
  });

  filteredJobs = computed<Job[]>(() => {
    const q = this.jobQuery().trim().toLowerCase();
    const loc = this.jobLocation();
    const type = this.jobType();
    const cat = this.jobCategory();

    return this.jobs().filter((j: Job) => {
      const matchesQ =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.companyName.toLowerCase().includes(q) ||
        j.tags.some((t: string) => t.toLowerCase().includes(q));

      const matchesLoc = loc === 'All Locations' || j.location === loc;
      const matchesType = type === 'All Types' || j.jobType === type;
      const matchesCat = cat === 'All Categories' || j.category === cat;

      return matchesQ && matchesLoc && matchesType && matchesCat;
    });
  });

  // ---------------------------
  // Detail helpers
  // ---------------------------
  getCompany(id: string): Company | undefined {
    return this.companies().find((c: Company) => c.id === id);
  }

  getCompanyJobs(companyId: string): Job[] {
    return this.jobs().filter((j: Job) => j.companyId === companyId);
  }

  getJob(id: string): Job | undefined {
    return this.jobs().find((j: Job) => j.id === id);
  }

  // ---------------------------
  // Home helpers
  // ---------------------------
  featuredJobs = computed<Job[]>(() => this.jobs().slice(0, 3));
  featuredCompanies = computed<Company[]>(() => this.companies().slice(0, 6));
}
