/*import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const UselessTextInput = () => {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default UselessTextInput;*/

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button, ThemeConsumer } from 'react-native-elements';

export default function Login(props) {



  const [phoneNumber, onChangePhoneNumber] = React.useState(null);
  const [OTP, onChangeOTP] = React.useState(null);

  function send_text() {
    fetch("https://dev.stedi.me/twofactorlogin/" + phoneNumber, {
      method: "POST"
    })
  }

  function verify_user() {
    fetch('https://dev.stedi.me/twofactorlogin', {
      method: 'POST',
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        oneTimePassword: OTP
      }),
      headers: { 'content-type': 'application/json' },
    })
      .then((response) => {response.text})
      .then((authkey) => validate_token(authkey))

      .catch((error) => {
        console.error(error);
      })
  }

  function validate_token() {
    const validateToken = (authkey) => {
      fetch('https://dev.stedi.me/validate/' + authkey, {method: 'GET'})
      .then((response) => {const statusCode = response.status
                           const email = response.text()
                           return Promise.all([statusCode, response])})
      .then(([statusCode, email]) => {
        if(statusCode != 200) {
          Alert.alert("Invalid Login")
        }
        else {
          props.setUserLoggedIn(true)
          props.email(email)
        }
      })
    }
  }

  return (
    <View>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={onChangePhoneNumber}
        value={phoneNumber}
        keyboardType="numeric"
      />
      <Button title="send SMS" onPress={() => send_text()}></Button>
      <TextInput
        style={styles.input}
        onChangeText={onChangeOTP}
        value={OTP}
        placeholder="Enter your OTP"
        keyboardType="numeric"
      />
      <Button title="Log In" onPress={() => verify_user()}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});