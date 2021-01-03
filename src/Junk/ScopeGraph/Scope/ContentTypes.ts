import { Scope } from "./Scope";
import { Construction } from "./Content/Construction";
import { Progression } from "./Content/Progression";

export type ContentType = Scope | Construction | Progression;

export function isScope(content: ContentType): content is Scope {
    return content.constructor.name === 'Scope';
}

export function isConstruction(content: ContentType): content is Construction {
    return content.constructor.name === 'Construction';
}

export function isProgression(content: ContentType): content is Progression {
    return content.constructor.name === 'Progression';
}