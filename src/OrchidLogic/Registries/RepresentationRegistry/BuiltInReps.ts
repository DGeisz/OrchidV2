import { RepresentationTemplate } from "./RepresentationTypes";

export const builtInReps: { [key: string]: RepresentationTemplate;} = {
    set: {
        id: '',
        class: '',
        elementType: 'div',
        children: [
            {
                repId: 1,
                id: '',
                class: 'socket',
                elementType: 'div',
                children: [],
            },
            {
                id: '',
                class: '',
                elementType: 'div',
                innerText: ' = {}',
                children: []
            }
        ]
    }
};
