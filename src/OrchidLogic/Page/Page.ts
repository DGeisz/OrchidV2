import { Formation } from "../FormationGraph/Formations/Formation";

/**
 * A Page is one page of Formations in a Project, which is essentially
 * a collection of pages.  A page also keeps track of the dock position and
 * an undo queue for the page.
 */
export class Page {
    preludeFormation: Formation;
}