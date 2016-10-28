const router = require('express').Router();
var config = require('../server/knexFile.js');
var knex = require('knex')(config.development);

router.route('/')
      .get(getCustomer);

function getCustomer(req, res) {
  // SELECT first_name, last_name, street, city, state, zip, address_type FROM customers
  // JOIN addresses ON customers.id = addresses.customer_id;

  knex.select('first_name', 'last_name', 'street', 'city', 'state', 'zip', 'address_type')
      .from('customers')
      .innerJoin('addresses', 'customers.id', 'addresses.customer_id')
      .then(function (data) {
        res.send(data);
      });
};

module.exports = router;
