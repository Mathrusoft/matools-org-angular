import { Component } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-compare',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-compare.component.html',
  styleUrl: './list-compare.component.css'
})
export class ListCompareComponent {
  titleText = 'Compare list | maTools'
  descriptionText = 'Compare two lists. maTools is a free online tool. Easy way to compare two list without using Excel'
  url = 'https://matools.org/' + 'compare-list'
  siteName = 'maTools.org'
  twitterAccId = '@mathrusoft'
  keyWords = 'compare, two, lists, instagram, followers, follows, excel, formula, comparing, list, unique, uniques, value, values, common, duplicate, duplicates'

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

  date = new Date()
  titleA = 'List A'
  titleB = 'List B'

  listA = ''
  listB = ''

//   listA = `Apple
// apple
// banana
// mango
// grapes
// apple`

//   listB = `banana
// mango
// Pineapple
// Grapes
// mango`

  onlyInListA = ''
  onlyInListB = ''
  onListAandB = ''
  onListAorB = ''

  onlyInListAList: string[] = [];
  onlyInListBList: string[] = [];
  bothInABList: string[] = [];
  unionABList: string[] = [];

  chekboxCaseSensitive = true
  checkboxSort = false
  checkboxRemoveDuplicate = false

  labelCaseSensitive = 'Case Sensitive'
  labelSort = 'Sort Result'
  labelRemoveDuplicate = 'Remove Duplicates'


  isResultFound = true
  onCompareClick() {
    this.isResultFound = false
    this.compareLists(this.listA, this.listB);
  }

  compareLists(inputA: string, inputB: string) {

    this.onlyInListAList = [];
    this.onlyInListBList = [];
    this.bothInABList = [];
    this.unionABList = [];

    if(!this.chekboxCaseSensitive) {
      inputA = inputA.toLowerCase()
      inputB = inputB.toLocaleLowerCase()
    }
    // Split the input strings by newline
    const listA = inputA.split('\n').map(item => item.trim()).filter(item => item !== '');
    const listB = inputB.split('\n').map(item => item.trim()).filter(item => item !== '');
  
  
    // Create Set for faster lookup
    const setB = new Set(listB);
  
    // Compare lists
    for (const itemA of listA) {
      this.unionABList.push(itemA);

      if (setB.has(itemA)) {
        this.bothInABList.push(itemA);
      } else {
        this.onlyInListAList.push(itemA);
      }
    }
  
    for (const itemB of listB) {
      this.unionABList.push(itemB);

      if (!this.bothInABList.includes(itemB)) {
        this.onlyInListBList.push(itemB);
      }
    }

    this.bothInABList = Array.from(new Set(this.bothInABList));
    this.unionABList = Array.from(new Set(this.unionABList));

    if(this.checkboxRemoveDuplicate) {
      this.onlyInListAList = Array.from(new Set(this.onlyInListAList));
      this.onlyInListBList = Array.from(new Set(this.onlyInListBList));
    }

    if(this.checkboxSort) {
      this.onlyInListAList.sort();
      this.onlyInListBList.sort();
      this.bothInABList.sort();
    }

    this.onlyInListA = this.onlyInListAList.join('\n');
    this.onlyInListB = this.onlyInListBList.join('\n');
    this.onListAandB = this.bothInABList.join('\n');
    this.onListAorB = this.unionABList.join('\n');

  }

  getItemCount(text: string): number {
    if (!text) return 0;
    return text.split('\n').filter(item => item.trim() !== '').length;
  }

  getTotalItems(): number {
    const listACount = this.getItemCount(this.listA);
    const listBCount = this.getItemCount(this.listB);
    return listACount + listBCount;
  }

  getUniqueItems(): number {
    return this.getItemCount(this.onListAorB);
  }

  // Copy functionality
  async copyToClipboard(text: string, type: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
      console.log(`${type} copied to clipboard`);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for older browsers
      this.fallbackCopyTextToClipboard(text);
    }
  }

  private fallbackCopyTextToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
  }

  copyOnlyInListA(): void {
    this.copyToClipboard(this.onlyInListA, 'Only in List A');
  }

  copyOnlyInListB(): void {
    this.copyToClipboard(this.onlyInListB, 'Only in List B');
  }

  copyCommonItems(): void {
    this.copyToClipboard(this.onListAandB, 'Common Items');
  }

  copyAllItems(): void {
    this.copyToClipboard(this.onListAorB, 'All Items');
  }

  // Accordion state management
  accordionStates = {
    collapseOne: false,
    collapseTwo: false,
    collapseThree: false,
    collapseFour: false
  }

  toggleAccordion(item: string) {
    this.accordionStates[item as keyof typeof this.accordionStates] = !this.accordionStates[item as keyof typeof this.accordionStates];
  }
}
