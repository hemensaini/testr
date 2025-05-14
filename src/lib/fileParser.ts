import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { parseStringPromise } from 'xml2js';
import { parse as yamlParse } from 'yaml';
import initSqlJs from 'sql.js';

export async function parseFile(file: File): Promise<any[]> {
  const extension = file.name.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'csv':
      return new Promise((resolve, reject) => {
        Papa.parse(file, {
          header: true,
          dynamicTyping: true,
          complete: (results) => resolve(results.data),
          error: (error) => reject(error)
        });
      });

    case 'json':
      const text = await file.text();
      return JSON.parse(text);

    case 'xlsx':
    case 'xls':
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      return XLSX.utils.sheet_to_json(worksheet);

    case 'tsv':
      return new Promise((resolve, reject) => {
        Papa.parse(file, {
          header: true,
          dynamicTyping: true,
          delimiter: '\t',
          complete: (results) => resolve(results.data),
          error: (error) => reject(error)
        });
      });

    case 'xml':
      const xmlText = await file.text();
      const result = await parseStringPromise(xmlText);
      return Array.isArray(result.root.row) ? result.root.row : [result.root];

    case 'yaml':
    case 'yml':
      const yamlText = await file.text();
      const yamlData = yamlParse(yamlText);
      return Array.isArray(yamlData) ? yamlData : [yamlData];

    case 'sql':
      const SQL = await initSqlJs();
      const sqlBuffer = await file.arrayBuffer();
      const db = new SQL.Database(new Uint8Array(sqlBuffer));
      const tables = db.exec("SELECT name FROM sqlite_master WHERE type='table'");
      if (tables.length > 0) {
        const firstTable = tables[0].values[0][0];
        const data = db.exec(`SELECT * FROM ${firstTable}`);
        return data[0].values.map(row => 
          row.reduce((obj: any, val: any, i: number) => {
            obj[data[0].columns[i]] = val;
            return obj;
          }, {})
        );
      }
      return [];

    default:
      throw new Error('Unsupported file format');
  }
}