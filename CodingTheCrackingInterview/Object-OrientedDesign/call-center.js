var eLevel = {
    respondent: 0,
    manager: 1,
    director: 2
};

class Call {
    constructor(num, level) {
        this.num = num;
        this.level = level;
        this.time = Date.now();
    }
}
class Employee {
    constructor() {
        this.busy = false;      // employee busy or not
        this.superiors = [];    // employee's superiors if any
        this.level;             // employee's clearance/level
    }

    /**
     * Get first available superior or any superior if all of them
     * are busy.
     */
    getSuperior() {
        let superior = null;

        // look for first available superior
        this.superiors.forEach((sup) => {
            if (sup.busy === false) {
                superior = sup;
            }
        });

        if (superior === null && this.superiors.length > 0) {
            // found no available superior, but have superiors: assign one anyway
            return this.superiors[0];
        } else {
            return superior;
        }
    }

    /**
     * Have employee handle call if possible or relay to superior
     * if not.
     */
    handleCall(call, cb) {
        if (this.busy === false && this.level >= call.level) {
            // employee is free and can handle call
            this.busy = true;
            cb(call);
        } else {
            // relay call to superior
            let superior = this.getSuperior();

            if (superior === null) {
                console.log('Employee::handleCall(): Could not find available superior');
            } else {
                console.log('Employee::handleCall(): Found superior');
                superior.handleCall(call);
            }
        }
    }

    /**
     * Assign employee its superiors if any
     * @param {Employee} superiors Employee's superiors
     */
    assignSuperiors(superiors) {
        this.superiors = superiors;
    }
}

class Respondent extends Employee {
    constructor() {
        super();
        this.level = eLevel.respondent;
        this.respondentWork = this.respondentWork.bind(this);
    }

    handleCall(call) {
        super.handleCall(call, this.respondentWork);
    }

    respondentWork(call) {
        this.busy = false;
        console.log('Respondent::respondentWork(): handledCall=', call);
    }
}

class Manager extends Employee {
    constructor() {
        super();
        this.level = eLevel.manager;
        this.managerWork = this.managerWork.bind(this);
    }

    handleCall(call) {
        super.handleCall(call, this.managerWork);
    }

    managerWork(call) {
        this.busy = false;
        console.log('Manager::managerWork(): handledCall=', call);
    }
}

class Director extends Employee {
    constructor() {
        super();
        this.level = eLevel.director;
        this.directorWork = this.directorWork.bind(this);
    }

    handleCall(call) {
        super.handleCall(call, this.directorWork);
    }

    directorWork(call) {
        this.busy = false;
        console.log('Director::directorWork(): handledCall=', call);
    }
}

class CallCenter {
    constructor(res, man, dir) {
        this.employees = [[], [], []];  // res, man, dir
        this.calls = [];
        this.createEmployees(res, man, dir);
    }

    dispatchCall() {
        let call = this.calls.pop();

        if (call) { // have a call to handle
            let freeEmployee = null;
            while (freeEmployee === null) { // keep polling until get a free respondent
                for (let i = 0; i < this.employees[eLevel.respondent].length; i++) {
                    let employee = this.employees[eLevel.respondent][i];

                    if (employee.busy === false) {
                        freeEmployee = employee;
                    }
                }

            }

            freeEmployee.handleCall(call);
        } else {    // no more calls
            return false;
        }


        return true;
    }

    /**
     * Create random calls 
     * @param {Number} callCount Number of calls to make 
     */
    receiveCalls(callCount) {
        for (let i = 0; i < callCount; i++) {
            let callLevel = Math.floor(Math.random() * 3);
            let callNum = Math.floor(Math.random() * 9999999);
            let call = new Call(callNum, callLevel);
            this.calls.push(call);
        }
    }

    createEmployees(res, man, dir) {
        /**
         * Add respondents, managers, and directors
         */
        this.addEmployees(res, this.employees[eLevel.respondent], eLevel.respondent);
        this.addEmployees(man, this.employees[eLevel.manager], eLevel.manager);
        this.addEmployees(dir, this.employees[eLevel.director], eLevel.director);

        /**
         * Assign superiors
         */
        this.assignSuperiors(this.employees[eLevel.respondent], this.employees[eLevel.manager]);
        this.assignSuperiors(this.employees[eLevel.manager], this.employees[eLevel.director]);
    }

    assignSuperiors(employees, superiors) {
        employees.forEach((employee) => {
            employee.assignSuperiors(superiors);
        });
    }

    addEmployees(num, employees, employeeLevel) {
        for (let i = 0; i < num; i++) {
            let employee = this.createEmployee(employeeLevel);

            if (employee) {
                this.employees[employeeLevel].push(employee);
            }
        }
    }

    createEmployee(employee) {
        switch (employee) {
            case eLevel.respondent:
                return new Respondent();
                break;
            case eLevel.manager:
                return new Manager();
                break;
            case eLevel.director:
                return new Director();
                break;
            default:
                return null;
        }
    }
}

function main() {
    let callCenter = new CallCenter(4, 3, 2);

    callCenter.receiveCalls(12);

    console.log('callCenter: ', callCenter);
    while(callCenter.dispatchCall()) {
    }
}

main();