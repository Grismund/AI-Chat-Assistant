import { View, Text, Alert, StyleSheet, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import Toast from 'react-native-root-toast';
import * as WebBrowser from 'expo-web-browser';
import { useApiKeyContext } from '../contexts/apiKeyContext';

const ApiKeyPage = () => {

  const { openAiApiKey, setOpenAiApiKey, anthropicApiKey, setAnthropicApiKey } = useApiKeyContext();

  const [openAiApiKeyInput, setOpenAiApiKeyInput] = useState(openAiApiKey);
  const [anthropicApiKeyInput, setAnthropicApiKeyInput] = useState(anthropicApiKey);

  // Function to open the OpenAI API keys page in a browser
  const openApiKeysPage = () => {
    WebBrowser.openBrowserAsync('https://platform.openai.com/api-keys');
  };

  // Save API key to context
  const saveOpenAiApiKey = async () => {
    if (openAiApiKeyInput.trim().length > 0) {
      setOpenAiApiKey(openAiApiKeyInput);
      Toast.show('API key saved', { duration: Toast.durations.SHORT });
    } else {
      Alert.alert('Error', 'Please enter a valid API key');
    }
  };

  // Save API key to context
  const saveAnthropicApiKey = async () => {
    if (anthropicApiKeyInput.trim().length > 0) {
        setAnthropicApiKey(anthropicApiKeyInput);
      Toast.show('Anthropic key saved', { duration: Toast.durations.SHORT });
    } else {
      Alert.alert('Error', 'Please enter a valid API key');
    }
  };

  // Remove API key from context
  const removeOpenAiApiKey = async () => {
    setOpenAiApiKey('');
    setOpenAiApiKeyInput('');
    Toast.show('API key removed', { duration: Toast.durations.SHORT });
  };

  const removeAnthropicApiKey = async () => {
      setAnthropicApiKey('');
    setAnthropicApiKeyInput('');
    Toast.show('API key removed', { duration: Toast.durations.SHORT });
  }

  // Function to handle button press
  const handleButtonPress = () => {
    if (apiKey) {
        removeOpenAiApiKey();
    } else {
      saveOpenAiApiKey();
    }
  };
  // Function to handle button press
  const handleAnthropicButtonPress = () => {
    if (anthropicApiKey) {
        removeAnthropicApiKey();
    } else {
      saveAnthropicApiKey();
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.section}>
      <Text style={styles.label}>
        To connect with AI, add an API key. You can obtain an API key from
        {' '}
        <Text style={styles.linkText} onPress={openApiKeysPage}>
          https://platform.openai.com/api-keys
        </Text>
        .
      </Text>
      <TextInput
        value={openAiApiKeyInput}
        onChangeText={setOpenAiApiKey}
        placeholder='OpenAI API key'
        autoCorrect={false}
        autoCapitalize='none'
        style={styles.input}
        editable={!openAiApiKey}
      />
      <Pressable onPress={handleButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>
          {openAiApiKey ? 'Remove' : 'Save'}
        </Text>
      </Pressable>
        </View>

            <View style={styles.section}>
            <Text style={styles.label}>
            Connect Anthropic API for Claude.
        </Text>
        <TextInput
            value={anthropicApiKeyInput}
            onChangeText={setAnthropicApiKeyInput}
            placeholder='Anthropic API key'
            autoCorrect={false}
            autoCapitalize='none'
            style={styles.input}
            editable={!anthropicApiKey}
        />
        <Pressable onPress={handleAnthropicButtonPress} style={styles.button}>
            <Text style={styles.buttonText}>
                {anthropicApiKey ? 'Remove' : 'Save'}
            </Text>
        </Pressable>
    </View>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: '#0D0D0D',
  },
  label: {
    fontSize: 16,
    color: '#fff',
  },
  linkText: {
    color: '#0F66CC',
    textDecorationLine: 'underline',
  },
  input: {
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#2F2F2F',
    borderRadius: 8,
    padding: 8,
    marginVertical: 24,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#18191a',
    borderColor: '#2F2F2F',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignSelf: 'center',
    borderWidth: 2,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
    section: {
        marginBottom: 32,
},
});

export default ApiKeyPage;