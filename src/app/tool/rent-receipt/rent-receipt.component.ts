import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { generateMonthlyData } from '../../utils/utils';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rent-receipt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rent-receipt.component.html',
  styleUrls: ['./rent-receipt.component.css'],
})
export class RentReceiptComponent {
  titleText = 'Online Rent Receipt | maTools'
  descriptionText = 'Generate Online Rent Receipt for Free with out sharing your personal details'
  url = 'https://matools.org/rent-receipt'
  siteName = 'maTools.org'
  twitterAccId = '@mathrusoft'
  keyWords = 'Rent Receipt, Online Rent Receipt, Generate Rent Recipt, Generate Rent Receipt online, mutual funds, MF Investment India, investing in mutual funds, top mutual funds, best mutual funds, sip calculator, tax saving mutual funds, elss,sip,online mutual funds investment'

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


  // Form fields
  // employeeName: string = 'Sharan';
  // employeeId: string = '1299';
  // houseAddress: string = ' ad as asdas adasdsad asdas ';
  // rentAmount: number = 200000;
  // houseOwnerName: string = 'Prashant Gupts';
  // houseOwnerPan: string = 'ASDDD9090J';
  // fromDate: string = '';
  // toDate: string = '';

  employeeName: string = '';
  employeeId: string = '';
  houseAddress: string = '';
  rentAmount: number = 0;
  houseOwnerName: string = '';
  houseOwnerPan: string = '';
  fromDate: string = '';
  toDate: string = '';


  currentDate: Date = new Date();
  receiptNo: number = 1;
  dateResut = []
  isReceiptGenerated: boolean = false;
  result: { month: string; startDate: string; endDate: string; receiptDate: string }[] = [];

  error = ''
  index = 0
  // Generate the receipt
  generateReceipt(): void {
    this.index = 0
    this.receiptNo = 1
    this.error = ''
    const fromDate = new Date(this.fromDate);
    const toDate = new Date(this.toDate);
    this.result = generateMonthlyData(fromDate, toDate, new Date())

    if(generateMonthlyData(fromDate, toDate, new Date()).length <= 0) {
      this.error = "Error: The duration between startDate and endDate exceeds 12 months."
      return
    }

    this.isReceiptGenerated = true;
  }

  // Get current month and year for the receipt header
  get currentMonthYear(): string {
    const options = { month: 'long', year: 'numeric' } as Intl.DateTimeFormatOptions;
    return this.currentDate.toLocaleDateString('en-US', options);
  }

  downloadPDF() {
    var element = document.getElementById('rentReceipt');

    if(!element) {
      return
    }

    const rentReceiptsonWeb = element.querySelectorAll('.rent-receipt'); // Select all rent-receipt divs

    console.log(" rentReceiptsonWeb " + rentReceiptsonWeb)
    
    try {
      this.processPDF(rentReceiptsonWeb)
    } catch (error) {
      this.error = 'Error in downloading PDF, for better performance use on Big screen device'
    }

  }


  processPDF(divs: NodeListOf<Element>) {
    const pdf = new jsPDF();
    let yOffset = 10; // Vertical offset in the PDF
    const margin = 10; // Left margin
    let pageHeight = pdf.internal.pageSize.height;

    divs.forEach((div, index) => {
      const element = div as HTMLElement; // Cast to HTMLElement
      const elementHeight = element.offsetHeight;

      // Render the HTML element using html2canvas
      html2canvas(element, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pdf.internal.pageSize.width - margin * 2; // Adjust to fit within margins
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Check if the content fits on the current page, add a new page if necessary
        if (yOffset + imgHeight > pageHeight) {
          pdf.addPage();
          yOffset = 10; // Reset the yOffset for the new page
        }

        pdf.addImage(imgData, 'PNG', margin, yOffset, imgWidth, imgHeight);
        yOffset += imgHeight + 10; // Add some spacing after the receipt

        // Save the PDF once all receipts have been processed
        if (index === divs.length - 1) {
          pdf.save('rent-receipts.pdf');
        }
      });
    });
  }

}