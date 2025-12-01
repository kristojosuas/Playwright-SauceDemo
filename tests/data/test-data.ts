export interface User {
    username: string;
    password: string;
    type: 'standard' | 'locked_out' | 'problem' | 'performance_glitch';
}

export interface Product {
    name: string;
    price: number;
    description: string;
}

export const TestUsers: Record<string, User> = {
    standardUser: {
        username: 'standard_user',
        password: 'secret_sauce',
        type: 'standard',
    },
    lockedOutUser: {
        username: 'locked_out_user',
        password: 'secret_sauce',
        type: 'locked_out',
    },
    problemUser: {
        username: 'problem_user',
        password: 'secret_sauce',
        type: 'problem',
    },
    performanceGlitchUser: {
        username: 'performance_glitch_user',
        password: 'secret_sauce',
        type: 'performance_glitch',
    },  
}

export const TestProduct: Record<string, Product> = {
    backpack: {
        name: 'Sauce Labs Backpack',
        price: 29.99,
        description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    },
    bikeLight: {
        name: 'Sauce Labs Bike Light',
        price: 9.99,
        description: 'A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.',
    },
    boltTShirt: {
        name: 'Sauce Labs Bolt T-Shirt',
        price: 15.99,
        description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
    },
    fleeceJacket: {
        name: 'Sauce Labs Fleece Jacket',
        price: 49.99,
        description: 'It\'s not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.',
    },
    onesie: {
        name: 'Sauce Labs Onesie',
        price: 7.99,
        description: 'Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won\'t unravel.',
    },
    redTShirt: {
        name: 'Test.allTheThings() T-Shirt (Red)',
        price: 15.99,
        description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.',
    },
}

export const checkoutInfo = {
    valid: {
        firstName: 'Kristo',
        lastName: 'Josua',
        postalCode: '12345',
    },
    invalid: {
        numbersInName: '123',
        textInPostalCode: 'ABCDE',
    },
}

export const CheckoutInfo = {
    valid: {
        firstName: 'Kristo',
        lastName: 'Josua',
        postalCode: '12345',
    },
    invalid: {
        numbersInName: '123',
        specialCharsInName: '!@#$%',
        textInPostalCode: 'ABCDE',
    },
}