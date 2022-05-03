import {getFormattedInfoForOneEmployee, getFormattedInfoForManyEmployees, sortEmployeesInOneMonth, getFormattedGroup, formatGroups, flow } from './employeeBDs.js';

const bob = {name: 'Bob', birthday: new Date(2000, 4, 20)};
const bobAndJohn = [{...bob}, {name: 'John', birthday: new Date(2003, 4, 11)}];
const people = [...bobAndJohn, {name: 'Alex', birthday: new Date(2003, 5, 15)}, {name: 'Mia', birthday: new Date(2003, 5, 21)}]


describe('simple unsorted birthdays calendar', () => {
    it('prints one birthday', () => {
        expect(getFormattedInfoForOneEmployee(bob)).toBe('(20) - Bob (22 years)');
    })
    it('prints two birthdays', () => {
        expect(getFormattedInfoForManyEmployees(bobAndJohn)).toBe('(20) - Bob (22 years)\n(11) - John (19 years)');
    })
})

describe('simple sorted birthdays calendar', () => {
    it('prints two sorted birthdays', () => {
        let sortedBobAndJohn = sortEmployeesInOneMonth(bobAndJohn);
        expect(getFormattedInfoForManyEmployees(sortedBobAndJohn)).toBe('(11) - John (19 years)\n(20) - Bob (22 years)');
    })
})

describe('grouped sorted birthdays calendar', () => {
    it('prints two sorted, grouped birthdays', () => {
        let sortedBobAndJohn = sortEmployeesInOneMonth(bobAndJohn);
        expect(getFormattedGroup(sortedBobAndJohn, 4)).toBe('May 2022\n(11) - John (19 years)\n(20) - Bob (22 years)');
    })
    it('prints two group of sorted birthdays', () => {
        expect(flow(people)).toBe('May 2022\n(11) - John (19 years)\n(20) - Bob (22 years)\n' + 
            'June 2022\n(15) - Alex (19 years)\n(21) - Mia (19 years)');
    })
})
