/**
 * In the dom, each instance has three tags associated with it:
 * an input, the holder, which holds any children or other representations
 * and the element that holds these other elements.  So, like
 * <div id="id">
 *     <div id="id:h">
 *     </div>
 *     <div id="id:i">
 *     </div>
 *</div>*/
export const idSeparator = ':';

export const idSuffixes = {
    instanceHolder: 'h',
    instanceInput: 'i',
    map: 'm',
    arg: 'a',
};
