import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { supabase } from '../lib/supabase';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const sendLink = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: 'exp://localhost' },
    });
    if (!error) {
      setSent(true);
    } else {
      alert(error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Logga in med e-post</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        autoCapitalize="none"
      />
      <Button title="Skicka magisk länk" onPress={sendLink} />
      {sent && <Text>Kolla din e-post.</Text>}
    </View>
  );
}
