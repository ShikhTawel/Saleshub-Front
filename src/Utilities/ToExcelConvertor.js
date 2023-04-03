import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

export default function fromByteArrayToExcel(data, fileName) {
    const byteArray = new Uint8Array(
        atob(data.data)
            .split('')
            .map((char) => char.charCodeAt(0))
    );
    const workbook = XLSX.read(byteArray, {type: 'array'});
    const excelFile = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
    });
    return new File([new Blob([excelFile], {
        type: 'application/octet-stream'
    })], fileName + '.xlsx');
    
}

export function saveFile(file) {
    FileSaver.saveAs(file, file.name);
}
