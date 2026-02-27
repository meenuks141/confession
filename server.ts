import express from "express";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Lazy initialization of Supabase client
let supabaseClient: any = null;
function getSupabase() {
  if (!supabaseClient) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY are required");
    }
    supabaseClient = createClient(url, key);
  }
  return supabaseClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/confessions", async (req, res) => {
    const { userId } = req.query;
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("confession")
        .select("*");

      if (error) throw error;
      
      if (!data) return res.json([]);

      // Fetch likes for this user if userId is provided
      let userLikes: string[] = [];
      if (userId) {
        const { data: likes, error: likesError } = await supabase
          .from("likes")
          .select("confession_id")
          .eq("user_id", userId);
        
        if (!likesError && likes) {
          userLikes = likes.map((l: any) => l.confession_id);
        }
      }

      const mappedData = data.map((item: any) => ({
        id: item.id || Math.random().toString(36).substr(2, 9),
        message: item.confession,
        likes_count: item.like || 0,
        created_at: item.created_at || new Date().toISOString(),
        has_liked: userLikes.includes(item.id)
      }));

      res.json(mappedData);
    } catch (error: any) {
      console.error("Supabase error:", error.message);
      res.json([]);
    }
  });

  app.post("/api/confessions", async (req, res) => {
    const { message } = req.body;
    if (!message || message.length < 1 || message.length > 1000) {
      return res.status(400).json({ error: "Invalid message length" });
    }

    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("confession")
        .insert([{ confession: message, like: 0 }])
        .select()
        .single();

      if (error) throw error;

      res.status(201).json({
        id: data.id || Math.random().toString(36).substr(2, 9),
        message: data.confession,
        likes_count: data.like || 0,
        created_at: data.created_at || new Date().toISOString(),
        has_liked: false
      });
    } catch (error: any) {
      console.error("Supabase error:", error.message);
      res.status(500).json({ error: "Failed to post confession" });
    }
  });

  app.post("/api/confessions/:id/like", async (req, res) => {
    const { id } = req.params;

    try {
      const supabase = getSupabase();
      
      const { data: current, error: fetchError } = await supabase
        .from("confession")
        .select("like")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;

      const newCount = (current.like || 0) + 1;

      const { data, error } = await supabase
        .from("confession")
        .update({ like: newCount })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      res.json({
        id: data.id || Math.random().toString(36).substr(2, 9),
        message: data.confession,
        likes_count: data.like || 0,
        created_at: data.created_at || new Date().toISOString(),
        has_liked: false // No longer tracking individual likes
      });
    } catch (error: any) {
      console.error("Supabase error:", error.message);
      res.status(500).json({ error: "Failed to update like" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
