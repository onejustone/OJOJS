export class Person {
    constructor() {
        console.log(`i'm person`);
        this.sayPerson();
    }

    sayPerson() {
        console.log('sayPerson: person');
    }
}

export class Man extends Person {
    constructor() {
        super();
        console.log(`i'm man`);
        this.sayPerson();
    }

    sayPerson() {
        console.log('sayPerson: man');
    }
}

export class Boy extends Man {
    constructor() {
        super();
        console.log(`i'm boy`);
    }

    sayBoy() {
        console.log('boy');
    }
}

