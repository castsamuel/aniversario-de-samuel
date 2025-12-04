import { supabase } from '../lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { name, content } = req.body;

  if (!name || !content) {
    return res.status(400).json({ error: "Campos faltando" });
  }

  const { error } = await supabase
    .from('messages')
    .insert([{ name, content }]);

  if (error) return res.status(500).json({ error });

  res.json({ success: true });
}
