import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

interface ExportOptions {
  element: HTMLElement;
  title: string;
  data?: any;
  isPremium?: boolean;
  isLoggedIn?: boolean;
}

export const exportChart = async ({ element, title, data, isPremium, isLoggedIn }: ExportOptions) => {
  const canvas = await html2canvas(element, {
    backgroundColor: null,
    scale: 2, // Higher quality
  });
  
  const exportFormats = {
    png: async () => {
      canvas.toBlob((blob) => {
        if (blob) saveAs(blob, `${title}.png`);
      }, 'image/png');
    },
    
    jpeg: async () => {
      canvas.toBlob((blob) => {
        if (blob) saveAs(blob, `${title}.jpeg`);
      }, 'image/jpeg', 0.95);
    },
    
    svg: async () => {
      if (!isPremium) {
        throw new Error('SVG export requires a premium subscription');
      }
      
      const svgData = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
          <image href="${canvas.toDataURL('image/png')}" width="${canvas.width}" height="${canvas.height}"/>
        </svg>
      `;
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      saveAs(blob, `${title}.svg`);
    },
    
    pdf: async () => {
      if (!isPremium) {
        throw new Error('PDF export requires a premium subscription');
      }
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${title}.pdf`);
    },
    
    csv: async () => {
      if (!data) throw new Error('No data available for export');
      
      let csvContent = '';
      
      // Add headers
      if (data.labels) {
        csvContent += 'Label,' + data.datasets.map((ds: any) => ds.label || 'Dataset').join(',') + '\n';
        
        // Add data rows
        data.labels.forEach((label: string, i: number) => {
          csvContent += label + ',' + data.datasets.map((ds: any) => ds.data[i]).join(',') + '\n';
        });
      } else if (data.datasets[0].data[0].x !== undefined) {
        // Handle scatter plot data
        csvContent = 'x,y,dataset\n';
        data.datasets.forEach((dataset: any, datasetIndex: number) => {
          dataset.data.forEach((point: any) => {
            csvContent += `${point.x},${point.y},${dataset.label || `Dataset ${datasetIndex + 1}`}\n`;
          });
        });
      }
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, `${title}.csv`);
    },
    
    excel: async () => {
      if (!data) throw new Error('No data available for export');
      
      const wb = XLSX.utils.book_new();
      let wsData: any[][] = [];
      
      if (data.labels) {
        // Add headers
        wsData.push(['Label', ...data.datasets.map((ds: any) => ds.label || 'Dataset')]);
        
        // Add data rows
        data.labels.forEach((label: string, i: number) => {
          wsData.push([label, ...data.datasets.map((ds: any) => ds.data[i])]);
        });
      } else if (data.datasets[0].data[0].x !== undefined) {
        // Handle scatter plot data
        wsData.push(['x', 'y', 'dataset']);
        data.datasets.forEach((dataset: any) => {
          dataset.data.forEach((point: any) => {
            wsData.push([point.x, point.y, dataset.label || 'Dataset']);
          });
        });
      }
      
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      XLSX.utils.book_append_sheet(wb, ws, 'Chart Data');
      XLSX.writeFile(wb, `${title}.xlsx`);
    },
    
    json: async () => {
      if (!data) throw new Error('No data available for export');
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      saveAs(blob, `${title}.json`);
    }
  };

  return exportFormats;
};