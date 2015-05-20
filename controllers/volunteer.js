module.exports.controller = function(app, tables) {

	/* GET volunteer page for viewing table names */
	app.get('/volunteer', function(req, res) {
		var db = req.db;
		var collection = db.get('tablecollection')
		if (req.session.table) {
			req.session.reload(function(err) {
				if(err) {
					console.log(err);
				} else {
					var mynumber = req.session.table;
					collection.find({ tableno: mynumber }, function(e, docs){
						var guests = tables.getNames(docs);
						res.render('volunteer', { number : mynumber, guests : guests });
					});
				}
			});
		} else {
			res.redirect('/volunteer-table');
		};
	});

	/* POST to add an auction item */
	app.post('/add-to-display', function(req, res) {
		var db = req.db;
		var itemName = req.body.item;
		var guestNames = req.body.names;
		var collection = db.get('itemcollection');
		collection.insert({
			"item" : itemName,
			"names" : guestNames
			}, function(err, doc) {
			if (err) {
				res.send("There was a problem adding the information to the database.");
			} else {
				res.location("volunteer");
				res.redirect("volunteer");
			}
		});
	});
};