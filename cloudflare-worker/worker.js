/**
 * Langy AI Proxy — Cloudflare Worker
 * 
 * Этот Worker хранит API-ключ OpenRouter на сервере
 * и проксирует запросы от фронтенда к AI.
 * 
 * Переменная OPENROUTER_API_KEY задаётся через
 * Cloudflare Dashboard → Workers → Settings → Variables
 */

export default {
  async fetch(request, env) {
    // CORS: разрешаем запросы с любого домена (для MVP)
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Preflight запрос (браузер отправляет перед POST)
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Принимаем только POST
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    try {
      // Читаем тело запроса от фронтенда
      const body = await request.json();

      // Проксируем в OpenRouter, добавляя наш секретный ключ
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://langy.app',
          'X-Title': 'Langy AI English Teacher',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: 'Proxy error', details: err.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};
