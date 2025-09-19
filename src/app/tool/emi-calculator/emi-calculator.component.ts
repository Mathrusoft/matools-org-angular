import { Component } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IndianCurrencyFormatterPipe } from '../../pip/indian-currency-formatter.pipe';

@Component({
  selector: 'app-emi-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, IndianCurrencyFormatterPipe],
  templateUrl: './emi-calculator.component.html',
  styleUrl: './emi-calculator.component.css'
})
export class EmiCalculatorComponent  {
  titleText = 'EMI Calculator | maTools'
  descriptionText = 'EMI Calculator - maTools online Loan EMI Calculator. Calculate Equated Monthly Installment (EMI) for your loan with Flexible EMI Calculator Online. Helps you to calculate Accurate yearly and monthly installment amount of your loan.'
  url = 'https://matools.org/emi-calculator'
  siteName = 'maTools.org'
  twitterAccId = '@mathrusoft'
  keyWords = 'EMI Calculator, EMI, Loan, Loan calculator, Lend online'

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


  loanAmount: number = 1000000;
  interestRate: number = 6.5;
  loanTenure: number = 5;
  emi: number = 0;
  totalInterest: number = 0;
  totalPrincipal: number = 0;
  totalPayment: number = 0;
  repaymentProgress: number = 0;

  ngOnInit() {
    this.calculateEMI()
  }

  calculateEMI(): void {
    if(!this.loanAmount || !this.interestRate || !this.loanTenure) {
      return
    }

    const monthlyRate = this.interestRate / 12 / 100;
    const totalMonths = this.loanTenure * 12;

    // EMI formula
    this.emi =
      (this.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    // Total payment and breakdown
    const totalPayment = this.emi * totalMonths;
    
    // Calculate total interest and total principal
    this.totalInterest = totalPayment - this.loanAmount;
    this.totalPrincipal = this.loanAmount; // Principal remains the same as the loan amount

  }

  setQuickAmount(amount: number): void {
    this.loanAmount = amount;
    this.calculateEMI();
  }

  // Sector Chart Methods
  getPrincipalDashArray(): string {
    if (this.totalPrincipal === 0 && this.totalInterest === 0) return '0 502.4';
    const circumference = 502.4; // 2 * PI * 80
    const principalPercentage = this.totalPrincipal / (this.totalPrincipal + this.totalInterest);
    const principalLength = circumference * principalPercentage;
    return `${principalLength} ${circumference}`;
  }

  getInterestDashArray(): string {
    if (this.totalPrincipal === 0 && this.totalInterest === 0) return '0 502.4';
    const circumference = 502.4; // 2 * PI * 80
    const interestPercentage = this.totalInterest / (this.totalPrincipal + this.totalInterest);
    const interestLength = circumference * interestPercentage;
    return `${interestLength} ${circumference}`;
  }

  getInterestDashOffset(): number {
    if (this.totalPrincipal === 0 && this.totalInterest === 0) return 0;
    const circumference = 502.4; // 2 * PI * 80
    const principalPercentage = this.totalPrincipal / (this.totalPrincipal + this.totalInterest);
    return -circumference * principalPercentage;
  }


}
