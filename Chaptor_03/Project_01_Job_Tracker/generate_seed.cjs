const XLSX = require('xlsx');
const fs = require('fs');

const excelPath = "c:\\Sreekanth\\AI Testing - Pramod\\AITesterBluePrint2X\\Chaptor_03\\Job_Tracker\\data\\data_Companies_Applied.xlsx";
const outPath = "c:\\Sreekanth\\AI Testing - Pramod\\AITesterBluePrint2X\\Chaptor_03\\Job_Tracker\\src\\seed.json";

try {
  const workbook = XLSX.readFile(excelPath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet);
  
  const jobs = rows.map(row => ({
    company: row.Company || 'Unknown',
    title: row.Title || 'Position',
    jobUrl: row.URL || '',
    status: (row.Status || 'Wishlist').toLowerCase().replace(' ', '-'),
    salaryRange: row.Salary ? String(row.Salary) : '',
    dateApplied: new Date().toISOString().split('T')[0],
    resumeUsed: 'Default',
    notes: 'Imported from Excel',
  }));
  
  fs.writeFileSync(outPath, JSON.stringify(jobs, null, 2));
  console.log('Successfully generated seed.json at', outPath);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
