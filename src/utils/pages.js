export const getPageData = (arr, limit, page) =>{
    let pageCount = 1;
    let result =[...arr];

    if (limit > 0) {
         pageCount = Math.ceil(result.length / limit);
         result = result.splice(limit*(page-1), limit);
    }
    return { data: result, totalCount: pageCount};

}