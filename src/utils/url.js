export const getURLSearchParams = (searchParams) =>{
    const params = []
    const search = {}
    for (let entry of searchParams.entries()) {
        params.push(entry[0] + '=' + entry[1])
        search[entry[0]] = entry[1]
    }

    return search;

}