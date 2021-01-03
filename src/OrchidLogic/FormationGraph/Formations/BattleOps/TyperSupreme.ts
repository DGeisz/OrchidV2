// import { builtInQuivers } from "../BattleMap/BuiltInQuivers";
import { BattleMap } from "./BattleMap";
import { builtInQuivers } from "./BuiltInQuivers";
import { v4 } from "uuid";
import { parseBoolean } from "../../../utils/functions";

const typeQ = builtInQuivers.type;
const trueQ = builtInQuivers.true;

const isMapTypeQ = builtInQuivers.isMapType;
const mapTypeSourceQ = builtInQuivers.mapTypeSource;
const mapTypeTargetQ = builtInQuivers.mapTypeTarget;

const isTupleTypeQ = builtInQuivers.isTupleType;
const typeIndexQ = builtInQuivers.typeIndex;
const tupleTypeSizeQ = builtInQuivers.tupleTypeSize;

/**
 * The TyperSupreme is the module that handles creating types and
 * checking types within the battle map. This is actually a delicate
 * process that informs when different instances are allowed and can
 * be committed
 *
 * Of particular concern are the types related to maps and tuples.
 * These bois are the most slippery and prone to create challenges
 */
export class TyperSupreme {

    private readonly battleMap: BattleMap;

    constructor(battleMap: BattleMap) {
        this.battleMap = battleMap;
    }

    /**
     * Simply get the type of a quiver
     */
    getType(quiver: string): string {
        const { exists, target } = this.battleMap.sq2t(quiver, typeQ);

        if (exists) {
            return target;
        } else {
            throw new Error(`Quiver ${quiver} doesn't have a type!`);
        }
    }

    /**
     * Creates a map type for a particular quiver given a
     * source type and a target type
     */
    createMapType(quiver: string, sourceType: string, targetType: string) {
        const newMapType = v4();
        this.battleMap.putQuiver(newMapType);

        //Indicate this is a map type
        this.battleMap.createArrow(newMapType, isMapTypeQ, trueQ);

        //Create type associations
        this.battleMap.createArrow(newMapType, mapTypeSourceQ, sourceType);
        this.battleMap.createArrow(newMapType, mapTypeTargetQ, targetType);

        //Associate this type with quiver
        this.battleMap.createArrow(quiver, typeQ, newMapType);
    }

    /**
     * Creates a tuple type for a particular quiver given a list
     * of constituent types
     */
    createTupleType(quiver: string, elementTypes: string[]) {
        const newTupleType = v4();
        this.battleMap.putQuiver(newTupleType);

        //Indicate size of tuple defined by type
        this.battleMap.createArrow(newTupleType, tupleTypeSizeQ, elementTypes.length.toString());

        //Insert types at their proper index
        elementTypes.forEach((type, index) => {
            this.battleMap.createArrow(newTupleType, [typeIndexQ, index].join(''), type);
        });

        //Associate this type with quiver
        this.battleMap.createArrow(quiver, typeQ, newTupleType);
    }

    /**
     * Check if assertedType is equivalent to base type
     *
     * TODO: Figure out auto-casting, cause Orchid's gonna get
     *  real annoying if it isn't there
     */
    isEquivalentTo(baseType: string, assertedType: string): boolean {
        if (this.sp2b(baseType, isMapTypeQ)) {
            if (this.sp2b(assertedType, isMapTypeQ)) {
                const { exists: baseSourceExists, target: baseSource } = this.battleMap.sq2t(baseType, mapTypeSourceQ);
                const {
                    exists: assertedSourceExists,
                    target: assertedSource
                } = this.battleMap.sq2t(assertedType, mapTypeSourceQ);

                const { exists: baseTargetExists, target: baseTarget } = this.battleMap.sq2t(baseType, mapTypeTargetQ);
                const {
                    exists: assertedTargetExists,
                    target: assertedTarget
                } = this.battleMap.sq2t(assertedType, mapTypeTargetQ);

                return baseSourceExists && assertedSourceExists && baseTargetExists && assertedTargetExists
                    && this.isEquivalentTo(baseSource, assertedSource) && this.isEquivalentTo(baseTarget, assertedTarget);
            } else {
                return false;
            }
        } else if (this.sp2b(baseType, isTupleTypeQ)) {
            if (this.sp2b(assertedType, isTupleTypeQ)) {
                const { exists: baseSizeExists, target: baseSize } = this.battleMap.sq2t(baseType, tupleTypeSizeQ);
                const { exists: assertedSizeExists, target: assertedSize } = this.battleMap.sq2t(assertedType, tupleTypeSizeQ);

                //Make sure they're the same size
                if (!(baseSizeExists && assertedSizeExists && baseSize === assertedSize)) return false;

                //Make sure each of the element types lines up
                for (let i = 0; i < parseInt(baseSize); i++) {
                    const { exists: baseElementX, target: baseElement } = this.battleMap.sq2t(baseType, [typeIndexQ, i].join(''));
                    const { exists: assertedElementX, target: assertedElement } = this.battleMap.sq2t(assertedType, [typeIndexQ, i].join(''));

                    if (!(baseElementX && assertedElementX && this.isEquivalentTo(baseElement, assertedElement))) return false;
                }

                //If we haven't returned false so far, then the types are equivalent
                return true;
            } else {
                return false;
            }
        }

        //TODO: This would be where the casting would take place, if there's any casting to be done

        //If a type is not a mapType or a tuple type, then the label is bijective with the actual type,
        //so we can just check if these types have the same label
        return baseType === assertedType;
    }

    /**
     * Changes a quiver's mapType's source to newType.  Throws an error if the type isn't a
     * mapType, or if quiver doesn't have a type
     */
    changeMapTypeSource(quiver: string, newType: string) {
        const { exists: typeExists, target: type } = this.battleMap.sq2t(quiver, typeQ);

        if (!typeExists) throw new Error(`Quiver ${quiver} doesn't have a type`);
        if (!this.sp2b(type, isMapTypeQ)) throw new Error(`Type ${type} isn't a map type`);

        this.battleMap.createArrow(type, mapTypeSourceQ, newType);
    }


    /**
     * Changes a quiver's mapType's target to newType.  Throws an error if the type isn't a
     * mapType, or if quiver doesn't have a type
     */
    changeMapTypeTarget(quiver: string, newType: string) {
        const { exists: typeExists, target: type } = this.battleMap.sq2t(quiver, typeQ);

        if (!typeExists) throw new Error(`Quiver ${quiver} doesn't have a type`);
        if (!this.sp2b(type, isMapTypeQ)) throw new Error(`Type ${type} isn't a map type`);

        this.battleMap.createArrow(type, mapTypeTargetQ, newType);
    }

    /**
     * Changes a tupleTypes typeElement at a particular index
     *
     * Throws an error if type isn't a tupleType, if the index is out of range
     * or if the quiver doesn't have a type
     */
    changeTupleTypeElement(quiver: string, index: number, newType: string) {
        const { exists: typeExists, target: type } = this.battleMap.sq2t(quiver, typeQ);

        if (!typeExists) throw new Error(`Quiver ${quiver} doesn't have a type`);
        if (!this.sp2b(type, isTupleTypeQ)) throw new Error(`Type ${type} isn't a tuple type`);

        const { exists: sizeX, target: size } = this.battleMap.sq2t(type, tupleTypeSizeQ);

        if (!sizeX) throw new Error(`Tuple type ${type} doesn't have a size`);

        let intSize = parseInt(size);

        if (index >= intSize) throw new Error(`Index out of bound. Tuple size is ${size}, index is ${index}`);

        this.battleMap.createArrow(type, [typeIndexQ, index].join(''), newType);
    }

    /**
     * This is a helper method that checks if a particular source quiver
     * is true or false under a particular proposition
     *
     * sp2b = source >- proposition -> boolean, ie it has the same form as sq2t
     *
     * Note that this is NOT type safe, and only has definable behavior
     * if the proposition quiver really is a proposition quiver
     */
    sp2b(source: string, proposition: string): boolean {
        const {exists, target} = this.battleMap.sq2t(source, proposition);
        return exists && parseBoolean(target);
    }
}
