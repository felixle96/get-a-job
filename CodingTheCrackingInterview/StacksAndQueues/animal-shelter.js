class AnimalShelter {
    constructor () {
        this.timeStamp = 0;
        this.cats = new Queue();
        this.dogs = new Queue();
    }

    enqueue(type, name) {
        this[type].enqueue(name, this.timeStamp);
        this.timeStamp = this.timeStamp + 1;
    }

    dequeueAny () {
        // get oldest cat and dog
        let oldestCat = this.cats.peek();
        let oldestDog = this.dogs.peek();

        // remove oldest animal from queue and return it
        if (oldestCat && oldestDog) {
            if (oldestCat.time < oldestDog.time) {
                return this.cats.dequeue();
            } else {
                return this.dogs.dequeue();
            }
        } else if (oldestCat) {
            return this.cats.dequeue();
        } else {
            return this.dogs.dequeue();
        }
    }

    dequeueCat () {
        return this.cats.dequeue();
    }

    dequeueDog () {
        return this.dogs.dequeue();
    }
}

class Queue {
    constructor () {
        this.front = this.back = null;
        this.len = 0;
    }

    enqueue (name, time) {
        if (this.back === null) {   
            // queue empty, set front and back to new node
            this.front = this.back = new Node(name, time);
        } else {
            // add new node to back, update back
            this.back.next = new Node(name, time);
            this.back = this.back.next;
        }

        this.len++;
    }

    dequeue () {
        if (this.front === null) {  // queue is empty
            return false;
        } else {   
            let temp = this.front;
            if (this.front === this.back) { // queue only has one item left
                this.front = this.back = null;
            } else { // remove front and update front
                this.front = this.front.next;
            }

            this.len--;
            return temp;
        }
    }

    peek () {
        if (this.front === null) {
            return false;
        } else {
            return this.front;
        }
    }
}

class Node {
    constructor(name, time) {
        this.name = name;
        this.time = time;
        this.next = null;
    }
}

function main() {
    let animals = new AnimalShelter();

    animals.enqueue('cats', 'cat1');
    animals.enqueue('cats', 'cat2');
    animals.enqueue('cats', 'cat5');
    animals.enqueue('cats', 'cat6');
    animals.enqueue('dogs', 'dog1');
    animals.enqueue('dogs', 'dog2');
    animals.enqueue('dogs', 'dog3');
    animals.enqueue('cats', 'cat3');
    animals.enqueue('cats', 'cat4');
    animals.enqueue('dogs', 'dog4');
    animals.enqueue('dogs', 'dog5');
    animals.enqueue('dogs', 'dog6');

    console.log('AnimalShelter: ', animals);
    for (let i = 0; i < 12; i++) {
        console.log('oldest: ', animals.dequeueAny());
        console.log('oldestCat: ', animals.dequeueCat());
        console.log('oldestDog: ', animals.dequeueDog());
    }
    console.log('AnimalShelter: ', animals);

}

main();