import path from 'path';
import PdfPrinter from 'pdfmake';
import { createDocDefinition } from '../configs/pdf.configs';

interface IFontsRoboto {
    [fontName: string]: IFonts;
}

interface IFonts {
    normal: string;
    bold: string;
    italics: string;
    bolditalics: string;
}

export class PdfPrinterService {
    private readonly mainFont: IFontsRoboto;

    private printer: PdfPrinter;

    constructor() {
        this.mainFont = {
            Roboto: {
                normal: this.fontPath('Roboto-Regular.ttf'),
                bold: this.fontPath('Roboto-Medium.ttf'),
                italics: this.fontPath('Roboto-Italic.ttf'),
                bolditalics: this.fontPath('Roboto-MediumItalic.ttf'),
            },
        };

        this.printer = new PdfPrinter(this.mainFont);
    }

    print() {
        const { printer } = this;
        const imagePath = this.imagePath();
        return printer.createPdfKitDocument(createDocDefinition(imagePath));
    }

    fontPath(fontName: string) {
        return path.join(__dirname, '..', '..', 'static', 'fonts', fontName);
    }

    imagePath() {
        return path.join(
            __dirname,
            '..',
            '..',
            'static',
            'images',
            'sampleImage.jpg'
        );
    }

    pdfPath(pdfName: string) {
        return path.join(__dirname, '..', '..', 'static', 'pdf', pdfName);
    }
}

export default new PdfPrinterService();
