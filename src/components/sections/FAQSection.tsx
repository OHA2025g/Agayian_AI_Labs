import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export type FAQItem = {
  question: string;
  answer: string;
};

export function FAQSection({
  items,
  title = "Frequently asked questions",
  columns = 1,
  className,
}: {
  items: FAQItem[];
  title?: string;
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <div className={className}>
      {title ? (
        <h2 className="font-heading text-2xl font-semibold text-navy md:text-3xl">
          {title}
        </h2>
      ) : null}
      <Accordion
        type="single"
        collapsible
        className={cn(
          "mt-6",
          columns === 2 && "grid gap-x-8 md:grid-cols-2",
        )}
      >
        {items.map((item, index) => (
          <AccordionItem key={item.question} value={`item-${index}`}>
            <AccordionTrigger className="text-navy hover:text-tech-blue">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-light">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
