import { Class } from '../type/class';
export function getAllParentClassName(entity: Class, exclusive: boolean = false) {
    let parentClassArr = [];
    if (!exclusive) parentClassArr.push(entity.name);
    let instance = new entity();
    let parentClass = Object.getPrototypeOf(instance.constructor);

    while (parentClass !== Function.prototype) {
        parentClassArr.push(parentClass.name);
        instance = new parentClass();
        parentClass = Object.getPrototypeOf(instance.constructor);
    }
    return parentClassArr;
}
