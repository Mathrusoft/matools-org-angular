import { Component } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { Meta, SafeUrl, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-multi-qr-generator',
  standalone: true,
  imports: [CommonModule, FormsModule, QRCodeModule],
  templateUrl: './multi-qr-generator.component.html',
  styleUrl: './multi-qr-generator.component.css'
})
export class MultiQrGeneratorComponent {
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


  error = ''
  inputText = ''
  textArray: string[] = [];
  qrCodeArray: string[] = [];

  showBottomQrCodeValue = true

  public qrCodeDownloadLink: SafeUrl = "";
  width = 300
  colorLight : string = '#ffffff'; 
  colorDark : string = '#000000'; 

  colorLightForQRCode = this.colorLight
  counter = 1
  colorDarkForQRCode = this.colorDark

  get inputTextValue(): string {
    return this.inputText;
  }
  
  set inputTextValue(value: string) {
    this.inputText = value;
    this.textArray = value.split('\n');
  }



  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }


  generateQRCodes() {
    if (Array.isArray(this.textArray) && this.textArray.length > 0) {
      this.qrCodeArray = this.textArray.slice(0, 27);
    } else {
      this.qrCodeArray = []; // Assign an empty array if textArray is null or empty
    }

    this.colorLightForQRCode = this.colorLight
    this.colorDarkForQRCode = this.colorDark
  }
  
  downloadPDF() {
    var element = document.getElementById('rentReceipt');

    if(!element) {
      return
    }

    const rentReceiptsonWeb = element.querySelectorAll('.qrCodeItem'); // Select all rent-receipt divs

    console.log(" rentReceiptsonWeb " + rentReceiptsonWeb)
    
    try {
      this.processPDF(rentReceiptsonWeb)
    } catch (error) {
      this.error = 'Error in downloading PDF, for better performance use on Big screen device'
    }

  }


  processPDF(divs: NodeListOf<Element>) {
    const pdf = new jsPDF();
    const margin = 10; // Left margin
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    const imgWidth = (pageWidth - margin * 2) / 3 - 5; // Width for 3 items per row with spacing
    let rowHeight = 0; // Tracks max height of the current row
  
    let xOffset = margin;
    let yOffset = margin;
    let itemsPerRow = 3;
    let itemIndex = 0;
  
    divs.forEach((div, index) => {
      const element = div as HTMLElement; // Cast to HTMLElement
  
      html2canvas(element, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
        // If starting a new row, reset xOffset
        if (itemIndex % itemsPerRow === 0 && itemIndex !== 0) {
          xOffset = margin;
          yOffset += rowHeight + 10; // Move to the next row
          rowHeight = 0; // Reset row height
        }
  
        // If content exceeds the page height, add a new page
        if (yOffset + imgHeight > pageHeight - margin) {
          pdf.addPage();
          yOffset = margin; // Reset to top of new page
          xOffset = margin;
        }
  
        pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
        xOffset += imgWidth + 5; // Move to the next column with spacing
  
        // Track max height of the current row
        rowHeight = Math.max(rowHeight, imgHeight);
  
        itemIndex++;
  
        // Save PDF after processing all items
        if (index === divs.length - 1) {
          pdf.save('multi_qr_code_images.pdf');
        }
      });
    });
  }
  

}
