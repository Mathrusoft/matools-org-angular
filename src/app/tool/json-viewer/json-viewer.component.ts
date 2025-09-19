import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-json-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './json-viewer.component.html',
  styleUrl: './json-viewer.component.css'
})
export class JsonViewerComponent {
  inputJson: string = '';
  parsedData: any = null;
  formattedJson: string = '';
  isValidJson: boolean = true;
  errorMessage: string = '';
  showPreview: boolean = false;
  indentSize: number = 2;
  showLineNumbers: boolean = true;
  showMinified: boolean = false;

  // Sample data
  sampleData = {
    name: 'John Doe',
    age: 30,
    address: {
      city: 'New York',
      zip: '10001'
    },
    hobbies: ['Reading', 'Traveling']
  };

  constructor() {
    this.loadSampleData();
  }

  loadSampleData() {
    this.inputJson = JSON.stringify(this.sampleData, null, 2);
    this.parseJson();
  }

  onInputChange() {
    this.parseJson();
  }

  parseJson() {
    if (!this.inputJson.trim()) {
      this.isValidJson = false;
      this.errorMessage = '';
      this.showPreview = false;
      return;
    }

    try {
      this.parsedData = JSON.parse(this.inputJson);
      this.isValidJson = true;
      this.errorMessage = '';
      this.formatJson();
      this.showPreview = true;
    } catch (error) {
      this.isValidJson = false;
      this.errorMessage = `Invalid JSON: ${error}`;
      this.showPreview = false;
    }
  }

  formatJson() {
    if (this.parsedData) {
      if (this.showMinified) {
        this.formattedJson = JSON.stringify(this.parsedData);
      } else {
        this.formattedJson = JSON.stringify(this.parsedData, null, this.indentSize);
      }
    }
  }

  onIndentSizeChange() {
    if (this.isValidJson) {
      this.formatJson();
    }
  }

  onMinifiedToggle() {
    if (this.isValidJson) {
      this.formatJson();
    }
  }

  validateJson() {
    this.parseJson();
  }

  beautifyJson() {
    if (this.isValidJson) {
      this.showMinified = false;
      this.formatJson();
    }
  }

  minifyJson() {
    if (this.isValidJson) {
      this.showMinified = true;
      this.formatJson();
    }
  }

  copyFormattedJson() {
    navigator.clipboard.writeText(this.formattedJson);
  }

  copyInputJson() {
    navigator.clipboard.writeText(this.inputJson);
  }

  clearAll() {
    this.inputJson = '';
    this.parsedData = null;
    this.formattedJson = '';
    this.isValidJson = true;
    this.errorMessage = '';
    this.showPreview = false;
  }

  loadSample() {
    this.loadSampleData();
  }

  getJsonStats() {
    if (!this.parsedData) return null;
    
    const jsonString = JSON.stringify(this.parsedData);
    return {
      characters: jsonString.length,
      lines: this.formattedJson.split('\n').length,
      objects: this.countObjects(this.parsedData),
      arrays: this.countArrays(this.parsedData),
      properties: this.countProperties(this.parsedData)
    };
  }

  private countObjects(obj: any): number {
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) return 0;
    let count = 1;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        count += this.countObjects(obj[key]);
      }
    }
    return count;
  }

  private countArrays(obj: any): number {
    if (Array.isArray(obj)) {
      let count = 1;
      for (const item of obj) {
        count += this.countArrays(item);
      }
      return count;
    }
    if (typeof obj === 'object' && obj !== null) {
      let count = 0;
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          count += this.countArrays(obj[key]);
        }
      }
      return count;
    }
    return 0;
  }

  private countProperties(obj: any): number {
    if (typeof obj !== 'object' || obj === null) return 0;
    let count = 0;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        count++;
        count += this.countProperties(obj[key]);
      }
    }
    return count;
  }

  getHighlightedJson(): string {
    if (!this.formattedJson) return '';
    
    return this.formattedJson
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
        let cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      });
  }
}
