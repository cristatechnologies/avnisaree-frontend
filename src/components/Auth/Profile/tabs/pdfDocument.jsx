import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
const MyDocument = (props) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      padding: 20,
    },
    section: {
      marginBottom: 10,
    },
    header: {
      fontSize: 18,
      marginBottom: 10,
    },
    table: {
      display: 'table',
      width: 'auto',
      borderStyle: 'none',
      borderWidth: 0.5,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: 'auto',
      flexDirection: 'row',
    },
    tableColHeader: {
      width: '20%',
      borderStyle: 'none',
      borderWidth: 0.5,
      borderBottomColor: '#000',
      backgroundColor: '#f2f2f2',
      textAlign: 'center',
      padding: 5,
    },
    tableCol: {
      width: '25%',
      borderStyle: 'none',
      borderWidth: 0.5,
      borderBottomColor: '#000',
      textAlign: 'center',
      padding: 5,
    },
    totalSection: {
      marginTop: 20,
    },
  });
  return (
    <>
      {props && props.data && (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.header}>Order Details</Text>
              <Text>Order ID: {props.data.order_id}</Text>
              <Text>
                Shipping Address: {props.data.order_address.shipping_address},
                {props.data.order_address.shipping_city},
                {props.data.order_address.shipping_country}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.header}>Order Products</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableColHeader}>Product Name</Text>
                  <Text style={styles.tableColHeader}>Quantity</Text>
                  <Text style={styles.tableColHeader}>Price</Text>
                  <Text style={styles.tableColHeader}>Subtotal</Text>
                  <Text style={styles.tableColHeader}>Review</Text>
                </View>
                {props.data.order_products.map((product, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCol}>{product.product_name}</Text>
                    <Text style={styles.tableCol}>{product.qty}</Text>
                    <Text style={styles.tableCol}>{product.unit_price}</Text>
                    <Text style={styles.tableCol}>
                      {(product.qty * product.unit_price).toFixed(2)}
                    </Text>
                    <Text style={styles.tableCol}>{'Review'}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={[styles.section, styles.totalSection]}>
              <Text>Order Subtotal: {props.data.total_amount}</Text>
              <Text>Discount: {props.data.coupon_coast}</Text>
              <Text>Shipping Cost: {props.data.shipping_cost}</Text>
              <Text style={styles.header}>
                Total Paid: {props.data.total_amount}
              </Text>
            </View>
          </Page>
        </Document>
      )}
    </>
  );
};

export default MyDocument;
