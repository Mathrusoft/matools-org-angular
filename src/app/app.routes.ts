import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "", // <yourdomain>/
        loadComponent: () => import('./tool/mathbuzz/mathbuzz.component').then(m => m.MathbuzzComponent)
    },
    {
        path: "compare-list", // <yourdomain>/compare-list
        loadComponent: () => import('./tool/list-compare/list-compare.component').then(m => m.ListCompareComponent)
    },
    {
        path: 'word-count', // <yourdomain>/word-count
        loadComponent: () => import('./tool/word-count/word-count.component').then(m => m.WordCountComponent)
    },
    {
        path: 'generate-uuid', // <yourdomain>/generate-uuid
        loadComponent: () => import('./tool/uuid/uuid.component').then(m => m.UuidComponent)
    },
    {
        path: 'generate-qr-code', // <yourdomain>/generate-qr-code
        loadComponent: () => import('./tool/qr-code/qr-code-generator/qr-code-generator.component').then(m => m.QrCodeGeneratorComponent)
    },
    {
        path: 'generate-rent-receipt', // <yourdomain>/generate-qr-code
        loadComponent: () => import('./tool/rent-receipt/rent-receipt.component').then(m => m.RentReceiptComponent)
    },
    {
        path: 'rent-receipt', // <yourdomain>/generate-qr-code
        loadComponent: () => import('./tool/rent-receipt/rent-receipt.component').then(m => m.RentReceiptComponent)
    },
    {
        path: 'emi-calculator', // <yourdomain>/app-emi-calculator
        loadComponent: () => import('./tool/emi-calculator/emi-calculator.component').then(m => m.EmiCalculatorComponent)
    },
    {
        path: 'math-buzz',
        loadComponent: () => import('./tool/mathbuzz/mathbuzz.component').then(m => m.MathbuzzComponent)
    },
    {
        path: 'json-viewer', // <yourdomain>/json-viewer
        loadComponent: () => import('./tool/json-viewer/json-viewer.component').then(m => m.JsonViewerComponent)
    },
    {
        path: 'sort', // <yourdomain>/sort
        loadComponent: () => import('./tool/sort/sort.component').then(m => m.SortComponent)
    },
    { 
        path: '**', 
        loadComponent: () => import('./tool/mathbuzz/mathbuzz.component').then(m => m.MathbuzzComponent)
    }
];
