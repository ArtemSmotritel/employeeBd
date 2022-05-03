const getFormattedInfoForOneEmployee = employee => {
    const birthDay = employee.birthday.getDate();
    const age = new Date().getFullYear() - employee.birthday.getFullYear();
    return `(${birthDay}) - ${employee.name} (${age} years)`;
}

const getFormattedInfoForManyEmployees = employees => {
    let result= '';
    employees.forEach(employee => {
        result += getFormattedInfoForOneEmployee(employee) + '\n';
    })
    return result.slice(0,-1); //deleting last \n
}

const sortEmployeesInOneMonth = employees => {
    let deepCopy = employees.slice();
    deepCopy.sort((e1, e2) => {
        let bDay1 = e1.birthday.getDate(), bDay2 = e2.birthday.getDate();
        if (bDay1 > bDay2) {
            return 1;
        } else if (bDay1 < bDay2) {
            return -1;
        } else {
            return 0;
        }
    })
    return deepCopy;
}

const getMapWithMonths = monthCount => {
    const month = new Date().getMonth();
    let map = new Map()
        .set(month, [])
        .set(month+1, []);
    return map;
}

const groupEmployeesByBdMonth = (employees, monthCount) => {
    let map = getMapWithMonths(monthCount);
    let employeesMap = employees.reduce((m, employee) => {
        let month = employee.birthday.getMonth();
        m.get(month).push(employee);
        return m;
    }, map);
    return employeesMap;
}

const getFormattedGroup = (group, groupMonth) => {
    const options = {month: 'long'};
    const groupYear = new Date().getFullYear();    
    const monthName = new Intl.DateTimeFormat('en-US', options).format(new Date(groupYear, groupMonth));
    let result = `${monthName} ${groupYear}\n`;
    result += getFormattedInfoForManyEmployees(group);
    return result;
}

const formatGroups = employeesMap => {
    let result = '';
    employeesMap.forEach((group, month) => {
        result+=getFormattedGroup(group, month);
    });
    return result;
}




const flow = employees => {
    let employeesMap = groupEmployeesByBdMonth(employees, 1);
    return formatGroups(employeesMap);
}


export {getFormattedInfoForOneEmployee, getFormattedInfoForManyEmployees, sortEmployeesInOneMonth, getFormattedGroup, formatGroups, flow };