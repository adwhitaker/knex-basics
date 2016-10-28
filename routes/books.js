const router = require('express').Router();
var config = require('../server/knexFile.js');
var knex = require('knex')(config.development);

router.route('/')
      .get(findAuthor)
      .post(insertBook);

router.route('/:id')
      .put(updateBook)
      .delete(deleteBook);

function findAuthor(req, res) {
  var author = req.body.author;

  knex.select()
      .from('books')
      .then(function (data) {
        res.send(data);
      }).catch(function (err) {
        console.log(err);
        res.sendStatus(500);
      });
};

function insertBook(req, res) {
  var author = req.body.author;
  var title = req.body.title;

  knex.insert({ author: author, title: title }).into('books')
      .then(function (response) {
        console.log('response', response);
        res.sendStatus(200);
      }).catch(function (err) {
        console.log(err);
        res.sendStatus(500);
      });
};

function updateBook(req, res) {
  var id = req.params.id;
  var title = req.body.title;

  knex('books').where('id', id)
               .update({ title: title })
               .then(function (response) {
                console.log('update response', response);
                res.sendStatus(200);
              });
};

function deleteBook(req, res) {
  var id = req.params.id;

  knex('books').where('id', id)
               .delete()
               .then(function () {
                  console.log('deleted entry');
                  res.sendStatus(204);
                }).catch(function (err) {
                  console.log(err);
                  res.sendStatus(500);
                });;
};

module.exports = router;
