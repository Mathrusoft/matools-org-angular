import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.css'
})
export class SortComponent {
  inputText: string = '';
  sortedResult: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  sortType: 'alphabetical' | 'numerical' | 'length' = 'alphabetical';
  caseSensitive: boolean = false;
  removeDuplicates: boolean = false;
  showPreview: boolean = false;

  onInputChange() {
    this.performSort();
  }

  onSortOptionsChange() {
    this.performSort();
  }

  performSort() {
    if (!this.inputText.trim()) {
      this.sortedResult = '';
      this.showPreview = false;
      return;
    }

    let items = this.inputText.split('\n').filter(item => item.trim() !== '');
    
    if (this.removeDuplicates) {
      items = [...new Set(items)];
    }

    items.sort((a, b) => {
      let compareA = a;
      let compareB = b;

      if (!this.caseSensitive) {
        compareA = a.toLowerCase();
        compareB = b.toLowerCase();
      }

      let result = 0;

      switch (this.sortType) {
        case 'alphabetical':
          result = compareA.localeCompare(compareB);
          break;
        case 'numerical':
          const numA = parseFloat(a);
          const numB = parseFloat(b);
          if (!isNaN(numA) && !isNaN(numB)) {
            result = numA - numB;
          } else {
            result = compareA.localeCompare(compareB);
          }
          break;
        case 'length':
          result = a.length - b.length;
          break;
      }

      return this.sortOrder === 'desc' ? -result : result;
    });

    this.sortedResult = items.join('\n');
    this.showPreview = true;
  }

  clearAll() {
    this.inputText = '';
    this.sortedResult = '';
    this.showPreview = false;
  }

  copyResult() {
    navigator.clipboard.writeText(this.sortedResult);
  }

  getItemCount(): number {
    if (!this.sortedResult) return 0;
    return this.sortedResult.split('\n').filter(item => item.trim() !== '').length;
  }

  getSortIcon(): string {
    return this.sortOrder === 'asc' ? 'alpha-down' : 'alpha-up';
  }

  getSortDescription(): string {
    return `${this.sortType.charAt(0).toUpperCase() + this.sortType.slice(1)} ${this.sortOrder.toUpperCase()}`;
  }
}
