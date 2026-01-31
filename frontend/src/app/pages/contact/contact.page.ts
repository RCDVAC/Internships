import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Faq = { q: string; a: string; open: boolean };

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="section">
      <div class="container">
        <div class="centerHead">
          <h1 class="title">Get in Touch</h1>
          <p class="subtitle">
            Have questions or need assistance? We're here to help you succeed in your internship search
          </p>
        </div>

        <div class="grid3 cardsTop">
          <div class="card card-pad contactCard">
            <div class="icon">✉️</div>
            <div class="ct">Email</div>
            <div class="muted">Send us an email anytime</div>
            <div class="strong">support@internhub.com</div>
          </div>

          <div class="card card-pad contactCard">
            <div class="icon">📞</div>
            <div class="ct">Phone</div>
            <div class="muted">Mon-Fri from 9am to 6pm</div>
            <div class="strong">+1 (555) 123-4567</div>
          </div>

          <div class="card card-pad contactCard">
            <div class="icon">📍</div>
            <div class="ct">Office</div>
            <div class="muted">Visit us in person</div>
            <div class="strong">Bulgaria Boulevard, Sofia, Bulgaria</div>
          </div>
        </div>

        <div class="grid2 lower">
          <div class="card card-pad">
            <div class="boxTitle">💬 Send Us a Message</div>
            <div class="muted">Fill out the form below and we'll get back to you within 24 hours</div>

            <div class="form" style="margin-top: 16px;">
              <div>
                <label class="label">Full Name</label>
                <input class="input" placeholder="John Doe" [(ngModel)]="name" />
              </div>

              <div>
                <label class="label">Email Address</label>
                <input class="input" placeholder="john@example.com" [(ngModel)]="email" />
              </div>

              <div>
                <label class="label">Subject</label>
                <select [(ngModel)]="subject">
                  <option value="" disabled>Select a subject</option>
                  <option>General question</option>
                  <option>Internship listings</option>
                  <option>Company partnerships</option>
                  <option>Technical support</option>
                </select>
              </div>

              <div>
                <label class="label">Message</label>
                <textarea placeholder="Tell us how we can help you..." [(ngModel)]="message"></textarea>
              </div>

              <button class="btn btn-primary" type="button" (click)="submit()">Send Message</button>
            </div>
          </div>

          <div class="card card-pad">
            <div class="boxTitle">❓ Frequently Asked Questions</div>
            <div class="muted">Quick answers to common questions</div>

            <div class="faq">
              @for (f of faqs(); track f.q) {
                <button class="faqItem" type="button" (click)="toggle(f.q)">
                  <div class="q">{{ f.q }}</div>
                  <div class="chev">{{ f.open ? '−' : '+' }}</div>
                </button>
                @if (f.open) {
                  <div class="a">{{ f.a }}</div>
                }
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .centerHead { text-align:center; margin-top: 8px; }
    .title { font-size: 44px; letter-spacing: -0.02em; margin: 0; font-weight: 900; }
    .subtitle {
      margin-top: 10px;
      color: color-mix(in srgb, var(--foreground) 60%, transparent);
      max-width: 620px;
      margin-left:auto;
      margin-right:auto;
      line-height: 1.7;
    }

    .grid3 { margin-top: 34px; display:grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
    .grid2 { margin-top: 18px; display:grid; grid-template-columns: 1.2fr 1fr; gap: 18px; }
    @media (max-width: 980px){
      .grid3 { grid-template-columns: 1fr; }
      .grid2 { grid-template-columns: 1fr; }
    }

    .contactCard { text-align:center; padding: 26px 22px; }
    .icon {
      width: 52px; height: 52px;
      margin: 0 auto 14px;
      border-radius: 999px;
      display:grid; place-items:center;
      border: 1px solid var(--border);
      background: rgba(255,255,255,0.03);
      font-size: 20px;
    }
    .ct { font-weight: 900; margin-top: 2px; }
    .strong { margin-top: 10px; color: var(--foreground); font-weight: 800; }

    .boxTitle { font-weight: 900; margin-bottom: 6px; }
    .muted { color: color-mix(in srgb, var(--foreground) 60%, transparent); font-size: 13px; line-height: 1.6; }

    .form { display:flex; flex-direction: column; gap: 14px; }
    textarea { min-height: 140px; }

    .faq { margin-top: 14px; }
    .faqItem {
      width: 100%;
      display:flex;
      justify-content: space-between;
      align-items:center;
      gap: 12px;
      padding: 14px 12px;
      border-radius: 12px;
      border: 1px solid var(--border);
      background: rgba(255,255,255,0.02);
      color: var(--foreground);
      cursor: pointer;
      text-align: left;
      margin-top: 10px;
    }
    .faqItem:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.12); }
    .q { font-weight: 800; }
    .chev { opacity: .7; font-size: 18px; }
    .a {
      padding: 12px 12px 2px 12px;
      opacity: .8;
      line-height: 1.7;
    }
  `]
})
export class ContactPage {
  name = '';
  email = '';
  subject = '';
  message = '';

  faqs = signal<Faq[]>([
    {
      q: 'How do I apply for internships?',
      a: `Browse our job listings, click on positions that interest you, and follow the application instructions.`,
      open: true,
    },
    {
      q: 'Is InternHub free to use?',
      a: `Yes! InternHub is completely free for students and job seekers.`,
      open: false,
    },
    {
      q: 'How do I create a profile?',
      a: `Click on the profile icon in the navigation bar and follow the setup process.`,
      open: false,
    },
    {
      q: 'Can companies post internships?',
      a: `Yes, companies can create accounts and post internship opportunities on our platform.`,
      open: false,
    },
  ]);

  toggle(q: string) {
    this.faqs.set(this.faqs().map(f => (f.q === q ? { ...f, open: !f.open } : f)));
  }

  submit() {
    if (!this.name.trim() || !this.email.trim() || !this.subject.trim() || !this.message.trim()) {
      alert('Please fill out all fields.');
      return;
    }
    alert(`Message sent!\n\nName: ${this.name}\nEmail: ${this.email}\nSubject: ${this.subject}`);
    this.name = '';
    this.email = '';
    this.subject = '';
    this.message = '';
  }
}
