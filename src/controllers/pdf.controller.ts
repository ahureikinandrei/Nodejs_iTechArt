import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import ApiError from '../../error/ApiError';
import PdfPrinterService from '../services/pdfDocks.service';

class PdfController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const pdfDoc = PdfPrinterService.print();
            const writeStream = fs.createWriteStream(
                PdfPrinterService.pdfPath('basics.pdf')
            );

            pdfDoc.on('data', (chunk) => {
                writeStream.write(chunk);
                res.write(chunk);
            });

            pdfDoc.on('end', () => {
                res.end();
            });

            pdfDoc.end();
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

export default new PdfController();
