// src/services/PdfExportService.js
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

class PdfExportService {
  static async exportDashboardToPdf(dashboardRef, filename = 'dashboard-report.pdf') {
    if (!dashboardRef.current) {
      console.error("Dashboard reference is not available");
      return;
    }

    // Display a loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'pdf-export-loading';
    loadingIndicator.innerHTML = `
      <div class="pdf-export-spinner"></div>
      <p>Generating PDF...</p>
    `;
    loadingIndicator.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      color: white;
      font-family: var(--font-sans);
    `;
    
    const spinner = document.createElement('style');
    spinner.textContent = `
      .pdf-export-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(spinner);
    document.body.appendChild(loadingIndicator);

    try {
      // Get the dashboard element and its dimensions
      const element = dashboardRef.current;
      const originalHeight = element.scrollHeight;
      const originalWidth = element.scrollWidth;
      
      // Calculate PDF dimensions (A4 is commonly used)
      const pdf = new jsPDF({
        orientation: originalWidth > originalHeight ? 'landscape' : 'portrait',
        unit: 'px',
        format: [originalWidth, originalHeight]
      });
      
      // Set up canvas options for better quality
      const options = {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Enable CORS to capture external images
        logging: false,
        backgroundColor: getComputedStyle(element).backgroundColor || '#000000',
        windowWidth: originalWidth,
        windowHeight: originalHeight,
      };

      // Convert HTML to canvas
      const canvas = await html2canvas(element, options);
      
      // Calculate the PDF size
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add the image to the PDF
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Save the PDF
      pdf.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      // Remove loading indicator
      document.body.removeChild(loadingIndicator);
      document.head.removeChild(spinner);
    }
  }
}

export default PdfExportService;