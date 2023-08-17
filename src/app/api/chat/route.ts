import { 
    type ChatCompletionRequestMessage, 
    Configuration, 
    OpenAIApi,
    type CreateChatCompletionResponse, 
    type ChatCompletionResponseMessage
} from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { env } from '@/env.mjs';
import { functions, runChatFunctions } from '@/app/chat-functions';
import { type location } from '@/lib/types';
import { getGeoLocation } from '@/lib/utils';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

 
const openAIConfig = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(openAIConfig);
 
export const runtime = 'edge';

type chatRequest = {
    messages: ChatCompletionRequestMessage[];
};


export async function POST(req: Request) {

    const ipAddress = req.headers.get("x-forwarded-for");

    if (
        process.env.NODE_ENV !== "development" &&
        process.env.KV_REST_API_URL &&
        process.env.KV_REST_API_TOKEN
      ) {
        
        const ratelimit = new Ratelimit({
          redis: kv,
          limiter: Ratelimit.slidingWindow(20, "1 d"),
        });
    
        const { success, limit, reset, remaining } = await ratelimit.limit(
          `askyp_ratelimit_${ipAddress}`,
        );
    
        if (!success) {
          return new Response("You have reached your request limit for the day.", {
            status: 429,
            headers: {
              "X-RateLimit-Limit": limit.toString(),
              "X-RateLimit-Remaining": remaining.toString(),
              "X-RateLimit-Reset": reset.toString(),
            },
          });
        }
    }

    const { messages } = await req.json() as chatRequest;

    // Send the conversation and available functions to GPT
    const initialResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-0613",
        messages,
        functions,
        function_call: "auto",
    });

    const initialResponseJson: CreateChatCompletionResponse = await initialResponse.json() as CreateChatCompletionResponse;

    if (!initialResponseJson?.choices[0]?.message) {
        throw new Error("Missing message in response");
    }

    const initialResponseMessage: ChatCompletionResponseMessage = initialResponseJson?.choices[0]?.message;

    if (initialResponseMessage.function_call) {

        const { name, arguments: argsString } = initialResponseMessage.function_call;

        if(!name || !argsString) {
            throw new Error("Function name or arguments are missing");
        }

        if (!ipAddress) {
            throw new Error("Cannot determine IP address");
        }

        const locationResult = await getGeoLocation(ipAddress);

        if (!locationResult) {
            throw new Error("Cannot determine location for this IP");
        }

        const params: location = locationResult;

        if (typeof params.latitude !== 'number' || typeof params.longitude !== 'number') {
            throw new Error("Invalid latitude or longitude values");
        }

        const functionResponse = await runChatFunctions(name, params);

        const finalResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo-0613",
            stream: true,
            messages: [
              ...messages,
              initialResponseMessage,
              {
                role: "function",
                name: name,
                content: JSON.stringify(functionResponse),
              },
            ],
        });

        const stream = OpenAIStream(finalResponse);
        return new StreamingTextResponse(stream);
    }
    else{
        // If there is no function call available for user request, just return the response
        const responseContent = initialResponseJson.choices[0]?.message?.content ?? "";
        const words = responseContent.split(' ');

        // Convert the response to a readable stream
        const stream = new ReadableStream({
            async start(controller) {
                for (const word of words) {
                    controller.enqueue(new TextEncoder().encode(word + ' ')); // + ' ' to add space after each word

                    // Wait for a random delay between 20ms to 50ms
                    const delay = Math.random() * (50 - 20) + 20;
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
                controller.close();
            }
        });

        return new StreamingTextResponse(stream);

    }
}
