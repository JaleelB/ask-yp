export default function Footer() {
    return (
        <footer className="pb-3 pt-2 text-center text-xs px-10 md:px-[60px] md:pb-6 md:pt-3">
            <p className="text-center text-xs text-gray-400">
                This project waas built with{" "}
                <a
                    href="https://platform.openai.com/docs/guides/gpt/function-calling"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                >
                    OpenAI Functions
                </a>{" "}
                and{" "}
                <a
                    href="https://sdk.vercel.ai/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                >
                    Vercel AI SDK
                </a>
                .{" "}
                <a
                    href="https://github.com/JaleelB/ask-yelp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                >
                    View the project repo here.
                </a>
            </p>
        </footer>
    )
}