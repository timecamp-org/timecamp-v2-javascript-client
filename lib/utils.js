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

export function createQueryString(data) {
    let qs =
        Object.keys(data).map((k) => {
            return (encodeURIComponent(k) + '=' + encodeURIComponent(data[k]));
        })
            .join('&');

    return qs.length > 0 ? ('?' + qs) : '';
}
