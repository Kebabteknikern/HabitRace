import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { makeRedirectUri } from 'expo-auth-session';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { supabase } from '../lib/supabase';

// Required for web: complete pending auth sessions
WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  // Generate a redirect URI matching your scheme
  const redirectTo = makeRedirectUri({ scheme: 'habitrace' });

  // Parse tokens from the deep link and set the Supabase session
  const createSessionFromUrl = async (url) => {
    try {
      const { params, errorCode } = QueryParams.getQueryParams(url);
      if (errorCode) {
        console.error(errorCode);
        return;
      }
      const { access_token, refresh_token } = params;
      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });
        if (error) {
          console.error(error.message);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Listen for incoming URLs (deep links)
  const url = Linking.useURL();
  useEffect(() => {
    if (url) {
      createSessionFromUrl(url);
    }
  }, [url]);

  // Send magic link to the provided email
  const sendLink = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
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
        style={{ marginVertical: 12, borderColor: '#ccc', borderWidth: 1, padding: 8 }}
      />
      <Button title="Skicka magisk länk" onPress={sendLink} />
      {sent && <Text style={{ marginTop: 12 }}>Kolla din e-post...</Text>}
    </View>
  );
}
