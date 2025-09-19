import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  isOpen?: boolean;
}

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent {
  @Input() items: AccordionItem[] = [];
  @Input() allowMultiple: boolean = true;
  @Output() itemToggled = new EventEmitter<{id: string, isOpen: boolean}>();

  toggleItem(itemId: string) {
    const item = this.items.find(i => i.id === itemId);
    if (!item) return;

    if (!this.allowMultiple) {
      // Close all other items if only one can be open
      this.items.forEach(i => {
        if (i.id !== itemId) {
          i.isOpen = false;
        }
      });
    }

    // Toggle the clicked item
    item.isOpen = !item.isOpen;
    
    // Emit the toggle event
    this.itemToggled.emit({ id: itemId, isOpen: item.isOpen });
  }

  trackByItemId(index: number, item: AccordionItem): string {
    return item.id;
  }
}
