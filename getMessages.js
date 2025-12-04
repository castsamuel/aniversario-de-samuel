import { supabase } from '../lib/supabase.js';

export default async function handler(req, res) {
  // Libera apenas 22/12 às 00:00 do ano atual
  const now = new Date();
  const releaseDate = new Date(now.getFullYear(), 11, 22, 0, 0, 0);

  if (now < releaseDate) {
    return res.json({ available: false, messages: [] });
  }

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('id', { ascending: false });

  if (error) return res.status(500).json({ error });

  res.json({ available: true, messages: data });
}
