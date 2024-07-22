import React from "react";
import {
  PDFDownloadLink,
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// Updated type definitions
interface TBooking {
  bookingId: number;
  userId: number;
  vehicleId: number;
  locationId: number;
  bookingDate: string;
  returnDate: string;
  totalAmount: number;
  bookingStatus: string;
}

interface TUser {
  userId: number | null | undefined;
  fullName: string;
  email: string;
  contactPhone: string;
  address: string;
  role: string;
}

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingsData: TBooking[];
  usersData: TUser[];
}

//! styles for the document,page text (section/view)
const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 10, textAlign: "center" },
  section: { margin: 10, padding: 10 },
  text: { fontSize: 12, marginBottom: 5 },
});

//! MonthlyReport component
const MonthlyReport: React.FC<{
  bookingsData: TBooking[];
  usersData: TUser[];
}> = ({ bookingsData, usersData }) => {
  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  const totalUsers = usersData.length;
  const totalBookings = bookingsData.length;

  // !Updated totalRevenue calculation still bringing (NaN)
  const totalRevenue = bookingsData
    .filter((booking) => booking.bookingStatus === "Completed")
    .reduce((sum, booking) => Number(sum + booking.totalAmount), 0);

  // !Format the total
  const formattedTotalRevenue = totalRevenue;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          Kenny's Automotives Monthly Report - {currentMonth}
        </Text>

        <View style={styles.section}>
          <Text style={styles.text}>Total Users: {totalUsers}</Text>
          <Text style={styles.text}>Total Bookings: {totalBookings}</Text>
          <Text style={styles.text}>
            Total Revenue: ${formattedTotalRevenue}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>Sample Users:</Text>
          {usersData.slice(0, 5).map((user, index) => (
            <Text key={user.userId?.toString() || index} style={styles.text}>
              {index + 1}. {user.fullName} ({user.email})
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>Recent Bookings:</Text>
          {bookingsData.slice(0, 5).map((booking, index) => (
            <Text key={booking.bookingId} style={styles.text}>
              {index + 1}. Booking ID: {booking.bookingId}, Amount: $
              {booking.totalAmount}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

// ReportModal component
const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  bookingsData,
  usersData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Monthly Report</h2>
          <button onClick={onClose} className="text-2xl">
            &times;
          </button>
        </div>

        <PDFViewer width="100%" height="500px">
          <MonthlyReport bookingsData={bookingsData} usersData={usersData} />
        </PDFViewer>

        <div className="mt-4 flex justify-end">
          <PDFDownloadLink
            document={
              <MonthlyReport
                bookingsData={bookingsData}
                usersData={usersData}
              />
            }
            fileName="monthly_report.pdf"
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
