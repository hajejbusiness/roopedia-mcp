# roopedia-mcp — Verified AI Software Pricing & MCP Security Server

[![Roopedia Official Docs Verified](https://roopedia.com/api/badge/roopedia-mcp.svg)](https://roopedia.com/mcp)
[![Open-Data Barometer CC-BY 4.0](https://roopedia.com/api/badge/stats.svg)](https://roopedia.com/stats)

**`roopedia-mcp`** is a zero-dependency Model Context Protocol (`MCP`) server (`stdio`) that connects **Claude Desktop**, **Cursor**, **Windsurf**, **VS Code**, and **Antigravity** directly to [Roopedia](https://roopedia.com) — the bilingual (EN/FR), 100% SFW AI & Agentic Software Decision Lab.

Instead of relying on outdated training cutoffs or affiliate-biased listicles, coding and research agents can query:
- **Verified Starting Prices & Plan Tiers** (`< 30d` official pricing checks) across [430+ audited AI tools](https://roopedia.com/pricing)
- **Free-Forever vs Trial-Trap Verification** ([Verified Free & Open-Source Hub](https://roopedia.com/free))
- **Live Macro Ecosystem Statistics** ([CC-BY 4.0 AI Pricing & MCP Barometer](https://roopedia.com/stats) / [French Barometer](https://roopedia.com/fr/stats))
- **Model Context Protocol Security & Transport Registry** ([40+ MCP Servers, Clients & Skills](https://roopedia.com/mcp))

---

## Exposed MCP Tools

1. **`search_verified_ai_tools`**
   - Filter by `query`, `category` (`workflows`, `code-assistant`, `education`, `transcriber`, `text-to-image`, etc.), `onlyFree` (`true`/`false`), and `lang` (`en` or `fr`).
   - Returns verified starting prices, credit-card gate warnings, developer API availability, compliance signals (`SOC 2`, `GDPR / RGPD`, `Open Source`), and canonical Roopedia comparison/alternatives URLs.
2. **`get_ai_ecosystem_barometer`**
   - Pulls live JSON metrics from [`https://roopedia.com/api/stats`](https://roopedia.com/api/stats) under **Creative Commons CC-BY 4.0**.

---

## Quick Configuration (`claude_desktop_config.json` / Cursor `mcp.json`)

Clone or download `index.mjs` (requires only Node.js `>= 18`, zero npm dependencies):

```json
{
  "mcpServers": {
    "roopedia": {
      "command": "node",
      "args": ["/absolute/path/to/roopedia-mcp/index.mjs"]
    }
  }
}
```

Or run isolated via Docker:

```bash
docker build -t roopedia-mcp .
docker run -i --rm roopedia-mcp
```

---

## Official Links & Open Data (CC-BY 4.0)

- **Global Hub (EN):** [https://roopedia.com](https://roopedia.com)
- **Observatoire Francophone (FR):** [https://roopedia.com/fr](https://roopedia.com/fr)
- **MCP Security & Client Registry:** [https://roopedia.com/mcp](https://roopedia.com/mcp) · [Version FR](https://roopedia.com/fr/mcp)
- **Verified Free & No-Card AI Tools:** [https://roopedia.com/free](https://roopedia.com/free) · [Version FR](https://roopedia.com/fr/free)
- **Live CC-BY 4.0 Ecosystem Barometer:** [https://roopedia.com/stats](https://roopedia.com/stats) · [API JSON](https://roopedia.com/api/stats)
- **LLM Grounding Index:** [https://roopedia.com/llms.txt](https://roopedia.com/llms.txt) · [Full Digest](https://roopedia.com/llms-full.txt)
- **Submit an AI Tool or MCP Server (Free Audit):** [https://roopedia.com/submit](https://roopedia.com/submit)

## License

MIT License — Data served under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) with attribution to [Roopedia](https://roopedia.com/stats).
