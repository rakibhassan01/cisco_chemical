import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
} from "@react-pdf/renderer";
import { Order as OrderType, Product } from "@/payload-types";

// Register fonts for a professional look (Optional, but recommended)
// Font.register({ family: 'Inter', src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2' });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    color: "#333",
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    borderStyle: "solid",
    paddingBottom: 20,
  },
  brandName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#16a34a", // green-600
  },
  invoiceTitle: {
    fontSize: 20,
    color: "#999",
    textAlign: "right",
  },
  section: {
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  infoBox: {
    width: "45%",
  },
  label: {
    fontSize: 8,
    color: "#999",
    textTransform: "uppercase",
    marginBottom: 4,
    fontWeight: "bold",
  },
  table: {
    display: "flex",
    width: "auto",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    borderStyle: "solid",
    paddingVertical: 10,
  },
  tableHeader: {
    backgroundColor: "#f8fafc",
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: "#16a34a",
    borderStyle: "solid",
  },
  tableColMain: { width: "60%" },
  tableCol: { width: "20%", textAlign: "right" },
  headerText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#16a34a",
  },
  totalSection: {
    marginTop: 20,
    paddingTop: 10,
    borderWidth: 0,
    borderTopWidth: 2,
    borderTopColor: "#eee",
    borderStyle: "solid",
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  totalLabel: {
    width: 100,
    textAlign: "right",
    marginRight: 20,
    color: "#666",
  },
  totalAmount: {
    width: 100,
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 14,
    color: "#16a34a",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "#bbb",
    fontSize: 8,
    borderWidth: 0,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    borderStyle: "solid",
    paddingTop: 10,
  },
});

interface InvoiceProps {
  order: OrderType;
  user: {
    name?: string | null;
    email: string;
  };
}

export const InvoiceTemplate = ({ order, user }: InvoiceProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandName}>Cisco Chemical Inc.</Text>
          <Text style={{ fontSize: 8, color: "#666", marginTop: 4 }}>
            Molecular Puritiy & Procurement Solutions
          </Text>
        </View>
        <View>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
          <Text style={{ fontSize: 9, color: "#666", marginTop: 4 }}>
            Order ID: #{String(order.id).slice(-8).toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Bill To & Order Info */}
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Bill To:</Text>
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>{user.name || "Customer"}</Text>
          <Text style={{ color: "#666", marginTop: 2 }}>{user.email}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Invoice Date:</Text>
          <Text>{`${new Date(order.createdAt).toLocaleDateString()}`}</Text>
          <Text style={[styles.label, { marginTop: 10 }]}>Payment Status:</Text>
          <Text style={{ color: "#16a34a", fontWeight: "bold" }}>PAID</Text>
        </View>
      </View>

      {/* Items Table */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={styles.tableColMain}><Text style={styles.headerText}>Product Description</Text></View>
          <View style={styles.tableCol}><Text style={styles.headerText}>Qty</Text></View>
          <View style={styles.tableCol}><Text style={styles.headerText}>Unit Price</Text></View>
          <View style={styles.tableCol}><Text style={styles.headerText}>Total</Text></View>
        </View>

        {/* Table Rows */}
        {(order.items || []).map((item, index) => {
          const product = item.product as Product;
          return (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableColMain}>
                <Text style={{ fontWeight: "bold" }}>{product?.name || "Chemical Solution"}</Text>
                <Text style={{ fontSize: 8, color: "#999", marginTop: 2 }}>
                  Molecular ID: {product?.id || "N/A"}
                </Text>
              </View>
              <View style={styles.tableCol}><Text>{`${item.quantity}`}</Text></View>
              <View style={styles.tableCol}><Text>{`$${(item.price || 0).toLocaleString()}`}</Text></View>
              <View style={styles.tableCol}>
                <Text style={{ fontWeight: "bold" }}>
                  {`$${((item.quantity || 0) * (item.price || 0)).toLocaleString()}`}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Totals */}
      <View style={styles.totalSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal</Text>
          <Text style={styles.totalAmount}>{`$${order.total.toLocaleString()}`}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tax (0%)</Text>
          <Text style={styles.totalAmount}>$0.00</Text>
        </View>
        <View style={[styles.totalRow, { marginTop: 10 }]}>
          <Text style={[styles.totalLabel, { fontWeight: "bold", fontSize: 12, color: "#000" }]}>Balance Due</Text>
          <Text style={styles.totalAmount}>$0.00</Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Thank you for choosing Cisco Chemical Inc. for your premium chemical needs.{"\n"}
        This is a computer-generated document. No signature is required.
      </Text>
    </Page>
  </Document>
);
