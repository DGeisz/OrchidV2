import { RepresentationTemplate } from "./RepresentationTypes";

/**
 * These are the built in template mappings
 * for built in line starter sequences
 */
const builtInMappings = new Map<string, RepresentationTemplate>([
    [
        'set',
        {
            elementType: 'div',
            id: '',
            class: 'set',
            children: [
                {
                    elementType: 'div',
                    repId: 0,
                    id: '',
                    class: 'socket termDef',
                    innerText: '☐',
                    children: []
                },
                {
                    elementType: 'div',
                    id: '',
                    class: '',
                    innerText: ' = {}',
                    children: []
                }
            ]
        }
    ]
]);

const mapKeys = Array.from(builtInMappings.keys());

type mapKeysType = typeof mapKeys[number];

/**
 * Generates a fresh copy of a mapping*/
export function getBuiltInMapping(seq: mapKeysType): RepresentationTemplate {
    return Object.assign({}, builtInMappings.get(seq));
}