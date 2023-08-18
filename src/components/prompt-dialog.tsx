"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import * as React from "react";


type Prompt = {
    category: string
    titles: string[];
    prompts: string[];
}

const prompts: Prompt[] = [
    {
      category: "Businesses",
      titles: [
        "Discover Nearby Businesses",
        "Businesses Around You",
        "Highly Rated Businesses",
        "Local Business Directory",
        "Businesses with Stellar Reviews"
      ],
      prompts: [
        "Explore co-working spaces located close to me",
        "Search for organic grocery stores operating in my area",
        "Search for highly rated coffee shops operating in my vicinity",
        "Locate businesses near me that specialize in eco-friendly products",
        "Locate businesses near me that have received excellent reviews"
      ]
    },
    {
      category: "Restaurant/Food Services",
      titles: [
        "Dine Nearby",
        "Culinary Delights Around You",
        "Top Culinary Spots",
        "Local Dining Options",
        "Vegetarian/Vegan Friendly Eateries"
      ],
      prompts: [
        "Provide a list of restaurants and eateries located close to me for a quick bite",
        "Discover Italian restaurants located close to me",
        "Show me top culinary restaurants near me that are highly recommended by locals",
        "Provide a list of local restaurants suitable for a family dinner",
        "Locate restaurants near me that offer vegetarian and vegan options"
      ]
    },
    {
      category: "Local Services",
      titles: [
        "Services at Your Doorstep",
        "Local Service Providers",
        "Top Service Recommendations",
        "Directory of Local Services",
        "Trusted Local Services"
      ],
      prompts: [
        "Find home cleaning services that use green products",
        "Search for dog walkers operating in my vicinity",
        "Provide a list of landscapers available in my area",
        "Locate electricians near me with top-notch service ratings",
        "Provide a directory of well rated services available in my area",
      ]
    },
    {
      category: "Entertainment",
      titles: [
        "Entertainment Hotspots",
        "Nightlife Adventures",
        "Top Bars and Clubs",
        "Local Entertainment Guide"
      ],
      prompts: [
        "Discover entertainment options for a fun-filled evening near me",
        "Search for nightlife spots to enjoy with friends in my area",
        "Show me bars and clubs near me that are popular on weekends",
        "Provide a guide to local entertainment and cultural events",
      ]
    },
    {
      category: "Health & Wellness",
      titles: [
        "Wellness Centers Nearby",
        "Fitness and Gym Options",
        "Top Yoga and Meditation Studios",
        "Holistic Wellness Centers",
        "Health and Wellness Workshops"
      ],
      prompts: [
        "Find health and wellness centers near me for holistic care",
        "Search for gyms and fitness centers in my area with modern equipment",
        "Show me yoga studios near me that offer both beginner and advanced classes",
        "Provide a list of wellness centers that focus on holistic health",
        "Locate workshops or seminars near me focused on health and well-being"
      ]
    },
    {
      category: "Shopping & Retail",
      titles: [
        "Shopping Destinations",
        "Retail Therapy Spots",
        "Fashion and Clothing Stores",
        "Local Artisanal Shops",
        "Bookstores and Reading Spaces"
      ],
      prompts: [
        "Discover shopping centers near me for a day of retail therapy",
        "Search for retail stores in my area offering seasonal discounts",
        "Show me clothing stores near me that offer both casual and formal wear",
        "Find local artisanal shops or boutiques with unique products",
      ]
    }
]


  
export default function PromptDialog({
    open,
    onOpenChange,
    promptHandler
}:{
    open: boolean
    onOpenChange: () => void,
    promptHandler: (prompt: string) => void
}){

    const [selectedPromptCategory, setSelectedPromptCategory] = React.useState<string>("Businesses");
    const [selectedPromptIndex, setSelectedPromptIndex] = React.useState<number>(0);

    const selectedCategoryIndex = prompts.findIndex(prompt => prompt.category === selectedPromptCategory);
    const selectedPrompt = prompts[selectedCategoryIndex]?.prompts[selectedPromptIndex] ?? "";


    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
            <Button 
                variant="outline"
                className={cn("text-primary text-xs border border-primary/[8%] bg-neutral-800 hover:bg-neutral-700 hover:text-primary cursor-pointer")}
                onClick={() => onOpenChange()}
            >
                Browse Prompts
            </Button>
        </DialogTrigger>
        <DialogContent className={cn("max-w-[1000px] flex flex-col")}>
          <DialogHeader>
              <DialogTitle>Example Prompts</DialogTitle>
              <DialogDescription>Select from these prompts to quickly get started.</DialogDescription>
          </DialogHeader>
          <div className="hidden md:block">
            <div className="flex flex-col md:flex-row w-full items-start justify-start border-t border-t-primary/[8%] overflow-auto">
                <div className="flex flex-col gap-1 md:w-3.5/12 self-stretch overflow-scroll border-b border-b-primary/[8%] md:border-b-0 md:border-r md:border-r-primary/[8%] pb-3 md:pb-0 pt-3 pr-3 max-h-[500px]">
                    {
                        prompts.map((prompt, index) => (
                            <div 
                                className={cn(`p-3 items-center rounded-md justify-start font-normal text-base text-primary-foreground hover:bg-primary/[8%] hover:text-primary cursor-pointer ${prompt.category === selectedPromptCategory && "bg-primary/[8%] text-primary"}`)}
                                key={index * Math.random()}
                                onClick={() => setSelectedPromptCategory(prompt.category)}
                            >
                                {prompt.category}
                            </div>
                        ))
                    }
                </div>
                <div className="flex flex-col gap-1 md:w-4/12 self-stretch overflow-y-auto border-b border-b-primary/[8%] md:border-b-0 md:border-r md:border-r-primary/[8%] p-3 pl-0 md:pl-3 md:pb-3 max-h-[500px]">
                    {
                        prompts.map((prompt) => (
                            selectedPromptCategory === prompt.category &&
                            (
                                prompt.titles.map((title, index) => (
                                    <div 
                                        className={cn(`p-3 items-center rounded-md jjustify-start font-normal text-base text-primary-foreground hover:bg-primary/[5%] hover:text-primary cursor-pointer ${index === selectedPromptIndex && "bg-primary/[8%] text-primary"}`)}
                                        key={index * Math.random()}
                                        onClick={() => setSelectedPromptIndex(index)}
                                    >
                                        {title}
                                    </div>
                                ))
                            )
                        ))
                    }
                </div>
                <div className="flex md:w-5/12 flex-col items-end self-stretch pr-0  max-h-[500px] p-3 pb-6 pl-0 md:pl-3 md:pb-3">
                    <div className="relative h-full w-full overflow-y-scroll whitespace-pre-wrap rounded-md bg-primary/[5%] p-3 text-primary-foreground">
                        <span className="sticky top-0 z-50 flex w-full bg-grey-100 pb-2 text-xs text-grey-400">PREVIEW (WORKSPACE PROMPT)</span>
                        <div className="mt-4">
                          {selectedPrompt}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="flex-grow"></div>
                <Button 
                  className="bg-primary/[8%] text-primary border border-primary/[8%] hover:bg-primary/[10%]"
                  onClick={() => {
                    promptHandler(selectedPrompt)
                    onOpenChange()
                  }}
                >
                  Use Prompt
                </Button>
            </div>
          </div>
          <div className="md:hidden">
            <Accordion type="single" collapsible>
              {
                prompts.map((prompt, index) => (
                  <AccordionItem value={`item-${index}`} key={index * Math.random()}>
                    <AccordionTrigger
                      onClick={() => setSelectedPromptCategory(prompt.category)}
                    >
                        {prompt.category}
                    </AccordionTrigger>
                    {
                      prompts.map((prompt) => (
                        selectedPromptCategory === prompt.category &&
                        (
                            prompt.titles.map((title, index) => (
                              <AccordionContent 
                                key={index * Math.random()}
                                onClick={() => setSelectedPromptIndex(index)}
                                className={`${index === selectedPromptIndex && "text-primary"}`}
                              >
                                    {title}
                              </AccordionContent>
                            ))
                        )
                      ))
                    }
                  </AccordionItem>
                ))
              }
              <AccordionItem value="item-prompt-area" className="border-none">
                <div className="flex md:w-5/12 flex-col items-end self-stretch pr-0  max-h-[500px] p-3 pb-6 pl-0 md:pl-3 md:pb-3">
                  <div className="relative h-full w-full overflow-y-scroll whitespace-pre-wrap rounded-md bg-primary/[5%] p-3 text-primary-foreground">
                      <span className="sticky top-0 z-50 flex w-full bg-grey-100 pb-2 text-xs text-grey-400">PREVIEW (WORKSPACE PROMPT)</span>
                      <div className="mt-4">
                        {selectedPrompt}
                      </div>
                  </div>
                </div>
              </AccordionItem>
              <AccordionItem value="item-prompt-select" className="border-none">
                <div className="flex">
                  <div className="flex-grow"></div>
                  <Button 
                    className="bg-primary/[8%] text-primary border border-primary/[8%] hover:bg-primary/[10%]"
                    onClick={() => {
                      promptHandler(selectedPrompt)
                      onOpenChange()
                    }}
                  >
                    Use Prompt
                  </Button>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </DialogContent>
      </Dialog>
    )
}