export type Accordion = {
    id : number, 
    question: string,
    answer : string
}

export type AccordionList = {
    item : Accordion
}[]