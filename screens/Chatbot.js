import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const sendMessage = () => {
    const userMessage = { sender: 'user', text: message };
    const botMessage = { sender: 'bot', text: `Diagnosing: ${message}` };
    setChat([...chat, userMessage, botMessage]); // Append user and bot messages to chat history
    setMessage('');
  };

  return (
    <View style={styles.container}>
      {/* History Sidebar */}
      {showHistory && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Chat History</Text>
          <FlatList
            data={chat}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text
                style={[
                  styles.historyItem,
                  item.sender === 'user' ? styles.userHistory : styles.botHistory,
                ]}
              >
                {item.text}
              </Text>
            )}
          />
        </View>
      )}

      {/* Chatbot Section */}
      <View style={styles.chatContainer}>
        {/* Toggle Button */}
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowHistory(!showHistory)}
        >
          <Text style={styles.toggleButtonText}>
            {showHistory ? 'Hide History' : 'Show History'}
          </Text>
        </TouchableOpacity>

        {/* Chat Display */}
        <View style={styles.chatBox}>
          {chat.map((msg, index) => (
            <Text
              key={index}
              style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}
            >
              {msg.text}
            </Text>
          ))}
        </View>

        {/* Input Section */}
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },
  historyContainer: {
    width: '30%',
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    padding: 5,
    marginBottom: 5,
    fontSize: 16,
    borderRadius: 5,
  },
  userHistory: {
    backgroundColor: '#d1ecf1',
    color: '#0c5460',
  },
  botHistory: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  chatContainer: {
    flex: 1,
    padding: 20,
  },
  toggleButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  chatBox: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  userMessage: {
    textAlign: 'right',
    marginVertical: 5,
    color: '#007bff',
    fontSize: 16,
  },
  botMessage: {
    textAlign: 'left',
    marginVertical: 5,
    color: '#dc3545',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});

export default Chatbot;
