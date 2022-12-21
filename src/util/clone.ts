export function clone(obj: any) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    let temp = new obj.constructor();

    for (let key in obj) {
        if (Object.hasOwn(obj, key)) {
            temp[key] = clone(obj[key]);
        } else {
            temp[key] = obj[key];
        }
    }
    return temp;
}
