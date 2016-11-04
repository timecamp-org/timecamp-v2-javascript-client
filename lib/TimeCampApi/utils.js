export function filterOptional(defaults, optionals) {
    let mergedObject = Object.assign({}, defaults, optionals);
    let mergedKeys = Object.keys(mergedObject);
    let filteredObject = {};

    mergedKeys.filter(function(key) {
        if (mergedObject[key] != undefined) {
            filteredObject[key] = mergedObject[key];
        }
    });

    return filteredObject;
}