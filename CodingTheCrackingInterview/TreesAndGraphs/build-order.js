class Project {
    constructor(name) {
        this.name = name;
        this.dependents = [];
        this.dependencies = 0;
    }

    addDependent(dependent) { 
        this.dependents.push(dependent)
    }

    getDependents() {
        return this.dependents;
    }

    getDependentNames() {
        return this.dependents.map(function(dependent) {
            return dependent.name;
        })
    }

    getDependencies() {
        return this.dependencies;
    }

    incrementDependencies() {
        this.dependencies = this.dependencies + 1;
    }

    decrementDependencies() {
        this.dependencies = this.dependencies - 1;
    }
}

class Graph {
    constructor() {
        this.projectMap = new Map();
    }

    addProject(name) {
        this.projectMap.set(name, new Project(name));
    }

    getProject(name) {
        return this.projectMap.get(name);
    }

    addProjectDependency(project, dependency) {
        let proj = this.getProject(project);
        let dep = this.getProject(dependency);

        dep.addDependent(proj);
        proj.incrementDependencies();
    }
}

function findBuildOrder(projects, dependencies) {
    let graph = new Graph();
    let built = [];

    projects.forEach((project) => {
        graph.addProject(project);
    });

    dependencies.forEach((pair) => {
        let project = pair[1];
        let dependency = pair[0];
        graph.addProjectDependency(project, dependency);
    })

    // console.log('1time');
    addNondependent(projects, graph, built);

    let i = 0;
    while (built.length < projects.length) {
        let curr = built[i];

        if (!curr) {    // no nondependents 
            return false;
        }

        let dependents = graph.getProject(curr).getDependents();

        dependents.forEach(function(proj) {
            proj.decrementDependencies();
        });

        addNondependent(graph.getProject(curr).getDependentNames(), graph, built);

        i++;
    }

    return built;
}

function addNondependent(projects, graph, dependents) {
    // console.log('projects: ', projects, ' , dependents: ', dependents);
    projects.forEach(function(project) {
        let proj = graph.getProject(project);
        // console.log('graph: ', graph.projectMap);
        // console.log('project: ', project, ' , proj: ', proj, ' , dependents: ', dependents);
        if(proj.getDependencies() === 0) {  // build this project
            let deps = proj.getDependents();

            dependents.push(proj.name);
        }
    });
}


function attemptToBuild(project, dependencies, builds, order) {

    function build (project, dependencies, builds) {
        let projDeps = dependencies.get(project);
        console.log('project: ', project, ', projDeps: ', projDeps);
    
        if (builds.get(project) === true) { // project already built
            return true;
        } else if (projDeps === undefined) {   // project has no dependencies, build it
            builds.set(project, true);
            order.push(project);
            return true;
        } else {    // project has dependencies, do them first
            console.log('build dependencies');
            builds.set(project, false); // tried to build/visited, but need to finish dependencies
    
            for(let i = 0; i < projDeps.length; i++) {
                let depBuilt = builds.get(projDeps[i]);
                // console.log('dependency: ', projDeps[i], )
                if (depBuilt === undefined) {   // not yet visited
                    // try to build the dependency
                    let buildSuccess = build(projDeps[i], dependencies, builds);
    
                    if (buildSuccess === false) {   // couldn't build it, return false
                        return false;
                    } else {    // build successful continue building dependencies
                        continue;
                    }
                } else {    // visited before
                    if (depBuilt === false) {   // unable to build dependency
                        return false;
                    } else {    // dependency already built
                        continue;
                    }
                }
            }
    
            // built all dependencies, build current project
            builds.set(project, true);
            order.push(project);
            return true;
        }
    }

    return build(project, dependencies, builds, order);
}

function buildOrder(projects, dependencies) {
    let depMap = new Map();
    let builds = new Map();
    let order = [];

    // Insert dependencies into map for quicker find
    for (let i = 0; i < dependencies.length; i++) {
        let proj = dependencies[i][1];
        let dependency = dependencies[i][0];
        let projDeps = depMap.get(proj);

        if(projDeps) {  // already has a dependency list
            projDeps.push(dependency);
        } else {    // first dependency
            depMap.set(proj, [dependency]);
        }
    }

    console.log('dependenciesMap: ', depMap);

    for (let i = 0; i < projects.length; i++) { // build all projects
        let buildResult = attemptToBuild(projects[i], depMap, builds, order);

        if (buildResult === false) {    // couldn't build this project
            return false;
        }
    }

    // build successful
    return order;
}

function main() {
    let projects = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let dependencies = [['a', 'd'], ['f', 'b'], ['b', 'd'], ['f', 'a'], ['d', 'c'], ['b', 'a'], ["g", "e"], ["h", "g"]];

    console.log('projects: ', projects);
    console.log('dependencies: \n', dependencies);
    console.log('buildOrder(): ', buildOrder(projects, dependencies));
    console.log('findBuildOrder(): ', findBuildOrder(projects, dependencies));
}

main();