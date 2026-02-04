import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'wcag-case-templates',
  templateUrl: './wcag-case-templates.component.html',
  styleUrls: ['./wcag-case-templates.component.scss'],
})
export class WcagCaseTemplatesComponent implements OnDestroy {
  private readonly objectUrls: string[] = [];
  private readonly openPanels = new Set<string>();

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

  togglePanel(panelKey: string): void {
    if (this.openPanels.has(panelKey)) {
      this.openPanels.delete(panelKey);
    } else {
      this.openPanels.add(panelKey);
    }
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
