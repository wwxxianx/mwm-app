import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const Tabs = TabsPrimitive.Root;

const tabListVariants = cva("inline-flex items-center justify-center", {
    variants: {
        variant: {
            admin: "rounded-lg bg-muted p-1 text-muted-foreground",
            client: "bg-transparent p-1 pr-12 text-black gap-5 justify-start w-[100vw] overflow-scroll no-scrollbar",
        },
    },
    defaultVariants: {
        variant: "admin",
    },
});

const tabTriggerVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                admin: "rounded-md px-3 py-1 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
                client: "bg-transparent font-normal px-2 py-1 text-black/60 hover:text-black data-[state=active]:text-black data-[state=active]:border-b-[1.5px] data-[state=active]:border-black ",
            },
        },
        defaultVariants: {
            variant: "admin",
        },
    }
);

export interface TabListProps
    extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
        VariantProps<typeof tabListVariants> {}

export interface TabTriggerProps
    extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
        VariantProps<typeof tabTriggerVariants> {}

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    TabListProps
>(({ className, variant, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(tabListVariants({ variant }), className)}
        {...props}
    />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    TabTriggerProps
>(({ className, variant, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(tabTriggerVariants({ variant }), className)}
        {...props}
    />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
        )}
        {...props}
    />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
