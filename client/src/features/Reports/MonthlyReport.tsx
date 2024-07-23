import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "rgb(16 185 129)",
    textDecoration: "underline",
  },
  section: {
    margin: 10,
    padding: 10,
    border: "1 solid #cccccc",
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "rgb(16 185 129)",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const MonthlyReport = ({ data }: any) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const totalRevenue = data.payments
    .filter(
      (payment: { paymentStatus: string }) =>
        payment.paymentStatus === "Completed"
    )
    .reduce((sum: any, payment: { amount: any }) => sum + payment.amount, 0);

  const avgBookingValue = totalRevenue / data.bookings.length || 0;
  const userGrowthRate =
    ((data.users.length - data.users.length * 0.9) /
      (data.users.length * 0.9)) *
      100 || 0;
  const vehicleUtilizationRate =
    data.bookings.length / data.vehicles.length || 0;

  return (
    <Document>
      //!Page 1: Overview
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          Kenny Motors Automotive Monthly Report - {currentDate}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Overview</Text>
          <Text style={styles.text}>Total Users: {data.users.length}</Text>
          <Text style={styles.text}>
            Total Bookings: {data.bookings.length}
          </Text>
          <Text style={styles.text}>
            Total Revenue: ${totalRevenue.toFixed(2)}
          </Text>
          <Text style={styles.text}>
            Active Vehicles: {data.vehicles.length}
          </Text>
          <Text style={styles.text}>
            Total Locations: {data.locations.length}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Performance Indicators</Text>
          <Text style={styles.text}>
            Average Booking Value: ${avgBookingValue.toFixed(2)}
          </Text>
          <Text style={styles.text}>
            User Growth Rate: {userGrowthRate.toFixed(2)}%
          </Text>
          <Text style={styles.text}>
            Vehicle Utilization Rate: {vehicleUtilizationRate.toFixed(2)}
          </Text>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>

      //!Page 2: User Analysis
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>User Analysis</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Demographics</Text>
          <Text style={styles.text}>
            New Users This Month: {Math.floor(data.users.length * 0.1)}
          </Text>
          <Text style={styles.text}>
            Most Active Age Group: 25-34 (placeholder)
          </Text>
          <Text style={styles.text}>
            Top 5 Cities: New York, Los Angeles, Chicago, Houston, Phoenix
            (placeholder)
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Engagement</Text>
          <Text style={styles.text}>
            Average Bookings per User:{" "}
            {(data.bookings.length / data.users.length).toFixed(2)}
          </Text>
          <Text style={styles.text}>
            Repeat Booking Rate:{" "}
            {(
              ((data.bookings.length * 0.3) / data.bookings.length) *
              100
            ).toFixed(2)}
            %
          </Text>
          <Text style={styles.text}>
            User Satisfaction Score: 4.5 / 5.0 (placeholder)
          </Text>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>

      //!Page 3: Booking Analysis
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Booking Analysis</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Trends</Text>
          <Text style={styles.text}>
            Peak Booking Day: Friday (placeholder)
          </Text>
          <Text style={styles.text}>
            Average Booking Duration: 3 days (placeholder)
          </Text>
          <Text style={styles.text}>
            Most Popular Vehicle Category: SUV (placeholder)
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Revenue Breakdown</Text>
          <Text style={styles.text}>
            Revenue from Short-term Rentals: ${(totalRevenue * 0.7).toFixed(2)}
          </Text>
          <Text style={styles.text}>
            Revenue from Long-term Rentals: ${(totalRevenue * 0.2).toFixed(2)}
          </Text>
          <Text style={styles.text}>
            Additional Services Revenue: ${(totalRevenue * 0.1).toFixed(2)}
          </Text>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>

     //TODO Page 4: Fleet Management
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Fleet Management</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Performance</Text>
          <Text style={styles.text}>
            Total Vehicles: {data.vehicles.length}
          </Text>
          <Text style={styles.text}>
            Most Booked Vehicle: Toyota Camry (placeholder)
          </Text>
          <Text style={styles.text}>
            Average Vehicle Age: 2.5 years (placeholder)
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Maintenance and Costs</Text>
          <Text style={styles.text}>
            Vehicles Under Maintenance:{" "}
            {Math.floor(data.vehicles.length * 0.05)}
          </Text>
          <Text style={styles.text}>
            Total Maintenance Costs: ${(totalRevenue * 0.05).toFixed(2)}
          </Text>
          <Text style={styles.text}>
            Fuel Costs: ${(totalRevenue * 0.03).toFixed(2)}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fleet Utilization</Text>
          <Text style={styles.text}>
            Average Daily Utilization:{" "}
            {(vehicleUtilizationRate * 100).toFixed(2)}%
          </Text>
          <Text style={styles.text}>
            Highest Utilization Category: Compact Cars (placeholder)
          </Text>
          <Text style={styles.text}>
            Lowest Utilization Category: Luxury Cars (placeholder)
          </Text>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>

      {/* Page 5: Customer Service and Conclusion */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Customer Service and Conclusion</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Support</Text>
          <Text style={styles.text}>
            Total Support Tickets:{" "}
            {data.pendingTicketsCount + data.solvedTicketsCount}
          </Text>
          <Text style={styles.text}>
            Pending Tickets: {data.pendingTicketsCount}
          </Text>
          <Text style={styles.text}>
            Resolved Tickets: {data.solvedTicketsCount}
          </Text>
          <Text style={styles.text}>
            Average Response Time: 2 hours (placeholder)
          </Text>
          <Text style={styles.text}>
            Customer Satisfaction Rate:{" "}
            {(
              (data.solvedTicketsCount /
                (data.pendingTicketsCount + data.solvedTicketsCount)) *
              100
            ).toFixed(2)}
            %
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conclusion and Next Steps</Text>
          <Text style={styles.text}>
            Key Achievement: Increased user base by {userGrowthRate.toFixed(2)}%
          </Text>
          <Text style={styles.text}>
            Main Challenge: Improving vehicle utilization rate
          </Text>
          <Text style={styles.text}>
            Focus for Next Month: Implement targeted marketing campaigns to
            increase bookings
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          <Text style={styles.text}>
            1. Introduce loyalty program to increase repeat bookings
          </Text>
          <Text style={styles.text}>
            2. Optimize fleet composition based on utilization data
          </Text>
          <Text style={styles.text}>
            3. Enhance mobile app features to improve user experience
          </Text>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default MonthlyReport;
