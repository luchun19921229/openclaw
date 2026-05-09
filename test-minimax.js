
// 简单测试 MiniMax API
const API_KEY = "sk-cp-tHHnpXUMDrmFd_RRJvDPSZjeuwkXn7zvvNCXTizkkEmuvO9cRIMCPuLcfaGFrdHrdZcnQbLaxHHa_O02rp4XNnyg81pP4hii4cs6edn-3Q9amChCvi6x-4g";
const BASE_URL = "https://api.minimaxi.com/v1";

async function testMinimaxApi() {
  try {
    console.log("测试 MiniMax API...");
    const response = await fetch(`${BASE_URL}/text/chatcompletion_v2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "MiniMax-M2.7",
        messages: [
          {
            role: "system",
            content: "你是一个有帮助的 AI 助手，用简洁、准确的方式回答用户的问题。",
          },
          {
            role: "user",
            content: "你好，请简单介绍一下你自己",
          },
        ],
        stream: false,
        temperature: 1,
        top_p: 0.95,
        max_completion_tokens: 16384,
      }),
    });

    if (!response.ok) {
      console.error(`API 请求失败: ${response.status}`);
      const errorText = await response.text();
      console.error(`错误详情:`, errorText);
      return;
    }

    const data = await response.json();
    console.log("API 调用成功！");
    console.log("响应：", data);
    if (data.choices && data.choices.length > 0) {
      console.log("AI 回答：", data.choices[0].message.content);
    }
  } catch (error) {
    console.error("测试失败：", error);
  }
}

testMinimaxApi();
