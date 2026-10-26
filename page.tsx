// Supabase Test Page Example
import React, { useEffect, useState } from 'react';
import { supabase } from './src/utils/supabase/client';

export default function Page() {
  const [todos, setTodos] = useState<Array<{ id: string | number; name: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string>('Connecting to Supabase...');

  useEffect(() => {
    async function fetchTodos() {
      try {
        const { data, error } = await supabase.from('todos').select();
        if (error) {
          setStatusMessage(`Connected to Supabase project! (Table 'todos': ${error.message})`);
        } else if (data) {
          setTodos(data);
          setStatusMessage(`Loaded ${data.length} todos from Supabase`);
        }
      } catch (err: any) {
        setStatusMessage(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchTodos();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Supabase Connected: knpcnaanzirifithdgbj</h1>
      <p style={{ color: '#2D7A57', fontWeight: 'bold' }}>{statusMessage}</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
