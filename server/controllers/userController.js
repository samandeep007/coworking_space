const mysql = require('mysql')

// Connection Pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


// view Users
exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID ' + connection.threadId);


        //User the connection
        connection.query('SELECT * FROM properties', (err, rows) => {
            // When done with the connection, release it
            connection.release();

            if (!err) {
                res.render('layouts/ownerDashboard', { rows });
            }
            else {
                console.log(err);

            }

            console.log('The data from user table: \n', rows);


        })
    })

}

exports.show = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID ' + connection.threadId);


        //User the connection
        connection.query('SELECT * FROM properties', (err, rows) => {
            // When done with the connection, release it
            connection.release();

            if (!err) {
                res.render('layouts/coworkerDashboard', { rows });
            }

            else {
                console.log(err);

            }

            console.log('The data from user table: \n', rows);


        })
    })

}


//Find property by search
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID ' + connection.threadId);

        let searchTerm = req.body.search;

        //User the connection
        connection.query('SELECT * FROM properties WHERE property_title LIKE ? OR property_address LIKE ? OR property_neighbourhood LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            // When done with the connection, release it
            connection.release();

            if (!err) {
                res.render('layouts/ownerDashboard', { rows });
            }
            else {
                console.log(err);

            }

            console.log('The data from user table: \n', rows);


        })
    })

}

exports.finder = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID ' + connection.threadId);

        let searchTerm = req.body.search;

        //User the connection
        connection.query('SELECT * FROM properties WHERE property_title LIKE ? OR property_address LIKE ? OR property_neighbourhood LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            // When done with the connection, release it
            connection.release();

            if (!err) {
                res.render('layouts/coworkerDashboard', { rows });
            }
            else {
                console.log(err);

            }

            console.log('The data from user table: \n', rows);


        })
    })

}

exports.form = (req, res) => {
    res.render('layouts/addproperty');
}

// Add new property
exports.create = (req, res) => {
    const { property_title, property_description, property_type, property_address, property_neighbourhood, property_area, property_seats, prop_smoking_area, prop_parking_facility, prop_availability, property_lease, property_rent, property_contact } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID ' + connection.threadId);

        let searchTerm = req.body.search;

        //User the connection
        connection.query('INSERT INTO properties SET property_title=?, property_type=?, property_address=?, property_neighbourhood=?, property_area=?, property_seats=?, prop_smoking_area=?, prop_parking_facility=?, prop_availability=?, property_lease=?, property_rent=?, property_description=?, property_contact=?', [property_title, property_type, property_address, property_neighbourhood, property_area, property_seats, prop_smoking_area, prop_parking_facility, prop_availability, property_lease, property_rent, property_description, property_contact], (err, rows) => {
            // When done with the connection, release it],
            connection.release();

            if (!err) {
                res.render('layouts/addproperty', { alert: 'Property added successfully.' });
            }
            else {
                console.log(err);

            }

            console.log('The data from user table: \n', rows);


        })
    })

}

exports.registerUser = (req, res) => {
    res.render('layouts/register');
}


exports.addUser = (req, res) => {
    
    const { first_name, last_name, user_email, user_password, user_phone, user_role } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID ' + connection.threadId);


        //User the connection
        connection.query('INSERT INTO users SET first_name=?, last_name=?, user_email=?, user_password=?, user_phone=?, user_role=?', [first_name, last_name, user_email, user_password, user_phone, user_role], (err, rows) => {
            // When done with the connection, release it],
            connection.release();

            if (!err) {
              
                
                if(user_role == 'Owner') {
                    res.redirect('ownerDashboard');
                }

                else {
                    res.redirect('coworkerDashboard')
                }
            }
        
            else {
                console.log(err);

            }

            console.log('The data from user table: \n', rows);


        })
    })

}


//Edit property
exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID ' + connection.threadId);

        // User the connection
        connection.query('SELECT * FROM properties WHERE property_id = ?', [req.params.property_id], (err, rows) => {
            if (!err) {
                res.render('layouts/editproperty', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    })
}


//Update Property
exports.update = (req, res) => {
    const { property_title, property_description, property_type, property_address, property_neighbourhood, property_area, property_seats, prop_smoking_area, prop_parking_facility, prop_availability, property_lease, property_rent } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID ' + connection.threadId);


        // User the connection

        connection.query('UPDATE properties SET property_title=?, property_type=?, property_address=?, property_neighbourhood=?, property_area=?, property_seats=?, prop_smoking_area=?, prop_parking_facility=?, prop_availability=?, property_lease=?, property_rent=?, property_description=? WHERE property_id = ?', [property_title, property_type, property_address, property_neighbourhood, property_area, property_seats, prop_smoking_area, prop_parking_facility, prop_availability, property_lease, property_rent, property_description, req.params.property_id], (err, rows) => {

            // User the connection
            connection.release();
            if (!err) {

                connection.query('SELECT * FROM properties WHERE property_id = ?', [req.params.property_id], (err, rows) => {
                    // When done with the connection, release it

                    if (!err) {
                        res.render('layouts/editproperty', { rows, alert: `${property_title} has been updated.` });
                    } else {
                        console.log(err);
                    }
                    console.log('The data from user table: \n', rows);
                });
            }
            else {
                console.log(err);

            }

            console.log('The data from user table: \n', rows);


        })
    })
}


exports.delete = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID ' + connection.threadId);

    connection.query('DELETE FROM properties WHERE property_id = ?', [req.params.property_id], (err, rows) => {
  
      if(!err) {
        res.redirect('ownerDashboard');
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
  
    });
})
}

exports.viewall = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID ' + connection.threadId);

    // User the connection
    connection.query('SELECT * FROM properties WHERE property_id = ?', [req.params.property_id], (err, rows) => {
      if (!err) {
        res.render('layouts/viewproperty', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  
  })
  
}