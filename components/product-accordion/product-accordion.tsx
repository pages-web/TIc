'use client';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../ui/accordion';
import Reviews from './reviews';

const ProductAccordion = ({
  description,
  ids,
  activeId,
}: {
  description?: string;
  ids: string[];
  activeId: string;
}) => {
  return (
    <Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
      {!!description && (
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl font-semibold">
            Бүтээгдэхүүний дэлгэрэнгүй мэдээлэл
          </AccordionTrigger>
          <AccordionContent>
            <div
              dangerouslySetInnerHTML={{ __html: description }}
              className="[&_*]:font-family-inherit"
            />
          </AccordionContent>
        </AccordionItem>
      )}
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-xl font-semibold">
          Үнэлгээ, сэтгэгдэл
        </AccordionTrigger>
        <AccordionContent>
          <Reviews ids={ids} activeId={activeId} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductAccordion;
