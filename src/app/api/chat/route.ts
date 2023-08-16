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

 
const openAIConfig = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(openAIConfig);
 
export const runtime = 'edge';

type chatRequest = {
    messages: ChatCompletionRequestMessage[];
};

export async function POST(req: Request) {

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

        const ipAddress: string | undefined = (req.headers.get('x-forwarded-for')?.split(',')[0] ?? undefined) ?? undefined;

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

   return null
}
