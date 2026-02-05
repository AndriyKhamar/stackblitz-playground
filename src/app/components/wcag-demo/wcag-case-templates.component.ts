import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FocusTrapMode } from '../../models/focus-trap-mode.enum';

@Component({
  selector: 'wcag-case-templates',
  templateUrl: './wcag-case-templates.component.html',
  styleUrls: ['./wcag-case-templates.component.scss'],
})
export class WcagCaseTemplatesComponent implements OnDestroy {
  readonly FocusTrapMode = FocusTrapMode;

  private readonly pointerGestureSwapStates = new Map<
    string,
    {
      order: Array<'a' | 'b'>;
      mountedLastSeenMs: number;
    }
  >();

  private pointerGestureSwapCleanupHandle: any | null = null;

  private readonly sessionTimeoutStates = new Map<
    string,
    {
      remainingSeconds: number;
      phase: 'countdown' | 'expired' | 'prompt' | 'closed';
      mode: 'replace' | 'prompt';
      timerHandle: any | null;
      mountedLastSeenMs: number;
      modalKey?: string;
      modalFocusElementId?: string;
    }
  >();

  private sessionTimeoutCleanupHandle: any | null = null;

  private readonly carouselStates = new Map<
    string,
    {
      index: number;
      isPaused: boolean;
      timerHandle: any | null;
      mountedLastSeenMs: number;
      intervalMs: number;
    }
  >();

  private carouselCleanupHandle: any | null = null;

  private readonly languageDemoStates = new Map<
    string,
    {
      lang: 'es' | 'en';
      mountedLastSeenMs: number;
    }
  >();

  private languageDemoCleanupHandle: any | null = null;

  private readonly dataEntryDemoStates = new Map<
    string,
    {
      lastSentValue: string;
      mountedLastSeenMs: number;
    }
  >();

  private dataEntryDemoCleanupHandle: any | null = null;

  private readonly objectUrls: string[] = [];
  private readonly openPanels = new Set<string>();
  private readonly openModals = new Set<string>();
  private readonly modalOpeners = new Map<string, HTMLElement>();
  private readonly clickedNotes = new Set<string>();
  private readonly clickedNoteTimers = new Map<string, any>();

  private readonly flowerCaptionsVttEs =
    'WEBVTT\n\n' +
    '00:00.000 --> 00:02.500\n' +
    '[Música]\n\n' +
    '00:02.500 --> 00:05.500\n' +
    'Una flor se mueve con el viento.\n\n' +
    '00:05.500 --> 00:08.500\n' +
    'Cambio de plano a otra flor.\n';

  private readonly flowerDescriptionsVttEs =
    'WEBVTT\n\n' +
    '00:00.000 --> 00:03.000\n' +
    'Descripción: flor en primer plano con fondo desenfocado.\n\n' +
    '00:03.000 --> 00:06.000\n' +
    'Descripción: los pétalos se mueven suavemente.\n';

  readonly flowerCaptionsSrc: SafeResourceUrl;
  readonly flowerDescriptionsSrc: SafeResourceUrl;

  constructor(private readonly sanitizer: DomSanitizer) {
    const captionsUrl = this.createVttObjectUrl(this.flowerCaptionsVttEs);
    const descriptionsUrl = this.createVttObjectUrl(this.flowerDescriptionsVttEs);
    this.flowerCaptionsSrc = this.sanitizer.bypassSecurityTrustResourceUrl(captionsUrl);
    this.flowerDescriptionsSrc = this.sanitizer.bypassSecurityTrustResourceUrl(descriptionsUrl);
  }

  ngOnDestroy(): void {
    if (this.dataEntryDemoCleanupHandle) {
      try {
        clearInterval(this.dataEntryDemoCleanupHandle);
      } catch {
        // ignore
      }
      this.dataEntryDemoCleanupHandle = null;
    }

    if (this.languageDemoCleanupHandle) {
      try {
        clearInterval(this.languageDemoCleanupHandle);
      } catch {
        // ignore
      }
      this.languageDemoCleanupHandle = null;
    }

    if (this.pointerGestureSwapCleanupHandle) {
      try {
        clearInterval(this.pointerGestureSwapCleanupHandle);
      } catch {
        // ignore
      }
      this.pointerGestureSwapCleanupHandle = null;
    }

    if (this.sessionTimeoutCleanupHandle) {
      try {
        clearInterval(this.sessionTimeoutCleanupHandle);
      } catch {
        // ignore
      }
      this.sessionTimeoutCleanupHandle = null;
    }

    this.sessionTimeoutStates.forEach((state) => {
      if (state && state.timerHandle) {
        try {
          clearInterval(state.timerHandle);
        } catch {
          // ignore
        }
      }
    });

    if (this.carouselCleanupHandle) {
      try {
        clearInterval(this.carouselCleanupHandle);
      } catch {
        // ignore
      }
      this.carouselCleanupHandle = null;
    }

    this.carouselStates.forEach((state) => {
      if (state && state.timerHandle) {
        try {
          clearInterval(state.timerHandle);
        } catch {
          // ignore
        }
      }
    });

    this.clickedNoteTimers.forEach((handle) => {
      try {
        clearTimeout(handle);
      } catch {
        // ignore
      }
    });
    for (const url of this.objectUrls) {
      try {
        URL.revokeObjectURL(url);
      } catch {
        // ignore
      }
    }
  }

  isPanelOpen(panelKey: string): boolean {
    return this.openPanels.has(panelKey);
  }

  openPanel(panelKey: string): void {
    this.openPanels.add(panelKey);
  }

  closePanel(panelKey: string): void {
    this.openPanels.delete(panelKey);
  }

  togglePanel(panelKey: string): void {
    if (this.openPanels.has(panelKey)) {
      this.openPanels.delete(panelKey);
    } else {
      this.openPanels.add(panelKey);
    }
  }

  ensureDataEntryDemo(idPrefix: string, variant: 'inaccessible' | 'accessible'): boolean {
    const key = idPrefix + (variant === 'inaccessible' ? '-wcag-3-2-2-inacc' : '-wcag-3-2-2-acc');
    this.ensureDataEntryDemoCleanupTimer();

    const existing = this.dataEntryDemoStates.get(key);
    if (existing) {
      existing.mountedLastSeenMs = Date.now();
      return true;
    }

    this.dataEntryDemoStates.set(key, {
      lastSentValue: '',
      mountedLastSeenMs: Date.now(),
    });

    return true;
  }

  getDataEntryValue(idPrefix: string, variant: 'inaccessible' | 'accessible'): string {
    const key = idPrefix + (variant === 'inaccessible' ? '-wcag-3-2-2-inacc' : '-wcag-3-2-2-acc');
    const state = this.dataEntryDemoStates.get(key);
    return state ? state.lastSentValue : '';
  }

  onDataEntryBlur(idPrefix: string, variant: 'inaccessible', value: string): void {
    const key = idPrefix + '-wcag-3-2-2-inacc';
    this.ensureDataEntryDemo(idPrefix, variant);

    const state = this.dataEntryDemoStates.get(key);
    if (!state) return;

    state.lastSentValue = value || '';
    state.mountedLastSeenMs = Date.now();
    this.openPanel(idPrefix + '-wcag-3-2-2-panel-inacc');
  }

  onDataEntrySubmit(idPrefix: string, value: string): void {
    const key = idPrefix + '-wcag-3-2-2-acc';
    this.ensureDataEntryDemo(idPrefix, 'accessible');

    const state = this.dataEntryDemoStates.get(key);
    if (!state) return;

    state.lastSentValue = value || '';
    state.mountedLastSeenMs = Date.now();
    this.openPanel(idPrefix + '-wcag-3-2-2-panel-acc');
  }

  private ensureDataEntryDemoCleanupTimer(): void {
    if (this.dataEntryDemoCleanupHandle) return;

    this.dataEntryDemoCleanupHandle = setInterval(() => {
      const now = Date.now();

      this.dataEntryDemoStates.forEach((state, key) => {
        if (!state) return;
        if (now - (state.mountedLastSeenMs || 0) <= 1500) return;
        this.dataEntryDemoStates.delete(key);
      });
    }, 750);
  }

  isModalOpen(modalKey: string): boolean {
    return this.openModals.has(modalKey);
  }

  openModal(modalKey: string, focusElementId?: string): void {
    try {
      const opener = document.activeElement as HTMLElement | null;
      if (opener && typeof opener.focus === 'function') {
        this.modalOpeners.set(modalKey, opener);
      }
    } catch {
      // ignore
    }

    this.openModals.add(modalKey);

    if (focusElementId) {
      setTimeout(() => {
        try {
          const el = document.getElementById(focusElementId) as HTMLElement | null;
          if (el && typeof el.focus === 'function') {
            el.focus();
          }
        } catch {
          // ignore
        }
      }, 0);
    }
  }

  closeModal(modalKey: string): void {
    this.openModals.delete(modalKey);
    this.modalOpeners.delete(modalKey);
  }

  closeModalFromKeyboard(modalKey: string): void {
    const opener = this.modalOpeners.get(modalKey) || null;

    this.openModals.delete(modalKey);
    this.modalOpeners.delete(modalKey);

    if (!opener || typeof opener.focus !== 'function') return;

    setTimeout(() => {
      try {
        opener.focus();
      } catch {
        // ignore
      }
    }, 0);
  }

  ensureLanguageDemo(idPrefix: string): boolean {
    const key = idPrefix + '-wcag-3-1-1-lang';
    this.ensureLanguageDemoCleanupTimer();

    const existing = this.languageDemoStates.get(key);
    if (existing) {
      existing.mountedLastSeenMs = Date.now();
      return true;
    }

    this.languageDemoStates.set(key, {
      lang: 'es',
      mountedLastSeenMs: Date.now(),
    });

    return true;
  }

  getLanguageDemoLang(idPrefix: string): 'es' | 'en' {
    const key = idPrefix + '-wcag-3-1-1-lang';
    const state = this.languageDemoStates.get(key);
    return state ? state.lang : 'es';
  }

  onLanguageDemoChange(event: Event, idPrefix: string): void {
    const key = idPrefix + '-wcag-3-1-1-lang';
    const state = this.languageDemoStates.get(key);
    if (!state) {
      this.ensureLanguageDemo(idPrefix);
    }

    const latest = this.languageDemoStates.get(key);
    if (!latest) return;

    const select = (event && (event.target as any)) as HTMLSelectElement | null;
    const value = select && typeof select.value === 'string' ? select.value : 'es';

    latest.lang = value === 'en' ? 'en' : 'es';
    latest.mountedLastSeenMs = Date.now();
  }

  private ensureLanguageDemoCleanupTimer(): void {
    if (this.languageDemoCleanupHandle) return;

    this.languageDemoCleanupHandle = setInterval(() => {
      const now = Date.now();

      this.languageDemoStates.forEach((state, key) => {
        if (!state) return;
        if (now - (state.mountedLastSeenMs || 0) <= 1500) return;
        this.languageDemoStates.delete(key);
      });
    }, 750);
  }

  ensurePointerGestureSwap(idPrefix: string, variant: 'inaccessible' | 'accessible'): boolean {
    const key = idPrefix + (variant === 'inaccessible' ? '-wcag-2-5-1-inacc' : '-wcag-2-5-1-acc');
    this.ensurePointerGestureSwapCleanupTimer();

    const existing = this.pointerGestureSwapStates.get(key);
    if (existing) {
      existing.mountedLastSeenMs = Date.now();
      return true;
    }

    this.pointerGestureSwapStates.set(key, {
      order: ['a', 'b'],
      mountedLastSeenMs: Date.now(),
    });

    return true;
  }

  getPointerGestureOrder(idPrefix: string, variant: 'inaccessible' | 'accessible'): Array<'a' | 'b'> {
    const key = idPrefix + (variant === 'inaccessible' ? '-wcag-2-5-1-inacc' : '-wcag-2-5-1-acc');
    const state = this.pointerGestureSwapStates.get(key);
    return state ? state.order : ['a', 'b'];
  }

  swapPointerGestureOrder(idPrefix: string): void {
    const key = idPrefix + '-wcag-2-5-1-acc';
    const state = this.pointerGestureSwapStates.get(key);
    if (!state) {
      // Ensure state exists even if button is pressed before the template renders.
      this.pointerGestureSwapStates.set(key, { order: ['b', 'a'], mountedLastSeenMs: Date.now() });
      return;
    }

    state.order = [state.order[1], state.order[0]];
    state.mountedLastSeenMs = Date.now();
  }

  onPointerGestureDragStart(
    event: DragEvent,
    idPrefix: string,
    variant: 'inaccessible' | 'accessible',
    itemKey: 'a' | 'b'
  ): void {
    if (!event || !event.dataTransfer) return;

    // Ensure state exists so DnD works even if drag starts quickly.
    this.ensurePointerGestureSwap(idPrefix, variant);

    try {
      event.dataTransfer.setData('text/plain', itemKey);
      event.dataTransfer.effectAllowed = 'move';
    } catch {
      // ignore
    }
  }

  onPointerGestureDragOver(event: DragEvent): void {
    if (!event) return;
    event.preventDefault();

    try {
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }
    } catch {
      // ignore
    }
  }

  onPointerGestureDrop(
    event: DragEvent,
    idPrefix: string,
    variant: 'inaccessible' | 'accessible',
    targetKey: 'a' | 'b'
  ): void {
    if (!event) return;
    event.preventDefault();

    const key = idPrefix + (variant === 'inaccessible' ? '-wcag-2-5-1-inacc' : '-wcag-2-5-1-acc');
    const state = this.pointerGestureSwapStates.get(key);
    if (!state) return;

    let sourceKey: string | null = null;
    try {
      sourceKey = event.dataTransfer ? event.dataTransfer.getData('text/plain') : null;
    } catch {
      sourceKey = null;
    }

    if (sourceKey !== 'a' && sourceKey !== 'b') return;
    if (sourceKey === targetKey) return;

    const sourceIndex = state.order.indexOf(sourceKey);
    const targetIndex = state.order.indexOf(targetKey);
    if (sourceIndex === -1 || targetIndex === -1) return;

    const next = state.order.slice() as Array<'a' | 'b'>;
    next[sourceIndex] = targetKey;
    next[targetIndex] = sourceKey;
    state.order = next;
    state.mountedLastSeenMs = Date.now();
  }

  private ensurePointerGestureSwapCleanupTimer(): void {
    if (this.pointerGestureSwapCleanupHandle) return;

    this.pointerGestureSwapCleanupHandle = setInterval(() => {
      const now = Date.now();

      this.pointerGestureSwapStates.forEach((state, key) => {
        if (!state) return;
        if (now - (state.mountedLastSeenMs || 0) <= 1500) return;
        this.pointerGestureSwapStates.delete(key);
      });
    }, 750);
  }

  ensureSessionTimeoutInaccessible(idPrefix: string): boolean {
    const key = idPrefix + '-wcag-2-2-1-inacc';
    this.ensureSessionTimeoutCleanupTimer();

    const existing = this.sessionTimeoutStates.get(key);
    if (existing) {
      existing.mountedLastSeenMs = Date.now();
      return true;
    }

    this.sessionTimeoutStates.set(key, {
      remainingSeconds: 5,
      phase: 'countdown',
      mode: 'replace',
      timerHandle: null,
      mountedLastSeenMs: Date.now(),
    });

    this.startSessionTimeoutTimer(key);
    return true;
  }

  ensureSessionTimeoutAccessible(idPrefix: string): boolean {
    const key = idPrefix + '-wcag-2-2-1-acc';
    this.ensureSessionTimeoutCleanupTimer();

    const existing = this.sessionTimeoutStates.get(key);
    if (existing) {
      existing.mountedLastSeenMs = Date.now();
      return true;
    }

    this.sessionTimeoutStates.set(key, {
      remainingSeconds: 5,
      phase: 'countdown',
      mode: 'prompt',
      timerHandle: null,
      mountedLastSeenMs: Date.now(),
      modalKey: idPrefix + '-wcag-2-2-1-acc-modal',
      modalFocusElementId: idPrefix + '-wcag-2-2-1-acc-yes',
    });

    this.startSessionTimeoutTimer(key);
    return true;
  }

  getSessionTimeoutRemaining(idPrefix: string, variant: 'inaccessible' | 'accessible'): number {
    const key = idPrefix + (variant === 'inaccessible' ? '-wcag-2-2-1-inacc' : '-wcag-2-2-1-acc');
    const state = this.sessionTimeoutStates.get(key);
    return state ? state.remainingSeconds : 0;
  }

  isSessionTimeoutPhase(idPrefix: string, variant: 'inaccessible' | 'accessible', phase: 'countdown' | 'expired' | 'prompt' | 'closed'): boolean {
    const key = idPrefix + (variant === 'inaccessible' ? '-wcag-2-2-1-inacc' : '-wcag-2-2-1-acc');
    const state = this.sessionTimeoutStates.get(key);
    return !!state && state.phase === phase;
  }

  extendSessionTimeout(idPrefix: string, secondsToAdd: number, byKeyboard: boolean = false): void {
    const key = idPrefix + '-wcag-2-2-1-acc';
    const state = this.sessionTimeoutStates.get(key);
    if (!state) return;

    if (state.modalKey) {
      if (byKeyboard) {
        this.closeModalFromKeyboard(state.modalKey);
      } else {
        this.closeModal(state.modalKey);
      }
    }

    state.remainingSeconds = Math.max(0, state.remainingSeconds) + Math.max(1, secondsToAdd || 0);
    state.phase = 'countdown';
    this.startSessionTimeoutTimer(key);
  }

  declineSessionTimeoutExtension(idPrefix: string, byKeyboard: boolean = false): void {
    const key = idPrefix + '-wcag-2-2-1-acc';
    const state = this.sessionTimeoutStates.get(key);
    if (!state) return;

    if (state.modalKey) {
      if (byKeyboard) {
        this.closeModalFromKeyboard(state.modalKey);
      } else {
        this.closeModal(state.modalKey);
      }
    }

    state.remainingSeconds = 0;
    state.phase = 'closed';
  }

  private startSessionTimeoutTimer(key: string): void {
    const state = this.sessionTimeoutStates.get(key);
    if (!state) return;
    if (state.timerHandle) return;

    // Keep running while the template is mounted. Cleanup stops it once the case collapses.
    state.timerHandle = setInterval(() => {
      const latest = this.sessionTimeoutStates.get(key);
      if (!latest) return;

      if (latest.phase !== 'countdown') return;

      latest.remainingSeconds = Math.max(0, (latest.remainingSeconds || 0) - 1);
      if (latest.remainingSeconds > 0) return;

      if (latest.mode === 'replace') {
        latest.phase = 'expired';
        return;
      }

      latest.phase = 'prompt';
      if (latest.modalKey) {
        this.openModal(latest.modalKey, latest.modalFocusElementId);
      }
    }, 1000);
  }

  private ensureSessionTimeoutCleanupTimer(): void {
    if (this.sessionTimeoutCleanupHandle) return;

    // When the case collapses, the template stops calling ensureSessionTimeoutX().
    // We detect that and clear state so reopening starts from 5 seconds again.
    this.sessionTimeoutCleanupHandle = setInterval(() => {
      const now = Date.now();

      this.sessionTimeoutStates.forEach((state, key) => {
        if (!state) return;
        if (now - (state.mountedLastSeenMs || 0) <= 1500) return;

        if (state.timerHandle) {
          try {
            clearInterval(state.timerHandle);
          } catch {
            // ignore
          }
        }

        if (state.modalKey && this.isModalOpen(state.modalKey)) {
          this.closeModal(state.modalKey);
        }

        this.sessionTimeoutStates.delete(key);
      });
    }, 750);
  }

  ensureCarouselInaccessible(idPrefix: string): boolean {
    const key = idPrefix + '-wcag-2-2-2-inacc';
    this.ensureCarouselCleanupTimer();

    const existing = this.carouselStates.get(key);
    if (existing) {
      existing.mountedLastSeenMs = Date.now();
      return true;
    }

    this.carouselStates.set(key, {
      index: 0,
      isPaused: false,
      timerHandle: null,
      mountedLastSeenMs: Date.now(),
      intervalMs: 1000,
    });

    this.startCarouselTimer(key, 2);
    return true;
  }

  ensureCarouselAccessible(idPrefix: string): boolean {
    const key = idPrefix + '-wcag-2-2-2-acc';
    this.ensureCarouselCleanupTimer();

    const existing = this.carouselStates.get(key);
    if (existing) {
      existing.mountedLastSeenMs = Date.now();
      return true;
    }

    this.carouselStates.set(key, {
      index: 0,
      isPaused: false,
      timerHandle: null,
      mountedLastSeenMs: Date.now(),
      intervalMs: 1000,
    });

    this.startCarouselTimer(key, 2);
    return true;
  }

  getCarouselIndex(idPrefix: string, variant: 'inaccessible' | 'accessible'): number {
    const key = idPrefix + (variant === 'inaccessible' ? '-wcag-2-2-2-inacc' : '-wcag-2-2-2-acc');
    const state = this.carouselStates.get(key);
    return state ? state.index : 0;
  }

  isCarouselPaused(idPrefix: string): boolean {
    const key = idPrefix + '-wcag-2-2-2-acc';
    const state = this.carouselStates.get(key);
    return !!state && !!state.isPaused;
  }

  toggleCarouselPaused(idPrefix: string): void {
    const key = idPrefix + '-wcag-2-2-2-acc';
    const state = this.carouselStates.get(key);
    if (!state) return;
    state.isPaused = !state.isPaused;
  }

  carouselPrev(idPrefix: string): void {
    const key = idPrefix + '-wcag-2-2-2-acc';
    const state = this.carouselStates.get(key);
    if (!state) return;
    state.index = (state.index - 1 + 2) % 2;
  }

  carouselNext(idPrefix: string): void {
    const key = idPrefix + '-wcag-2-2-2-acc';
    const state = this.carouselStates.get(key);
    if (!state) return;
    state.index = (state.index + 1) % 2;
  }

  private startCarouselTimer(key: string, totalSlides: number): void {
    const state = this.carouselStates.get(key);
    if (!state) return;
    if (state.timerHandle) return;

    state.timerHandle = setInterval(() => {
      const latest = this.carouselStates.get(key);
      if (!latest) return;

      // Accessible variant supports pause.
      if (key.endsWith('-wcag-2-2-2-acc') && latest.isPaused) return;

      latest.index = (latest.index + 1) % Math.max(1, totalSlides);
    }, Math.max(250, state.intervalMs || 1000));
  }

  private ensureCarouselCleanupTimer(): void {
    if (this.carouselCleanupHandle) return;

    this.carouselCleanupHandle = setInterval(() => {
      const now = Date.now();

      this.carouselStates.forEach((state, key) => {
        if (!state) return;
        if (now - (state.mountedLastSeenMs || 0) <= 1500) return;

        if (state.timerHandle) {
          try {
            clearInterval(state.timerHandle);
          } catch {
            // ignore
          }
        }

        this.carouselStates.delete(key);
      });
    }, 750);
  }

  blockTabOnKeydown(event: KeyboardEvent): void {
    if (!event) return;
    if (event.key === 'Tab') {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  blockTabAndEscapeOnKeydown(event: KeyboardEvent): void {
    if (!event) return;
    if (event.key === 'Tab' || event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  isClickedNoteVisible(noteKey: string): boolean {
    return this.clickedNotes.has(noteKey);
  }

  showClickedNote(noteKey: string): void {
    this.clickedNotes.add(noteKey);

    const existing = this.clickedNoteTimers.get(noteKey);
    if (existing) {
      try {
        clearTimeout(existing);
      } catch {
        // ignore
      }
    }

    const handle = setTimeout(() => {
      this.clickedNotes.delete(noteKey);
      this.clickedNoteTimers.delete(noteKey);
    }, 1000);

    this.clickedNoteTimers.set(noteKey, handle);
  }

  onButtonLikeKeydown(event: KeyboardEvent, noteKey: string): void {
    const key = (event && (event.key || (event as any).code)) as string;
    if (key !== 'Enter' && key !== ' ') {
      return;
    }

    event.preventDefault();
    this.showClickedNote(noteKey);
  }

  enableDefaultSubtitles(event: Event): void {
    const video = event.target as HTMLVideoElement | null;
    if (!video) {
      return;
    }

    this.enableDefaultSubtitlesFor(video);
  }

  private enableDefaultSubtitlesFor(video: HTMLVideoElement): void {
    const apply = () => {
      const tracks = video.textTracks;
      if (!tracks || tracks.length === 0) {
        return;
      }

      let preferredIndex = -1;
      for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];
        if (track.kind === 'subtitles' || track.kind === 'captions') {
          preferredIndex = i;
          break;
        }
      }

      if (preferredIndex === -1) {
        return;
      }

      for (let i = 0; i < tracks.length; i++) {
        try {
          tracks[i].mode = i === preferredIndex ? 'showing' : 'disabled';
        } catch {
          // ignore
        }
      }
    };

    apply();
    setTimeout(apply, 0);
    setTimeout(apply, 250);
  }

  private createVttObjectUrl(vttText: string): string {
    const blob = new Blob([vttText], { type: 'text/vtt;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    this.objectUrls.push(url);
    return url;
  }
}
