import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FAQItem = {
  question: string;
  answer: string;
};

export function FAQSection({
  items,
  title = "Frequently asked questions",
}: {
  items: FAQItem[];
  title?: string;
}) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-semibold text-text-on-dark">
        {title}
      </h2>
      <Accordion type="single" collapsible className="mt-6">
        {items.map((item, index) => (
          <AccordionItem key={item.question} value={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
