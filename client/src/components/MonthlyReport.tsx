import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define types for our data
interface TBooking {
  bookingId: number;
  userId: number;
  vehicleId: string;
  locationId: string;
  bookingDate: string;
  returnDate: string;
  totalAmount: number;
  bookingStatus: string;
}

interface TUser {
  userId: number;
  fullName: string;
  email: string;
  contactPhone: string;
  address: string;
  role: string;
}

// Create styles for PDF
const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 10, textAlign: "center", color: "red" },
  section: { margin: 10, padding: 10 },
  text: { fontSize: 12, marginBottom: 5 },
});

// Create MonthlyReport component
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
  const totalRevenue = bookingsData.reduce(
    (sum, booking) => sum + booking.totalAmount,
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Monthly Report - {currentMonth}</Text>

        <View style={styles.section}>
          <Text style={styles.text}>Total Users: {totalUsers}</Text>
          <Text style={styles.text}>Total Bookings: {totalBookings}</Text>
          <Text style={styles.text}>
            Total Revenue: ${totalRevenue.toFixed(2)}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>Sample Users:</Text>
          {usersData.slice(0, 5).map((user, index) => (
            <Text key={user.userId} style={styles.text}>
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
export default MonthlyReport;
