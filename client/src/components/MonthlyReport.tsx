
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: { 
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { 
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
});

// Sample data (replace with actual data in a real scenario)
const vehicleData = [
  { type: 'Sedan', available: 10, booked: 5 },
  { type: 'SUV', available: 8, booked: 7 },
  { type: 'Van', available: 5, booked: 2 },
];

const bookingData = {
  total: 50,
  completed: 45,
  cancelled: 5,
};

const financialData = {
  revenue: 25000,
  expenses: 15000,
  profit: 10000,
};

// Create Document Component
const MonthlyReport = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Monthly Rental Report - July 2024</Text>
      
      <View style={styles.section}>
        <Text style={styles.subtitle}>1. Executive Summary</Text>
        <Text style={styles.text}>This report provides an overview of our vehicle rental operations for July 2024, including vehicle inventory, bookings, financial performance, and key insights.</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subtitle}>2. Vehicle Inventory Overview</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Vehicle Type</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Available</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Booked</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Total</Text></View>
          </View>
          {vehicleData.map((vehicle, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{vehicle.type}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{vehicle.available}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{vehicle.booked}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{vehicle.available + vehicle.booked}</Text></View>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subtitle}>3. Booking Statistics</Text>
        <Text style={styles.text}>Total Bookings: {bookingData.total}</Text>
        <Text style={styles.text}>Completed Bookings: {bookingData.completed}</Text>
        <Text style={styles.text}>Cancelled Bookings: {bookingData.cancelled}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subtitle}>4. Financial Performance</Text>
        <Text style={styles.text}>Total Revenue: ${financialData.revenue}</Text>
        <Text style={styles.text}>Total Expenses: ${financialData.expenses}</Text>
        <Text style={styles.text}>Net Profit: ${financialData.profit}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subtitle}>5. Fleet Utilization</Text>
        <Text style={styles.text}>Average utilization rate across all vehicle types: 65%</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subtitle}>6. Customer Insights</Text>
        <Text style={styles.text}>Customer satisfaction score: 4.5/5</Text>
        <Text style={styles.text}>Top customer request: More electric vehicles</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subtitle}>7. Operational Metrics</Text>
        <Text style={styles.text}>Average rental duration: 3.5 days</Text>
        <Text style={styles.text}>Most popular vehicle type: SUV</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subtitle}>8. Market Analysis</Text>
        <Text style={styles.text}>Increasing demand for eco-friendly options noted in the market.</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subtitle}>9. Recommendations</Text>
        <Text style={styles.text}>1. Consider expanding the electric vehicle fleet.</Text>
        <Text style={styles.text}>2. Implement a loyalty program to increase customer retention.</Text>
      </View>
    </Page>
  </Document>
);

export default MonthlyReport;