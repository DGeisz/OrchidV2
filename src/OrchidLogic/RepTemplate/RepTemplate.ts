/**
 * The RepTemplate is an intermediate between json and HTML.
 *
 * The final visual representation of everything is of course html, but
 * the RepTemplate gives Orchid a way to conveniently store and manipulate
 * html-like structures as JSON
 */
export interface RepTemplate {
    elementType: typeof viewTags[keyof typeof viewTags];
    id: string;
    class: string;
    innerText?: string;
    children: RepTemplate[];
}

/**
 * The HTML tags allowed in Orchid
 */
export const viewTags: { [key: string]: string; } = {
    div: 'div'
};