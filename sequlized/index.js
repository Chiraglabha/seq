const sequelize = require('./util/database');
const Customer = require('./models/customer');
const Order = require('./models/order');

Customer.hasMany(Order);
let customerId = null;

sequelize
    .sync({force : true})
    // .sync()
    .then((result) => {
        return Customer.create({name : 'Chirag', email : 'chirag@gmail.com'})
        console.log(result);
    }).then(customer => {
        customerId = customer.id;
        console.log('First Customer is created: ', customer);
        return customer.createOrder({total : 45})
    }).then(order => {
        console.log('Order is: ', order);
        return order.findAll({ where : customerId });
    }).then(orders => {
        console.log("All orders are : ", orders);
    })
    .catch((err) => {
        console.log(err);
    })