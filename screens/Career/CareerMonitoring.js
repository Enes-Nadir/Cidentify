import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

const CareerMonitoring = () => {
  return (
    <ScrollView style={styles.container} horizontal={true}>
      <DataTable>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title style={styles.columnHeader}>Date-Time</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Service Category</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Subject Category</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Parents Thoughts</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Student Thoughts</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Career Counsellor Remarks</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Task Target</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell style={styles.cell}>2022-09-17 21:48:16</DataTable.Cell>
          <DataTable.Cell style={styles.cell}>Student Group Session</DataTable.Cell>
          <DataTable.Cell style={styles.cell}>Extracurricular Activities</DataTable.Cell>
          <DataTable.Cell style={styles.cell}>NA</DataTable.Cell>
          <DataTable.Cell style={styles.cell}>NA</DataTable.Cell>
          <DataTable.Cell style={styles.cell}>I invited students who want to be an engineer in the future. An engineer delivered a seminar.</DataTable.Cell>
          <DataTable.Cell style={styles.cell}>He should look at the engineering career opportunities.</DataTable.Cell>
        </DataTable.Row>

        {/* Additional rows as needed */}
      </DataTable>
    </ScrollView>
  );
};

export default CareerMonitoring;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tableHeader: {
    backgroundColor: '#eee',
  },
  columnHeader: {
    marginRight: 10, // Add some space between columns
    width: 150, // Adjust the width as necessary
  },
  cell: {
    marginRight: 10, // Add some space between columns
  },
  // Add more styles if needed
});
