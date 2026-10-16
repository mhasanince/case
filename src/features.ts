import documentScannerIcon from './assets/icons/document-scanner.svg';
import signAndStampIcon from './assets/icons/sign-and-stamp.png';
import batchScanningIcon from './assets/icons/batch-scanning.svg';
import advancedFiltersIcon from './assets/icons/advanced-filters.svg';
import exportAndShareIcon from './assets/icons/export-and-share.svg';
import documentScannerPhone from './assets/document-scanner/phone.webp';
import signAndStampPhone from './assets/sign-and-stamp/phone.webp';
import signature from './assets/sign-and-stamp/signature.webp';
import stamp from './assets/sign-and-stamp/stamp.webp';
import batchScanningPhone from './assets/batch-scanning/phone.webp';
import firstPage from './assets/batch-scanning/page-1.webp';
import secondPage from './assets/batch-scanning/page-2.webp';
import thirdPage from './assets/batch-scanning/page-3.webp';
import advancedFiltersPhone from './assets/advanced-filters/phone.webp';
import brightnessBar from './assets/advanced-filters/bar-left.webp';
import contrastBar from './assets/advanced-filters/bar-right.webp';
import exportAndSharePhone from './assets/export-and-share/phone.webp';
import arrow from './assets/export-and-share/arrow.webp';
import pdfFile from './assets/export-and-share/pdf.webp';
import jpgFile from './assets/export-and-share/jpg.webp';
import txtFile from './assets/export-and-share/txt.webp';

export type StageImage = {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Decoration = StageImage & {
  animation: 'pop' | 'slideUp' | 'fade' | 'fanOut';
};

export type Feature = {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  illustrationLabel: string;
  phone: StageImage;
  decorations: ReadonlyArray<Decoration>;
};

export function getImageSources(feature: Feature): Array<string> {
  return [
    feature.phone.src,
    ...feature.decorations.map((decoration) => decoration.src),
  ];
}

export const features: ReadonlyArray<Feature> = [
  {
    id: 'document-scanner',
    name: 'Document Scanner',
    title: 'Scan with Ease',
    description:
      'Scan any document instantly with your mobile device by just a few steps. Save as PDF,JPG,ZIP,TXT and Word format.',
    icon: documentScannerIcon,
    illustrationLabel: 'A document being scanned with the phone camera',
    phone: { src: documentScannerPhone, x: 132, y: 1, width: 366, height: 482 },
    decorations: [],
  },
  {
    id: 'sign-and-stamp',
    name: 'Sign & Stamp',
    title: 'One-Tap Focus',
    description:
      'Draw, scan or import your signature and stamp with a simple touch. Sign and stamp any document with just a single tap!',
    icon: signAndStampIcon,
    illustrationLabel: 'A signature and a completed stamp placed on a document',
    phone: { src: signAndStampPhone, x: 132, y: 0, width: 365, height: 482 },
    decorations: [
      {
        src: signature,
        x: 34,
        y: 249,
        width: 217,
        height: 143,
        animation: 'pop',
      },
      { src: stamp, x: 367, y: 140, width: 217, height: 181, animation: 'pop' },
    ],
  },
  {
    id: 'batch-scanning',
    name: 'Batch Scanning',
    title: 'Multiple Page Scan',
    description:
      'Scan multiple pages or documents in multiple-scanning mode. Batch all scans as a single document.',
    icon: batchScanningIcon,
    illustrationLabel: 'Several scanned pages stacked into a single document',
    phone: { src: batchScanningPhone, x: 132, y: 0, width: 375, height: 483 },
    decorations: [
      {
        src: firstPage,
        x: 193,
        y: 117,
        width: 247,
        height: 349,
        animation: 'slideUp',
      },
      {
        src: secondPage,
        x: 180,
        y: 128,
        width: 274,
        height: 355,
        animation: 'slideUp',
      },
      {
        src: thirdPage,
        x: 171,
        y: 142,
        width: 291,
        height: 341,
        animation: 'slideUp',
      },
    ],
  },
  {
    id: 'advanced-filters',
    name: 'Advanced Filters',
    title: 'Unique Filters',
    description:
      'Apply advanced filters and enhance quality with various custom made filters. Manually edit brightness and contrast by your own choice on the custom filters.',
    icon: advancedFiltersIcon,
    illustrationLabel:
      'Brightness and contrast sliders next to a scanned document',
    phone: { src: advancedFiltersPhone, x: 132, y: 0, width: 365, height: 483 },
    decorations: [
      {
        src: brightnessBar,
        x: 103,
        y: 109,
        width: 43,
        height: 359,
        animation: 'fade',
      },
      {
        src: contrastBar,
        x: 481,
        y: 109,
        width: 43,
        height: 359,
        animation: 'fade',
      },
    ],
  },
  {
    id: 'export-and-share',
    name: 'Export & Share',
    title: 'All-Round Conversion',
    description: 'Export your scans as PDF,JPG,ZIP,TXT and Word.',
    icon: exportAndShareIcon,
    illustrationLabel: 'A scanned document exported as PDF, JPG and TXT files',
    phone: { src: exportAndSharePhone, x: 133, y: 0, width: 365, height: 483 },
    decorations: [
      {
        src: arrow,
        x: 100.5,
        y: 413,
        width: 24.5,
        height: 33.5,
        animation: 'fanOut',
      },
      {
        src: pdfFile,
        x: 109,
        y: 304,
        width: 160.5,
        height: 168,
        animation: 'fanOut',
      },
      {
        src: jpgFile,
        x: 244,
        y: 278,
        width: 130,
        height: 156,
        animation: 'fanOut',
      },
      {
        src: txtFile,
        x: 375,
        y: 299.5,
        width: 148,
        height: 181,
        animation: 'fanOut',
      },
    ],
  },
];
