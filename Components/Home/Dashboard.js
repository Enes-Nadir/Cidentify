// DashboardComponent.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardComponent = () => {
  return (
    <View style={styles.container}>
        <Box title="System Usage Rating" count="5" iconName="star-outline" color="#29B6F6" />
        <Box title="Sessions" count="3" iconName="account-tie" color="#FFA726" />
        <Box title="Notices" count="0" iconName="bell-outline" color="#AB47BC" />
    </View>
  );
};

const Box = ({ title, count, iconName, color, fullWidth }) => {
  return (
    <TouchableOpacity style={[styles.box, { backgroundColor: color }, fullWidth && { width: '100%' }]}>
      <Icon name={iconName} size={30} color="#fff" />
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    marginBottom: 55,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 5,
    margin: 5,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 10,
  },
  count: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
});

export default DashboardComponent;
