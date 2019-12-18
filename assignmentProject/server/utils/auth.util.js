import respUtil from '../utils/resp.util';


function getList(req, res, next) {
    if (req.tokenInfo && req.tokenInfo.role && req.tokenInfo.role !== "SuperAdmin") {
        if (Object.keys(req.params).length > 0) {
            //Checking EmployeeList
            if (req.params.employeeId) {
                //Checking the CompanyId in TokenInfo and Employeelist
                if (JSON.stringify(req.tokenInfo.companyId) == JSON.stringify(req.employee.companyId)) {
                    return next();
                }
                else {
                    req.i18nKey = 'companyDetailsNotfound';
                    return res.json(respUtil.getErrorResponse(req));
                }
            }
            if (req.params.projectId) {
                //Checking the CompanyId in TokenInfo and ProjectList
                if (JSON.stringify(req.tokenInfo.companyId) == JSON.stringify(req.project.companyId)) {
                    return next();
                }
                else {
                    req.i18nKey = 'companyDetailsNotfound';
                    return res.json(respUtil.getErrorResponse(req));
                }
            }
            if (req.params.leaveId) {
                //Checking the CompanyId in TokenInfo and LeaveList
                if (JSON.stringify(req.tokenInfo.companyId) == JSON.stringify(req.leave.companyId)) {
                    return next();
                }
                else {
                    req.i18nKey = 'companyDetailsNotfound';
                    return res.json(respUtil.getErrorResponse(req));
                }
            }
            if (req.param.attendanceId) {
                //Checking the CompanyId in TokenInfo and AttendanceList
                if (JSON.stringify(req.tokenInfo.companyId) == JSON.stringify(req.attendance.companyId)) {
                    return next();
                }
                else {
                    req.i18nKey = 'companyDetailsNotfound';
                    return res.json(respUtil.getErrorResponse(req));
                }
            }
            if (req.params.taskId) {
                //Checking the CompanyId in TokenInfo and TaskList
                if (JSON.stringify(req.tokenInfo.companyId) == JSON.stringify(req.task.companyId)) {
                    return next();
                }
                else {
                    req.i18nKey = 'companyDetailsNotfound';
                    return res.json(respUtil.getErrorResponse(req));
                }
            }
            if (req.params.inventoryId) {
                //Checking the CompanyId in TokenInfo and InventoryList
                if (JSON.stringify(req.tokenInfo.companyId) == JSON.stringify(req.inventory.companyId)) {
                    return next();
                }
                else {
                    req.i18nKey = 'companyDetailsNotfound';
                    return res.json(respUtil.getErrorResponse(req));
                }
            }
            if (req.params.publicholidaysId) {
                //Checking the CompanyId in TokenInfo and InventoryList
                if (JSON.stringify(req.tokenInfo.companyId) == JSON.stringify(req.publicholidays.companyId)) {
                    return next();
                }
                else {
                    req.i18nKey = 'companyDetailsNotfound';
                    return res.json(respUtil.getErrorResponse(req));
                }
            }
            else {
                return next();
            }
        } else {
            return next();
        }
    } else {
        return next();
    }
}

export default {
    getList
}