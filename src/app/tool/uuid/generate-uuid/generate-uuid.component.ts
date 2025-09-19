import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { UUIDInput, UUIDModel } from '../model.uuid';
import { UuidService } from '../../../service/uuid.service';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import * as bootstrap from 'bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generate-uuid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generate-uuid.component.html',
  styleUrl: './generate-uuid.component.css'
})

export class GenerateUuidComponent {
  titleText = 'Generate UUID | maTools'
  descriptionText = 'Quickly generate individual or bulk universally unique identifiers (UUIDs). Version V1 V4 V6 and V7'
  url = 'https://matools.org/' + 'generate-uuid'
  siteName = 'maTools.org'
  twitterAccId = '@mathrusoft'
  keyWords = 'uuid, uuid v1, uuid v4, uuid v6, uuid v7'

  constructor(
    private uuidService: UuidService,
    private meta: Meta,
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

  private initializeTooltips(): void {
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  ngAfterViewInit(): void {
    this.initializeTooltips();
  }

  @Input({required:true}) inputUUIDData: UUIDModel | undefined;
  @Output() inputUUIDDataChange = new EventEmitter<UUIDModel>();
  copiedMessage: string | null = null;  // Holds the copied message state
  bulkUUIDcopiedMessage: string | null = null;  // Holds the copied message state

  resultList = ''


  updateData() {
    this.inputUUIDDataChange.emit(this.inputUUIDData)
  }

  generateNewTopUUID() {
    var uuidInput: UUIDInput = {
      type: this.inputUUIDData!.uuidInput!.type, 
      nameSpace: this.inputUUIDData!.uuidInput!.nameSpace
    }
    this.inputUUIDData!.topUUID = this.uuidService.getUUID(uuidInput)
    this.emit()
  }
  
  copyToClipboard(text: string, isBulk: boolean = false): void {
    if(isBulk) {
      navigator.clipboard.writeText(text).then(
        () => {
          this.bulkUUIDcopiedMessage = 'Copied!';
          setTimeout(() => {
            this.bulkUUIDcopiedMessage = null;
          }, 2000);
        }
      );
      return
    }
    navigator.clipboard.writeText(text).then(
      () => {
        this.copiedMessage = 'Copied!';
        setTimeout(() => {
          this.copiedMessage = null;
        }, 2000);
      }
    );
  }

  emit() {
    this.inputUUIDDataChange.emit(this.inputUUIDData)
  }


  // 
  positiveNumber: number | null = null;
  validatePositiveNumber(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    // Ensure the input is a positive number
    const parsedValue = Number(value);
    if (parsedValue < 0) {
      // If negative, reset to an empty string
      inputElement.value = '';
      this.positiveNumber = null;
    } else {
      // Update the model with a valid number
      this.positiveNumber = parsedValue;
    }
  }
  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
  
    // Allow only numbers and control keys
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  // 

  generateBulkUUID() {
    if(this.positiveNumber && this.positiveNumber! > 0) {
      this.resultList = this.uuidService.getBulkUUID(this.positiveNumber!, this.inputUUIDData?.uuidInput!).join('\n')
    }
  }

  getUuidCount(): number {
    if (!this.resultList) return 0;
    return this.resultList.split('\n').filter(uuid => uuid.trim() !== '').length;
  }

  getCharacterCount(): number {
    if (!this.resultList) return 0;
    return this.resultList.length;
  }

}
