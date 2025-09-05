import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { supabase } from '../lib/supabase';

type Habit = { id: string; title: string; streak: number };

export default function HomeScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);

  const load = async () => {
    const { data, error } = await supabase
      .from('habits')
      .select('id,title,streak')
      .order('created_at');
    if (!error && data) {
      setHabits(data as any);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const logHabit = async (id: string) => {
    const { error } = await supabase.rpc('log_habit', { p_habit_id: id });
    if (!error) {
      load();
    } else {
      alert(error.message);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, marginBottom: 12 }}>Dagens vanor</Text>
      <FlatList
        data={habits}
        keyExtractor={(h) => h.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12 }}>
            <Text>
              {item.title} • Streak: {item.streak}
            </Text>
            <Button title="Klart idag" onPress={() => logHabit(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
