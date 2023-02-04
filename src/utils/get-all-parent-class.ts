export function getAllParentClassName(entity: any, exclusive: boolean = false) {
    let parentClassArr = [];
    if (!exclusive) parentClassArr.push(entity.name);
    let parentClass = Object.getPrototypeOf(entity);

    while (parentClass !== Function.prototype) {
        parentClassArr.push(parentClass.name);
        parentClass = Object.getPrototypeOf(parentClass);
    }
    return parentClassArr;
}
