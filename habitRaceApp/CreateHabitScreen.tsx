import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { supabase } from '../lib/supabase';

export default function CreateHabitScreen() {
  const [title, setTitle] = useState('');

  const save = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from('habits').insert({ owner_id: user.id, title });
    if (!error) {
      setTitle('');
    } else {
      alert(error.message);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>Ny vana</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Ex: 2 min meditation"
      />
      <Button title="Spara" onPress={save} />
    </View>
  );
}
