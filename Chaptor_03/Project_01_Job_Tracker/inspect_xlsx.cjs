const XLSX = require('xlsx');
const path = require('path');

const filePath = process.argv[2];
if (!filePath) {
    console.error('Usage: node inspect_xlsx.js <file-path>');
    process.exit(1);
}

try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
    console.log('Headers:', JSON.stringify(data[0]));
    console.log('Sample Row 1:', JSON.stringify(data[1]));
    console.log('Sample Row 2:', JSON.stringify(data[2]));
} catch (error) {
    console.error('Error reading Excel file:', error.message);
}
