export type SiteConfig = {
    name: string
    description: string
    url: string
    ogImage: string
    links: {
      twitter: string
      github: string
    }
}

export const siteConfig: SiteConfig = {
    name: "AskYP - AI-Powered Chatbot for Local Business Insights via Yelp",
    description:
        "Explore local businesses effortlessly with AskYP – an AI-driven chatbot powered by OpenAI. Dive into reviews, ratings, and services in your area using natural language queries. Integrated with the Yelp Fusion API, AskYP offers real-time recommendations and insights. Try it now!",
    url: "https://askyp.vercel.app/",
    ogImage: "https://askyp.vercel.app/web-shot.png",
    links: {
        twitter: "https://twitter.com/jal_eelll",
        github: "https://github.com/JaleelB/ask-yp",
    },
}