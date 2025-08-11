import { ApiPath } from "@/app/constant";
import { NextRequest } from "next/server";
import { handle as openaiHandler } from "../../openai";
import { handle as azureHandler } from "../../azure";
import { handle as googleHandler } from "../../google";
import { handle as anthropicHandler } from "../../anthropic";
import { handle as baiduHandler } from "../../baidu";
import { handle as bytedanceHandler } from "../../bytedance";
import { handle as alibabaHandler } from "../../alibaba";
import { handle as moonshotHandler } from "../../moonshot";
import { handle as stabilityHandler } from "../../stability";
import { handle as iflytekHandler } from "../../iflytek";
import { handle as deepseekHandler } from "../../deepseek";
import { handle as siliconflowHandler } from "../../siliconflow";
import { handle as xaiHandler } from "../../xai";
import { handle as chatglmHandler } from "../../glm";
import { handle as proxyHandler } from "../../proxy";
import { handle as ai302Handler } from "../../302ai";

async function handle(
  req: NextRequest,
  { params }: { params: { provider: string; path: string[] } },
) {
  const apiPath = `/api/${params.provider}`;
  console.log(`[${params.provider} Route] params `, params);

  switch (apiPath) {
    case ApiPath.Azure:
      return azureHandler(req, { params });
    case ApiPath.Google:
      return googleHandler(req, { params });
    case ApiPath.Anthropic:
      return anthropicHandler(req, { params });
    case ApiPath.Baidu:
      return baiduHandler(req, { params });
    case ApiPath.ByteDance:
      return bytedanceHandler(req, { params });
    case ApiPath.Alibaba:
      return alibabaHandler(req, { params });
    case ApiPath.Moonshot:
      return moonshotHandler(req, { params });
    case ApiPath.Stability:
      return stabilityHandler(req, { params });
    case ApiPath.Iflytek:
      return iflytekHandler(req, { params });
    case ApiPath.DeepSeek:
      return deepseekHandler(req, { params });
    case ApiPath.XAI:
      return xaiHandler(req, { params });
    case ApiPath.ChatGLM:
      return chatglmHandler(req, { params });
    case ApiPath.SiliconFlow:
      return siliconflowHandler(req, { params });
    case ApiPath.OpenAI:
      // ✅ OpenAI 走专门 handler（下个文件）
      return openaiHandler(req, { params });
    case ApiPath["302.AI"]:
      return ai302Handler(req, { params });
    default:
      return proxyHandler(req, { params });
  }
}

export const GET = handle;
export const POST = handle;

// ✅ 核心：用 Node.js 运行时 + 提高函数时长，规避 Edge 的 25s 首包限制
export const runtime = "nodejs";
export const maxDuration = 60; // 可按套餐调大
