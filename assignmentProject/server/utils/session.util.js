
/**
 * 
 * @return {Employee ID}
 *  
 */
function getSessionLoginID(req) {
    return req.tokenInfo._id;
}

/**
 * 
 * @return {Employee Name}
 *  
 */
function getSessionLoginName(req) {
    return req.tokenInfo.displayName;
}

/**
 * 
 * @return {Comapany Name}
 *  
 */
function getSessionLoginCompanyName(req) {
    return req.tokenInfo.companyName
}

/**
 * 
 * @return {Comapany ID}
 *  
 */
function getSessionLoginCompanyID(req) {
    return req.tokenInfo.companyId;
}
export default {
    getSessionLoginID,
    getSessionLoginName,
    getSessionLoginCompanyName,
    getSessionLoginCompanyID
}