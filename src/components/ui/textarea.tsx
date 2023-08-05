import * as React from "react"

import { cn } from "@/lib/utils"

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      const target = e.currentTarget as HTMLTextAreaElement;
      target.style.height = '50px';
      target.style.height = `${target.scrollHeight}px`;  
    };

    return (
      <textarea
        onInput={handleInput}
        className={cn(
          "flex min-h-[50px] w-full text-primary rounded-md border border-primary/[8%] bg-primary/[8%] px-3 py-2 text-sm ring-offset-primary/[8%] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/[8%] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
