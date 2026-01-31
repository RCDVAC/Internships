import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, computed, effect, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

type ChatMessage = {
  id: string;
  author: string;
  text: string;
  ts: number;
  system?: boolean;
};

const STORAGE_KEY = 'softlytic.chat.v1';

function uid() {
  return Math.random().toString(16).slice(2) + '-' + Date.now().toString(16);
}

function loadState(): { name: string; messages: ChatMessage[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { name: '', messages: [] };
    const parsed = JSON.parse(raw) as { name?: string; messages?: ChatMessage[] };
    return {
      name: typeof parsed.name === 'string' ? parsed.name : '',
      messages: Array.isArray(parsed.messages) ? parsed.messages : [],
    };
  } catch {
    return { name: '', messages: [] };
  }
}

function saveState(state: { name: string; messages: ChatMessage[] }) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors (private mode etc.)
  }
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  template: `
    <section class="section">
      <div class="container">
        <div class="pageHead">
          <h1 class="title">Chat Room</h1>
          <p class="subtitle">Connect with other job seekers and professionals</p>
        </div>

        <!-- JOIN -->
        @if (!joined()) {
          <div class="gridJoin">
            <div class="card card-pad joinCard">
              <div class="joinIcon">👥</div>
              <h2 class="h2">Join Chat Room</h2>
              <p class="muted">Enter a display name to start chatting.</p>

              <div class="formRow">
                <label class="label">Your name</label>
                <input
                  class="input"
                  [(ngModel)]="nameDraft"
                  (keydown.enter)="tryJoin()"
                  placeholder="Enter your name"
                />
              </div>

              <button class="btn btnPrimary" (click)="tryJoin()" [disabled]="!canJoin()">
                Join Chat Room
              </button>

              <div class="note">
                <strong>Note:</strong> This is a local demo chat (no backend yet). Messages are saved in your browser.
                When you’re ready, we can upgrade this to real-time WebSocket multi-user chat.
              </div>
            </div>

            <div class="card card-pad tipsCard">
              <h3 class="h3">What you can do here</h3>
              <ul class="tips">
                <li>Ask for CV feedback</li>
                <li>Share internship leads</li>
                <li>Discuss interview prep</li>
                <li>Network with others</li>
              </ul>

              <div class="divider"></div>

              <h3 class="h3">Privacy</h3>
              <p class="muted">
                Messages are stored only in your own browser (localStorage) until we add a backend.
              </p>

              <button class="btn btnGhost" (click)="resetChat()">
                Clear local chat data
              </button>
            </div>
          </div>
        }

        <!-- CHAT -->
        @if (joined()) {
          <div class="chatShell">
            <div class="card chatHeader">
              <div class="left">
                <div class="pillOnline">
                  <span class="dot"></span> Online (Demo)
                </div>
                <div class="who">
                  You’re chatting as <strong>{{ userName() }}</strong>
                </div>
              </div>

              <div class="right">
                <button class="btn btnGhost" (click)="addBotMessage()">
                  Simulate Reply
                </button>
                <button class="btn btnGhost" (click)="leave()">
                  Leave
                </button>
                <button class="btn btnDanger" (click)="resetChat()">
                  Clear Chat
                </button>
              </div>
            </div>

            <div class="card chatBody" #scrollHost>
              @if (messages().length === 0) {
                <div class="emptyState">
                  <div class="emptyIcon">💬</div>
                  <h3 class="h3">No messages yet</h3>
                  <p class="muted">Say hi to start the conversation.</p>
                </div>
              }

              <div class="msgList">
                @for (m of messages(); track m.id) {
                  @if (m.system) {
                    <div class="systemLine">
                      <span>{{ m.text }}</span>
                      <span class="systemTime">{{ m.ts | date:'shortTime' }}</span>
                    </div>
                  } @else {
                    <div class="msgRow" [class.me]="isMe(m)">
                      <div class="bubble">
                        <div class="meta">
                          <span class="author">{{ m.author }}</span>
                          <span class="time">{{ m.ts | date:'shortTime' }}</span>
                        </div>
                        <div class="text" [innerText]="m.text"></div>
                      </div>
                    </div>
                  }
                }
              </div>
            </div>

            <div class="card chatComposer">
              <div class="composerGrid">
                <textarea
                  class="textarea"
                  [(ngModel)]="draft"
                  (keydown)="onComposerKeydown($event)"
                  placeholder="Write a message… (Enter to send, Shift+Enter for new line)"
                ></textarea>

                <button class="btn btnPrimary sendBtn" (click)="send()" [disabled]="!canSend()">
                  Send
                </button>
              </div>

              <div class="composerHint">
                Tip: Use <kbd>Shift</kbd> + <kbd>Enter</kbd> for a new line.
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [
    `
      /* Layout helpers aligned with your existing style */
      .section {
        padding: 48px 0;
      }
      .container {
        width: min(1100px, calc(100% - 32px));
        margin: 0 auto;
      }

      .pageHead {
        margin-bottom: 18px;
      }
      .title {
        font-size: 44px;
        line-height: 1.1;
        margin: 0 0 8px;
        font-weight: 800;
        letter-spacing: -0.02em;
      }
      .subtitle {
        margin: 0;
        color: var(--muted-foreground);
      }

      .card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
        backdrop-filter: blur(10px);
      }
      .card-pad {
        padding: 22px;
      }

      .gridJoin {
        display: grid;
        gap: 16px;
        grid-template-columns: 1.2fr 0.8fr;
        align-items: start;
      }
      @media (max-width: 900px) {
        .gridJoin {
          grid-template-columns: 1fr;
        }
      }

      .joinCard {
        text-align: left;
      }
      .joinIcon {
        width: 44px;
        height: 44px;
        display: grid;
        place-items: center;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.06);
        margin-bottom: 14px;
        font-size: 20px;
      }

      .h2 {
        margin: 0 0 6px;
        font-size: 22px;
        font-weight: 800;
      }
      .h3 {
        margin: 0 0 10px;
        font-size: 16px;
        font-weight: 800;
      }
      .muted {
        color: var(--muted-foreground);
        margin: 0 0 16px;
        line-height: 1.6;
      }

      .formRow {
        display: grid;
        gap: 8px;
        margin: 14px 0 14px;
      }
      .label {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.72);
      }
      .input,
      .textarea {
        width: 100%;
        background: rgba(0, 0, 0, 0.35);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.92);
        border-radius: 12px;
        outline: none;
      }
      .input {
        height: 44px;
        padding: 0 12px;
      }
      .textarea {
        min-height: 56px;
        max-height: 140px;
        padding: 12px;
        resize: vertical;
      }
      .input:focus,
      .textarea:focus {
        border-color: rgba(255, 255, 255, 0.22);
        box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.06);
      }

      .btn {
        height: 42px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(255, 255, 255, 0.06);
        color: rgba(255, 255, 255, 0.9);
        padding: 0 14px;
        cursor: pointer;
        font-weight: 700;
      }
      .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btnPrimary {
        background: rgba(255, 255, 255, 0.92);
        color: rgba(0, 0, 0, 0.92);
        border-color: rgba(255, 255, 255, 0.8);
      }
      .btnPrimary:hover:not(:disabled) {
        transform: translateY(-1px);
      }
      .btnGhost:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.09);
      }
      .btnDanger {
        background: rgba(255, 0, 80, 0.14);
        border-color: rgba(255, 0, 80, 0.28);
      }
      .btnDanger:hover:not(:disabled) {
        background: rgba(255, 0, 80, 0.18);
      }

      .note {
        margin-top: 14px;
        padding: 12px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.72);
        line-height: 1.6;
        font-size: 13px;
      }
      .tips {
        margin: 0;
        padding-left: 18px;
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.7;
      }
      .divider {
        height: 1px;
        background: rgba(255, 255, 255, 0.08);
        margin: 16px 0;
      }

      /* Chat layout */
      .chatShell {
        display: grid;
        gap: 14px;
      }
      .chatHeader {
        padding: 14px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
      }
      .chatHeader .left {
        display: grid;
        gap: 6px;
      }
      .chatHeader .right {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }
      .who {
        color: rgba(255, 255, 255, 0.72);
        font-size: 13px;
      }

      .pillOnline {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        width: fit-content;
        padding: 6px 10px;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(255, 255, 255, 0.04);
        font-size: 12px;
        color: rgba(255, 255, 255, 0.85);
        font-weight: 700;
      }
      .dot {
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: #3cff9b;
        box-shadow: 0 0 0 4px rgba(60, 255, 155, 0.12);
      }

      .chatBody {
        height: min(58vh, 520px);
        padding: 14px;
        overflow: auto;
      }
      .emptyState {
        height: 100%;
        display: grid;
        place-items: center;
        text-align: center;
        gap: 8px;
        padding: 20px;
      }
      .emptyIcon {
        width: 56px;
        height: 56px;
        border-radius: 16px;
        display: grid;
        place-items: center;
        background: rgba(255, 255, 255, 0.06);
        font-size: 22px;
        margin: 0 auto;
      }

      .msgList {
        display: grid;
        gap: 10px;
      }
      .systemLine {
        display: flex;
        justify-content: center;
        gap: 10px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
      }
      .systemTime {
        opacity: 0.7;
      }

      .msgRow {
        display: flex;
        justify-content: flex-start;
      }
      .msgRow.me {
        justify-content: flex-end;
      }
      .bubble {
        width: min(620px, 90%);
        background: rgba(0, 0, 0, 0.32);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 14px;
        padding: 10px 12px;
      }
      .msgRow.me .bubble {
        background: rgba(255, 255, 255, 0.9);
        color: rgba(0, 0, 0, 0.9);
        border-color: rgba(255, 255, 255, 0.75);
      }
      .meta {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 6px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.7);
      }
      .msgRow.me .meta {
        color: rgba(0, 0, 0, 0.65);
      }
      .author {
        font-weight: 800;
      }
      .text {
        white-space: pre-wrap;
        line-height: 1.6;
        font-size: 14px;
      }

      .chatComposer {
        padding: 12px;
      }
      .composerGrid {
        display: grid;
        grid-template-columns: 1fr 120px;
        gap: 10px;
        align-items: stretch;
      }
      @media (max-width: 700px) {
        .composerGrid {
          grid-template-columns: 1fr;
        }
      }
      .sendBtn {
        height: auto;
        min-height: 56px;
      }
      .composerHint {
        margin-top: 8px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.62);
      }
      kbd {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        padding: 2px 6px;
        border-radius: 8px;
        font-size: 12px;
      }
    `,
  ],
})
export class ChatRoomPage {
  scrollHost = viewChild<ElementRef<HTMLDivElement>>('scrollHost');

  private loaded = loadState();

  userName = signal<string>(this.loaded.name || '');
  nameDraft = this.loaded.name || '';

  joined = computed(() => this.userName().trim().length >= 2);

  draft = '';
  messages = signal<ChatMessage[]>(this.loaded.messages || []);

  constructor() {
    // Ensure there is a friendly welcome if empty
    if (this.messages().length === 0) {
      this.messages.set([
        {
          id: uid(),
          author: 'System',
          text: 'Welcome! Start a conversation — share what you’re looking for or ask a question.',
          ts: Date.now(),
          system: true,
        },
      ]);
    }

    // persist
    effect(() => {
      saveState({ name: this.userName(), messages: this.messages() });
    });

    // auto-scroll on new messages
    effect(() => {
      this.messages();
      queueMicrotask(() => this.scrollToBottom());
    });
  }

  canJoin() {
    return (this.nameDraft || '').trim().length >= 2;
  }

  tryJoin() {
    const n = (this.nameDraft || '').trim();
    if (n.length < 2) return;

    const firstJoin = !this.joined();
    this.userName.set(n);

    if (firstJoin) {
      this.pushSystem(`${n} joined the chat`);
      // Optional: add a small auto reply so it feels alive
      setTimeout(() => this.addBotMessage(), 450);
    }
  }

  leave() {
    const n = this.userName().trim();
    if (n) this.pushSystem(`${n} left the chat`);
    this.userName.set('');
    this.nameDraft = '';
    this.draft = '';
  }

  canSend() {
    return this.joined() && (this.draft || '').trim().length > 0;
  }

  send() {
    if (!this.canSend()) return;

    const text = (this.draft || '').trimEnd();
    this.draft = '';

    this.messages.set([
      ...this.messages(),
      {
        id: uid(),
        author: this.userName(),
        text,
        ts: Date.now(),
      },
    ]);

    // Optional bot reply to simulate conversation
    setTimeout(() => {
      if (Math.random() < 0.55) this.addBotMessage(text);
    }, 650);
  }

  onComposerKeydown(e: KeyboardEvent) {
    // Enter sends (unless Shift+Enter)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.send();
    }
  }

  isMe(m: ChatMessage) {
    return !m.system && m.author === this.userName();
  }

  addBotMessage(context?: string) {
    const replies = [
      'Nice — what field are you aiming for?',
      'If you want, paste your CV summary and I’ll suggest improvements.',
      'Have you tried filtering internships by location + tech stack?',
      'Tip: keep your project bullets impact-focused (metrics help).',
      'What’s your target role? Frontend, backend, data, security?',
      'If you want real-time chat next, we can add WebSockets quickly.',
    ];

    const contextual = context?.toLowerCase().includes('cv')
      ? 'Want me to help structure your CV sections (impact bullets + keywords)?'
      : context?.toLowerCase().includes('intern')
        ? 'Which internship category are you applying for (engineering/design/marketing)?'
        : undefined;

    const msg = contextual ?? replies[Math.floor(Math.random() * replies.length)];

    this.messages.set([
      ...this.messages(),
      {
        id: uid(),
        author: 'Softlytic Bot',
        text: msg,
        ts: Date.now(),
      },
    ]);
  }

  resetChat() {
    // Clear local storage + reset signals
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    this.userName.set('');
    this.nameDraft = '';
    this.draft = '';
    this.messages.set([
      {
        id: uid(),
        author: 'System',
        text: 'Chat cleared. Enter your name to join again.',
        ts: Date.now(),
        system: true,
      },
    ]);
  }

  private pushSystem(text: string) {
    this.messages.set([
      ...this.messages(),
      { id: uid(), author: 'System', text, ts: Date.now(), system: true },
    ]);
  }

  private scrollToBottom() {
    const host = this.scrollHost()?.nativeElement;
    if (!host) return;
    host.scrollTop = host.scrollHeight;
  }
}
