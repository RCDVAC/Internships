import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage) },

  { path: 'jobs', loadComponent: () => import('./pages/jobs/jobs.page').then(m => m.JobsPage) },
  { path: 'jobs/:id', loadComponent: () => import('./pages/job-detail/job-detail.page').then(m => m.JobDetailPage) },

  { path: 'companies', loadComponent: () => import('./pages/companies/companies.page').then(m => m.CompaniesPage) },
  { path: 'companies/:id', loadComponent: () => import('./pages/company-detail/company.detail.page').then(m => m.CompanyDetailPage) },

  { path: 'cv-maker', loadComponent: () => import('./pages/cv-maker/cv.maker.page').then(m => m.CvMakerPage) },
  { path: 'chat-room', loadComponent: () => import('./pages/chat-room/chat-room.page').then(m => m.ChatRoomPage) },
  { path: 'resources', loadComponent: () => import('./pages/resources/resources.page').then(m => m.ResourcesPage) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.page').then(m => m.ContactPage) },

  { path: '**', redirectTo: '' },
];
