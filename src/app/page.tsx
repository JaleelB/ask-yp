"use client"
import PromptDialog from "@/components/prompt-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import * as React from "react";


const exploreOptions = [
  {
    title: "Local Businesses & Services",
    description: "Explore restaurants, coffee shops, and services in your area.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none">
        <path d="M18 23V20H15V18H18V15H20V18H23V20H20V23H18ZM2 20V14H1V12L2 7H17L18 12V14H17V17H15V14H11V20H2ZM4 18H9V14H4V18ZM2 6V4H17V6H2ZM3.05 12H15.95L15.35 9H3.65L3.05 12Z" fill="white"/>
      </svg>
    ),
  },
  {
    title: "Events and Entertainment",
    description: "Discover the best events, and entertainment in your area.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="26" viewBox="0 0 24 26" fill="none">
        <path d="M22 2H18V0H16V2H8V0H6V2H2C0.9 2 0 2.9 0 4V24C0 25.1 0.9 26 2 26H22C23.1 26 24 25.1 24 24V4C24 2.9 23.1 2 22 2ZM22 24H2V10H22V24ZM22 8H2V4H6V6H8V4H16V6H18V4H22V8Z" fill="white"/>
      </svg>
    )
  },
  {
    title: "Health and Wellness Services",
    description: "Find the best health and wellness services in your area.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 22 22" fill="none">
        <path d="M15 2C15 1.73478 14.8946 1.48043 14.7071 1.29289C14.5196 1.10536 14.2652 1 14 1H8C7.73478 1 7.48043 1.10536 7.29289 1.29289C7.10536 1.48043 7 1.73478 7 2V7H2C1.73478 7 1.48043 7.10536 1.29289 7.29289C1.10536 7.48043 1 7.73478 1 8V14C1 14.2652 1.10536 14.5196 1.29289 14.7071C1.48043 14.8946 1.73478 15 2 15H7V20C7 20.2652 7.10536 20.5196 7.29289 20.7071C7.48043 20.8946 7.73478 21 8 21H14C14.2652 21 14.5196 20.8946 14.7071 20.7071C14.8946 20.5196 15 20.2652 15 20V15H20C20.2652 15 20.5196 14.8946 20.7071 14.7071C20.8946 14.5196 21 14.2652 21 14V8C21 7.73478 20.8946 7.48043 20.7071 7.29289C20.5196 7.10536 20.2652 7 20 7H15V2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
]


export default function Home() {

  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  return (
    <>
      <main className="container max-w-[1000px] display flex flex-col mx-auto flex-1 pb-40">
        <section className="w-full m-auto lg:m-8 lg:mx-auto 2xl:m-auto">
          <div className="w-full flex flex-col gap-8">
            <div className="max-w-[650px] mx-auto flex flex-col gap-4 items-center p-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="84" height="80" viewBox="0 0 84 80" fill="none">
                  <path d="M26.124 54.7311L29.4438 64.4561C29.5383 64.7333 29.7075 64.9821 29.9346 65.1776C30.1616 65.3731 30.4385 65.5084 30.7376 65.5701C31.0367 65.6319 31.3476 65.6178 31.6392 65.5294C31.9308 65.4409 32.193 65.2812 32.3995 65.0661L47.201 49.6895" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                  <path d="M66.3005 41.7289C66.3005 41.7289 64.4455 51.0906 53.4747 51.0906C42.504 51.0906 35.5897 38.1973 27.3262 38.1973C17.5647 38.1973 15.001 46.0023 15.001 51.0906C15.001 55.4339 17.423 57.1989 20.629 57.1989C23.835 57.1989 29.82 52.0406 32.3855 49.3939H46.5605" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                  <path d="M27.3262 38.1978C27.3262 33.7195 23.5498 30.2578 17.6365 30.2578C11.7233 30.2578 7.875 33.0411 7.875 40.9111C7.875 48.7811 15.0203 50.3411 15.0203 50.3411" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                  <path d="M12.698 31.1689C10.4685 25.5656 15.9968 20.0806 24.5473 20.0806C37.5148 20.0806 38.689 40.1306 51.1228 40.1306C61.4548 40.1306 68.383 27.3689 63.6633 20.0139C57.393 10.2406 46.9088 12.0372 42.49 16.0406" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                  <path d="M24.5472 20.0809C26.8992 12.5476 38.6907 12.3109 43.358 16.7559C48.0252 21.2009 47.775 27.5443 41.2265 34.4926M57.8252 38.1993C62.8442 43.9993 75.1817 43.1926 76.0725 31.6909C76.9632 20.1893 66.3897 20.3743 64.2775 21.1443" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                </svg>
                <h1 className="text-4xl sm:text-5xl text-primary font-bold">AskYP</h1>
                <p className="max-w-[600px] mt-2 text-secondary text-center hidden md:block">AskYP is an open source AI chatbot that can interact with the Yelp Fusion API with natural language using Open AI functions and the Vercel AI SDK</p>
            </div>
            <div className="hidden w-full md:flex flex-col lg:flex-row gap-4 md:gap-0 items-center px-4 md:px-0">
              {
                exploreOptions.map((option, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col gap-4 md:items-center w-full sm:min-w-[300px] md:p-3 lg:p-6"
                  >
                    <div className="flex lg:flex-col lg:items-center gap-4">
                      {option.icon}
                      <h2 className="lg:text-center text-lg text-primary font-semibold">{option.title}</h2>
                    </div>
                    <p className="text-center text-secondary hidden lg:block">{option.description}</p>
                  </div> 
                ))
              }
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full fixed bottom-0 flex flex-col items-center space-y-2 p-5 pb-3 sm:px-0">
        <div className="mx-auto flex w-full max-w-[750px] md:px-6 lg:px-0">
          <div className="flex-grow"></div>
          <PromptDialog
            open={isDialogOpen}
            onOpenChange={() => setIsDialogOpen(!isDialogOpen)}
          />
        </div>
        <form className="w-full max-w-[750px] md:px-6 lg:px-0">
          <div className="w-full relative py-[10px] mx-auto">
            <Textarea
              className={cn("h-[50px] bg-primary/[8%] items-center max-h-[200px] max pt-3 resize-none")}
              placeholder="Type your message here."
            />
            <Button 
              className="absolute bg-transparent top-4 right-1 hover:bg-transparent"
              size="sm"
              variant="ghost"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2.72403 2.05294C2.63791 2.0098 2.54115 1.99246 2.4454 2.003C2.34965 2.01355 2.25899 2.05152 2.18431 2.11236C2.10963 2.17321 2.05412 2.25432 2.02444 2.34597C1.99476 2.43761 1.99219 2.53587 2.01703 2.62894L3.51503 8.24694C3.53978 8.33958 3.59065 8.42315 3.66157 8.48769C3.73249 8.55223 3.82048 8.59501 3.91503 8.61094L10.77 9.75294C11.049 9.79994 11.049 10.1999 10.77 10.2469L3.91603 11.3889C3.82129 11.4047 3.7331 11.4474 3.66198 11.5119C3.59087 11.5765 3.53986 11.6602 3.51503 11.7529L2.01703 17.3709C1.99219 17.464 1.99476 17.5623 2.02444 17.6539C2.05412 17.7456 2.10963 17.8267 2.18431 17.8875C2.25899 17.9484 2.34965 17.9863 2.4454 17.9969C2.54115 18.0074 2.63791 17.9901 2.72403 17.9469L17.724 10.4469C17.807 10.4054 17.8767 10.3415 17.9255 10.2626C17.9742 10.1837 18 10.0927 18 9.99994C18 9.90716 17.9742 9.81622 17.9255 9.73728C17.8767 9.65833 17.807 9.59451 17.724 9.55294L2.72403 2.05294Z" fill="white"/>
              </svg>
            </Button>
          </div>
        </form>
        <div className="pb-3 text-center text-xs px-4 md:px-[60px]">
          <p className="text-center text-xs text-primary/60">
              This project waas built with{" "}
              <a
                  href="https://platform.openai.com/docs/guides/gpt/function-calling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary-foreground"
              >
                  OpenAI Functions
              </a>{" "}
              and{" "}
              <a
                  href="https://sdk.vercel.ai/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary-foreground"
              >
                  Vercel AI SDK
              </a>
              .{" "}
              <a
                  href="https://github.com/JaleelB/ask-yelp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary-foreground"
              >
                  View the project repo here.
              </a>
          </p>
        </div>
      </footer>
    </>
  );
}
