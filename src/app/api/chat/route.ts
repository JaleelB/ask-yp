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

 
const openAIConfig = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(openAIConfig);
 
export const runtime = 'edge';

type chatRequest = {
    messages: ChatCompletionRequestMessage[];
};

type location = {
    latitude: number;
    longitude: number;
}

type IpInfoResponse = {
    loc?: string;
    city?: string;
    region?: string;
    country?: string;
    ip?: string;
    hostname?: string;
    postal?: string;
    org?: string;
    timezone?: string;
};

export async function getGeoLocation(ipAddress: string): Promise<location | null> {

    const LOCALHOST_IP = "::1";
    const MOCK_LOCATION: location = { latitude: 37.7749, longitude: -122.4194 }; // Example: San Francisco

    if (ipAddress === LOCALHOST_IP) {
        console.warn("Using mock location for localhost IP");
        return MOCK_LOCATION;
    }

    try {
        const response = await fetch(`https://ipinfo.io/${ipAddress}/token=${env.IPINFO_TOKEN}`);

        if (!response.ok) {
            throw new Error("Failed to fetch geolocation.");
        }

        const data = await response.json() as IpInfoResponse;

        if (!data.loc) {
            throw new Error("Location data is missing.");
        }

        const coords = data.loc.split(',');

        // Check if we have both latitude and longitude
        if (coords.length !== 2) {
            throw new Error("Unexpected location format.");
        }

        const latitude = parseFloat(coords[0]!);
        const longitude = parseFloat(coords[1]!);

        if (isNaN(latitude) || isNaN(longitude)) {
            throw new Error("Failed to parse latitude or longitude");
        }

        return {
            latitude,
            longitude
        };

    } catch (error) {
        console.error("Error fetching geolocation:", error);
        return null;
    }
}


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
        console.log("ipAddress:", ipAddress)

        if (!ipAddress) {
            throw new Error("Cannot determine IP address");
        }

        const locationResult = await getGeoLocation(ipAddress);
        console.log("locationResult:", locationResult)

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
        console.log(stream)
        return new StreamingTextResponse(stream);
    }

   return null
}
