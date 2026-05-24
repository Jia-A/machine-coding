import { Accordion } from "@/types/Accordion";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

type Card = {
  item: Accordion;
  open: number;
  setOpen: React.Dispatch<React.SetStateAction<number>>;
};

const AccordionCard = ({ item, open, setOpen }: Card) => {
  const { id, answer, question } = item;
  return (
    <div className="flex justify-between p-4 border border-amber-950 rounded">
      <div className="">
        <p className="font-bold">{question}</p>
        <article
          className={
            open === id
              ? "max-h-96 overflow-hidden transition-all duration-500 ease-in"
              : "max-h-0 overflow-hidden transition-all duration-500 ease-out"
          }
        >
          {answer}
        </article>
      </div>
      {open === id ? (
        <MinusIcon
          className="cursor-pointer"
          onClick={() => setOpen(0)}
          width={30}
          height={30}
        />
      ) : (
        <PlusIcon
          className="cursor-pointer"
          onClick={() => setOpen(id)}
          width={30}
          height={30}
        />
      )}
    </div>
  );
};

export default AccordionCard;
