#!/usr/bin/env node
/**
 * roopedia-mcp — Official Zero-Dependency Model Context Protocol (MCP) Server
 * Connects Claude Desktop, Cursor, Windsurf, VS Code & Antigravity to Roopedia's
 * live CC-BY 4.0 Verified AI Software Pricing & MCP Barometer APIs.
 */

import readline from "node:readline";

const BASE_URL = process.env.ROOPEDIA_BASE_URL || "https://roopedia.com";

const TOOLS = [
  {
    name: "search_verified_ai_tools",
    description:
      "Search Roopedia's verified AI & agentic software catalog by keyword, category, or free-tier availability. Returns verified starting prices, free-tier traps, API support, and compliance signals.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Keyword, tool name, or workflow (e.g. 'n8n', 'cursor', 'transcription')" },
        category: { type: "string", description: "Optional category slug (e.g. 'workflows', 'code-assistant', 'education')" },
        onlyFree: { type: "boolean", description: "Set true to filter for tools with free/open-source access" },
        lang: { type: "string", enum: ["en", "fr"], description: "Response language ('en' or 'fr')" },
        limit: { type: "number", description: "Max items to return (1-25)" },
      },
    },
  },
  {
    name: "get_ai_ecosystem_barometer",
    description:
      "Fetch live CC-BY 4.0 macro statistics across all audited AI tools & MCP servers on Roopedia (free-forever vs paid share, API coverage, open-source count, compliance breakdown, top categories).",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

async function callRoopediaTool(name, args = {}) {
  if (name === "get_ai_ecosystem_barometer") {
    const res = await fetch(`${BASE_URL}/api/stats`, {
      headers: { Accept: "application/json", "User-Agent": "roopedia-mcp/1.0" },
    });
    if (!res.ok) throw new Error(`Roopedia /api/stats returned HTTP ${res.status}`);
    const data = await res.json();
    return JSON.stringify(data, null, 2);
  }

  if (name === "search_verified_ai_tools") {
    const params = new URLSearchParams();
    if (args.query) params.set("q", String(args.query));
    if (args.category) params.set("category", String(args.category));
    if (args.onlyFree) params.set("free", "true");
    if (args.lang === "fr") params.set("lang", "fr");
    params.set("limit", String(Math.min(25, Math.max(1, Number(args.limit) || 10))));

    const res = await fetch(`${BASE_URL}/api/tools?${params.toString()}`, {
      headers: { Accept: "application/json", "User-Agent": "roopedia-mcp/1.0" },
    });
    if (!res.ok) throw new Error(`Roopedia /api/tools returned HTTP ${res.status}`);
    const data = await res.json();
    return JSON.stringify(data, null, 2);
  }

  throw new Error(`Unknown tool: ${name}`);
}

function sendJsonRpc(msg) {
  process.stdout.write(`${JSON.stringify(msg)}\n`);
}

const rl = readline.createInterface({ input: process.stdin, terminal: false });

rl.on("line", async (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  let req;
  try {
    req = JSON.parse(trimmed);
  } catch {
    return;
  }

  const { id, method, params } = req;
  if (method === "notifications/initialized") return;

  try {
    if (method === "initialize") {
      sendJsonRpc({
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: { tools: {} },
          serverInfo: { name: "roopedia-mcp", version: "1.0.0" },
        },
      });
      return;
    }

    if (method === "tools/list") {
      sendJsonRpc({ jsonrpc: "2.0", id, result: { tools: TOOLS } });
      return;
    }

    if (method === "tools/call") {
      const text = await callRoopediaTool(params?.name, params?.arguments || {});
      sendJsonRpc({
        jsonrpc: "2.0",
        id,
        result: { content: [{ type: "text", text }] },
      });
      return;
    }

    if (id !== undefined) {
      sendJsonRpc({
        jsonrpc: "2.0",
        id,
        error: { code: -32601, message: `Method not found: ${method}` },
      });
    }
  } catch (err) {
    if (id !== undefined) {
      sendJsonRpc({
        jsonrpc: "2.0",
        id,
        error: {
          code: -32000,
          message: err instanceof Error ? err.message : String(err),
        },
      });
    }
  }
});
