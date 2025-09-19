import { Component } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-word-count',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './word-count.component.html',
  styleUrl: './word-count.component.css'
})
export class WordCountComponent {
  titleText = 'Order Alphabetically | maTools'
  descriptionText = 'maTools is a free online tool. Sort words list in alphabetical order. Count duplicate words. Remove duplicate words and much more.'
  url = 'https://matools.org/' + 'word-count'
  siteName = 'maTools.org'
  twitterAccId = '@mathrusoft'
  keyWords = 'Alphabetically, Order ABC, ABC order, alphabetize, alphabaetical order, alphabet,  alphabetize words list, alphabetize, sort, words list, count words'

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

  listA = ``
//     listA = `Apple
// apple
// banana
// mango
// grapes
// apple
// pineapple
// banana
// mango
// Pineapple
// Grapes
// mango`

  result = ''

  checkboxSplitBySpace = false
  checkboxSplitByComma = false
  chekboxCaseInSensitive = false
  checkboxSort = false
  checkboxRemoveDuplicate = false

  labelSplitBySpace = 'Split words by Space'
  labelCaseInSensitive = 'Ignore Case (Convert to Lower case)'
  labelSort = 'Sort Result'
  labelRemoveDuplicate = 'Remove Duplicates'


  isResultFound = true
  
  // Accordion state management
  accordionStates = {
    collapseOne: false,
    collapseTwo: false,
    collapseThree: false,
    collapseFour: false,
    collapseFive: false,
    collapseSix: false
  }

  toggleAccordion(item: string) {
    this.accordionStates[item as keyof typeof this.accordionStates] = !this.accordionStates[item as keyof typeof this.accordionStates];
  }

  onCompareClick() {
    this.isResultFound = false
    var source = this.listA

    if(this.chekboxCaseInSensitive) {
      source = source.toLocaleLowerCase()
    }

    if(this.checkboxSplitBySpace) {
      source = source.replace(/\s+/g, "\n");
    }

    if(this.checkboxSplitByComma) {
      source = source.replace(/,+/g, "\n");
    }

    var wordsList = source.split('\n').map(item => item.trim()).filter(item => item !== '');

    if(this.checkboxSort) {
      wordsList = wordsList.sort()
    }

    if(this.checkboxRemoveDuplicate) {
      wordsList = Array.from(new Set(wordsList));
    }

    var wordCount: Record<string, number> = {};
    wordsList.forEach((word) => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    if(this.checkboxRemoveDuplicate) {
      this.result = wordsList.join('\n')
    } else {
      this.result = Object.entries(wordCount)
      .map(([word, count]) => `${word} (${count})`)
      .join("\n");
    }
  }
}
