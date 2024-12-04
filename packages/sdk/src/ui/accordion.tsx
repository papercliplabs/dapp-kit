"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/ui/utils/cn"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("dk-border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="dk-flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "dk-flex dk-flex-1 dk-items-center dk-justify-between dk-py-4 dk-font-medium dk-transition-all hover:dk-underline [&[data-state=open]>svg]:dk-rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="dk-h-4 dk-w-4 dk-shrink-0 dk-transition-transform dk-duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="dk-overflow-hidden dk-text-sm dk-transition-all data-[state=closed]:dk-animate-accordion-up data-[state=open]:dk-animate-accordion-down"
    {...props}
  >
    <div className={cn("dk-pb-4 dk-pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
