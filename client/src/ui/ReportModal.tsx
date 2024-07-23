import React from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import MonthlyReport from '../features/Reports/MonthlyReport';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportData: any; 
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, reportData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Monthly Report</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>

        <PDFViewer width="100%" height="500px">
          <MonthlyReport data={reportData} />
        </PDFViewer>

        <div className="mt-4 flex justify-end">
          <PDFDownloadLink
            document={<MonthlyReport data={reportData} />}
            fileName="kenny_motors_monthly_report.pdf"
          >
            {({ loading }) => (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {loading ? "Loading document..." : "Download PDF"}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;