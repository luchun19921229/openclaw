
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { ensureOpenClawModelsJson } from "./src/agents/models-config.js";
import { resolveModel } from "./src/agents/pi-embedded-runner/model.js";
import { loadConfig } from "./src/config/config.js";
import { resolveApiKeyForProvider } from "./src/agents/model-auth.js";
import { createChatClient, ChatMessage } from "@mariozechner/pi-ai";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function test() {
  console.log("Testing MiniMax with OpenClaw");

  // Set API key as environment variable
  process.env.MINIMAX_API_KEY = "sk-cp-tHHnpXUMDrmFd_RRJvDPSZjeuwkXn7zvvNCXTizkkEmuvO9cRIMCPuLcfaGFrdHrdZcnQbLaxHHa_O02rp4XNnyg81pP4hii4cs6edn-3Q9amChCvi6x-4g";

  const cfg = loadConfig();
  const result = await ensureOpenClawModelsJson(cfg);
  console.log("Models config:", result.wrote ? "created" : "already exists");

  const { model, error } = resolveModel("minimax", "MiniMax-M2.7", result.agentDir, cfg);

  if (error || !model) {
    console.error("Error resolving model:", error);
    return;
  }

  console.log("Found model:", model.id);

  const authInfo = await resolveApiKeyForProvider({
    provider: "minimax", cfg, agentDir: result.agentDir });
  console.log("Resolved API key source:", authInfo.source);

  const client = createChatClient(model, { apiKey: authInfo.apiKey! });

  const messages: ChatMessage[] = [
    { role: "system", content: "你是一个有帮助的 AI 助手。" },
    { role: "user", content: "你好，请简单介绍一下自己" },
  ];

  console.log("\nSending message...");
  const response = await client.chat({
    messages,
    { maxTokens: 1000, temperature: 0.7 }
  );

  let fullResponse = "";
  for await (const chunk of response) {
    process.stdout.write(chunk.content);
    fullResponse += chunk.content;
  }

  console.log("\n\nDone!");
}

test().catch(console.error);
