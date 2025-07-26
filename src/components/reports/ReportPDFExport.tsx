import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaFilePdf, FaDownload, FaSpinner } from 'react-icons/fa';
import type { ReportData } from '../../types/reports';
import { formatCurrency, formatNumber, formatWeight, formatPercentage } from '../../utils/reportUtils';

interface ReportPDFExportProps {
  reportData?: ReportData;
  isGenerating: boolean;
  onExportPDF: () => void;
}

const ReportPDFExport: React.FC<ReportPDFExportProps> = ({
  reportData,
  isGenerating,
  onExportPDF
}) => {

  const generatePDFContent = (reportData: ReportData): HTMLElement => {
    const container = document.createElement('div');
    container.style.width = '210mm';
    container.style.padding = '20mm';
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.fontSize = '12px';
    container.style.color = '#333';
    container.style.background = 'white';

    container.innerHTML = `
      <style>
        .pdf-container { max-width: 170mm; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #10b981; padding-bottom: 20px; }
        .title { font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 10px; }
        .subtitle { font-size: 14px; color: #6b7280; margin-bottom: 5px; }
        .date { font-size: 12px; color: #9ca3af; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 16px; font-weight: bold; color: #1f2937; margin-bottom: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
        .kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px; }
        .kpi-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; background: #f9fafb; }
        .kpi-label { font-size: 10px; color: #6b7280; margin-bottom: 5px; }
        .kpi-value { font-size: 16px; font-weight: bold; color: #1f2937; }
        .table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
        .table th, .table td { border: 1px solid #d1d5db; padding: 8px; text-align: left; font-size: 11px; }
        .table th { background: #f3f4f6; font-weight: bold; }
        .table tr:nth-child(even) { background: #f9fafb; }
        .footer { margin-top: 30px; text-align: center; font-size: 10px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 15px; }
        .page-break { page-break-before: always; }
      </style>
      
      <div class="pdf-container">
        <!-- Header -->
        <div class="header">
          <div class="title">Sera Üretim Analiz Raporu</div>
          <div class="subtitle">Dönem: ${reportData.filters.startDate} - ${reportData.filters.endDate}</div>
          <div class="date">Rapor Tarihi: ${new Date().toLocaleDateString('tr-TR')}</div>
        </div>

        <!-- KPI Özeti -->
        <div class="section">
          <div class="section-title">🏆 Temel Performans Göstergeleri</div>
          <div class="kpi-grid">
            <div class="kpi-card">
              <div class="kpi-label">Toplam Üretim</div>
              <div class="kpi-value">${formatWeight(reportData.kpis.totalProduction)}</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">Toplam Gelir</div>
              <div class="kpi-value">${formatCurrency(reportData.kpis.totalRevenue)}</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">Net Kâr</div>
              <div class="kpi-value">${formatCurrency(reportData.kpis.netProfit)}</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">Kâr Marjı</div>
              <div class="kpi-value">${formatPercentage(reportData.kpis.profitMargin)}</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">Ortalama Verimlilik</div>
              <div class="kpi-value">${formatPercentage(reportData.kpis.averageEfficiency)}</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">Aktif Üretici</div>
              <div class="kpi-value">${formatNumber(reportData.kpis.activeProducers)}</div>
            </div>
          </div>
        </div>

        <!-- Üretici Performansı -->
        <div class="section">
          <div class="section-title">👨‍🌾 En İyi Performans Gösteren Üreticiler</div>
          <table class="table">
            <thead>
              <tr>
                <th>Üretici</th>
                <th>Üretim (kg)</th>
                <th>Gelir (TL)</th>
                <th>Kâr (TL)</th>
                <th>Verimlilik (%)</th>
              </tr>
            </thead>
            <tbody>
              ${reportData.producerPerformances.slice(0, 10).map(p => `
                <tr>
                  <td>${p.producer.firstName} ${p.producer.lastName}</td>
                  <td>${formatWeight(p.production)}</td>
                  <td>${formatCurrency(p.revenue)}</td>
                  <td>${formatCurrency(p.profit)}</td>
                  <td>${formatPercentage(p.efficiency)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Sera Performansı -->
        <div class="section">
          <div class="section-title">🏠 Sera Performans Analizi</div>
          <table class="table">
            <thead>
              <tr>
                <th>Lokasyon</th>
                <th>Ürün</th>
                <th>Üretim (kg)</th>
                <th>Verim (kg/da)</th>
                <th>Verimlilik (%)</th>
              </tr>
            </thead>
            <tbody>
              ${reportData.greenhousePerformances.slice(0, 10).map(gh => `
                <tr>
                  <td>${gh.greenhouse.mahalle}</td>
                  <td>${gh.greenhouse.urunIsmi}</td>
                  <td>${formatWeight(gh.production)}</td>
                  <td>${formatNumber(gh.yieldPerDecare, 1)}</td>
                  <td>${formatPercentage(gh.efficiency)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Yeni Sayfa - Ürün Analizi -->
        <div class="page-break">
          <div class="section">
            <div class="section-title">🌾 Ürün Bazlı Analiz</div>
            <table class="table">
              <thead>
                <tr>
                  <th>Ürün Türü</th>
                  <th>Toplam Üretim</th>
                  <th>Toplam Gelir</th>
                  <th>Ort. Fiyat (TL/kg)</th>
                  <th>Pazar Payı (%)</th>
                  <th>Kâr Marjı (%)</th>
                </tr>
              </thead>
              <tbody>
                ${reportData.cropAnalyses.map(crop => `
                  <tr>
                    <td>${crop.cropType}</td>
                    <td>${formatWeight(crop.totalProduction)}</td>
                    <td>${formatCurrency(crop.totalRevenue)}</td>
                    <td>${formatCurrency(crop.averagePrice)}</td>
                    <td>${formatPercentage(crop.marketShare)}</td>
                    <td>${formatPercentage(crop.profitMargin)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Finansal Özet -->
          <div class="section">
            <div class="section-title">💰 Finansal Özet</div>
            <div class="kpi-grid">
              <div class="kpi-card">
                <div class="kpi-label">Toplam Gelir</div>
                <div class="kpi-value">${formatCurrency(reportData.financialSummary.totalRevenue)}</div>
              </div>
              <div class="kpi-card">
                <div class="kpi-label">Toplam Maliyet</div>
                <div class="kpi-value">${formatCurrency(reportData.financialSummary.totalCost)}</div>
              </div>
              <div class="kpi-card">
                <div class="kpi-label">Net Kâr</div>
                <div class="kpi-value">${formatCurrency(reportData.financialSummary.netProfit)}</div>
              </div>
            </div>
          </div>

          <!-- Trend Analizleri -->
          ${reportData.trends.length > 0 ? `
            <div class="section">
              <div class="section-title">📈 Trend Analizleri</div>
              <table class="table">
                <thead>
                  <tr>
                    <th>Metrik</th>
                    <th>Değişim (%)</th>
                    <th>Trend</th>
                    <th>Dönem</th>
                  </tr>
                </thead>
                <tbody>
                  ${reportData.trends.map(trend => `
                    <tr>
                      <td>${trend.metric}</td>
                      <td>${trend.change > 0 ? '+' : ''}${formatPercentage(trend.change)}</td>
                      <td>${trend.direction}</td>
                      <td>${trend.period}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : ''}
        </div>

        <!-- Footer -->
        <div class="footer">
          <div>Bu rapor ${new Date().toLocaleString('tr-TR')} tarihinde otomatik olarak oluşturulmuştur.</div>
          <div>Sera Yönetim Sistemi - Rapor ID: ${reportData.reportId}</div>
        </div>
      </div>
    `;

    return container;
  };

  const exportToPDF = async (reportData: ReportData) => {
    try {
      // PDF content oluştur
      const pdfContent = generatePDFContent(reportData);
      document.body.appendChild(pdfContent);

      // HTML'yi canvas'a çevir
             const canvas = await html2canvas(pdfContent, {
         useCORS: true,
         allowTaint: true,
         background: '#ffffff'
       });

      // Canvas'ı PDF'e çevir
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // PDF'i indir
      const filename = `sera-raporu-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(filename);

      // Geçici elementi kaldır
      document.body.removeChild(pdfContent);

    } catch (error) {
      console.error('PDF oluşturma hatası:', error);
      alert('PDF oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleExportClick = () => {
    if (reportData) {
      exportToPDF(reportData);
    } else {
      onExportPDF();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
          <FaFilePdf className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">PDF Rapor İndirme</h3>
          <p className="text-sm text-slate-600">Raporunuzu PDF formatında indirin</p>
        </div>
      </div>

      {/* PDF Preview Info */}
      {reportData && (
        <div className="mb-6 p-4 bg-slate-50 rounded-lg">
          <h4 className="font-semibold text-slate-800 mb-3">📋 Rapor İçeriği</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-600">Dönem:</span>
              <span className="ml-2 font-medium">{reportData.filters.startDate} - {reportData.filters.endDate}</span>
            </div>
            <div>
              <span className="text-slate-600">Üretici Sayısı:</span>
              <span className="ml-2 font-medium">{reportData.producerPerformances.length}</span>
            </div>
            <div>
              <span className="text-slate-600">Sera Sayısı:</span>
              <span className="ml-2 font-medium">{reportData.greenhousePerformances.length}</span>
            </div>
            <div>
              <span className="text-slate-600">Ürün Türü:</span>
              <span className="ml-2 font-medium">{reportData.cropAnalyses.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* Export Options */}
      <div className="space-y-4 mb-6">
        <div className="border border-slate-200 rounded-lg p-4">
          <h4 className="font-semibold text-slate-800 mb-2">📄 PDF Formatı</h4>
          <p className="text-sm text-slate-600 mb-3">
            Tüm grafikleri, tabloları ve analizleri içeren profesyonel PDF raporu
          </p>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>✅ Temel performans göstergeleri</li>
            <li>✅ Üretici ve sera performans tabloları</li>
            <li>✅ Ürün bazlı analiz</li>
            <li>✅ Finansal özet</li>
            <li>✅ Trend analizleri</li>
          </ul>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleExportClick}
          disabled={isGenerating || !reportData}
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-slate-400 disabled:to-slate-500 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
        >
          {isGenerating ? (
            <>
              <FaSpinner className="w-5 h-5 animate-spin" />
              <span>PDF Oluşturuluyor...</span>
            </>
          ) : (
            <>
              <FaDownload className="w-5 h-5" />
              <span>PDF İndir</span>
            </>
          )}
        </button>

        {!reportData && (
          <p className="text-center text-sm text-slate-500">
            PDF indirmek için önce rapor oluşturun
          </p>
        )}
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">💡 İpuçları</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• PDF oluşturma işlemi birkaç saniye sürebilir</li>
          <li>• Büyük raporlar için internet bağlantınızın stabil olduğundan emin olun</li>
          <li>• PDF dosyası otomatik olarak indirilecektir</li>
        </ul>
      </div>
    </div>
  );
};

export default ReportPDFExport; 