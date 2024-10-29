import { useWalletActionFlowContext } from "./WalletActionFlow";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/ui/accordion";

interface WalletActionFlowErrorMessageProps {
  hideDetails?: boolean;
}

export function WalletActionFlowErrorMessage({ hideDetails }: WalletActionFlowErrorMessageProps) {
  const {
    state: { actionError },
  } = useWalletActionFlowContext();

  return (
    actionError && (
      <div className="dk-flex dk-flex-col w-full min-w-0 dk-text-sm">
        <span className="dk-text-destructive">{actionError.shortMessage}</span>
        {!hideDetails && (
          <Accordion type="single" collapsible className="min-w-0">
            <AccordionItem value="1" className="dk-border-b-0">
              <AccordionTrigger>View more details</AccordionTrigger>
              <AccordionContent>{actionError.detailedMessage}</AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    )
  );
}
