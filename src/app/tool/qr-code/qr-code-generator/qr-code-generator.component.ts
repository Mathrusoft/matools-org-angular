import { Component } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { Meta, SafeUrl, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-qr-code-generator',
  standalone: true,
  imports: [CommonModule, FormsModule, QRCodeModule],
  templateUrl: './qr-code-generator.component.html',
  styleUrl: './qr-code-generator.component.css'
})
export class QrCodeGeneratorComponent {
  titleText = 'Generate QR Code | maTools'
  descriptionText = 'Generate QR Code online for Free. Custom QR Code Generator from maTools'
  url = 'https://matools.org/' + 'generate-qr-code'
  siteName = 'maTools.org'
  twitterAccId = '@mathrusoft'
  keyWords = 'qr code generator, generate qr code free, generate qr code for website, qr, qr code, create qr code, , make qr code'

  constructor(private meta: Meta,
    private title: Title,
    private route: ActivatedRoute,
    private analytics: AngularFireAnalytics) {

      this.meta.updateTag({ name: 'robots', content: `noodp,index,follow,all`});
      this.title.setTitle(`${this.titleText}`);
      this.meta.updateTag({ name: 'description', content: `${this.descriptionText}`});
      this.meta.updateTag({ name: 'keywords', content: `${this.keyWords}`});

      this.meta.updateTag({ name: 'og:type', content: `website`});
      this.meta.updateTag({ name: 'og:url', content: `${this.url}`});
      this.meta.updateTag({ name: 'og:title', content: `${this.titleText}`});
      this.meta.updateTag({ name: 'og:description', content: `${this.descriptionText}`});
      this.meta.updateTag({ name: 'og:site_name', content: `${this.siteName}`});

      this.meta.updateTag({ name: 'twitter:site', content: `${this.twitterAccId}`});
      this.meta.updateTag({ name: 'twitter:account_id', content: `${this.titleText}`});
      this.meta.updateTag({ name: 'twitter:title', content: `${this.titleText}`});
      this.meta.updateTag({ name: 'twitter:description', content: `${this.descriptionText}`});

      this.logPageView();
  }

  logPageView() {
    this.analytics.logEvent('page_view', { page_path: '/' });
  }


  inputText = ''
  public qrCodeDownloadLink: SafeUrl = "";
  width = 256
  colorLight : string = '#ffffff'; 
  colorDark : string = '#000000'; 

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  saveAsPng(): void {
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    if (qrCodeContainer) {
      html2canvas(qrCodeContainer).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = this.inputText + '.png';
        link.click();
      });
    }
  }

}
