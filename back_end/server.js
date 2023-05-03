const express = require('express')
// const bodyParser = require('body-parser')
const http = require('http')
const mysql = require('mysql')
const { Server } = require('socket.io')
const cors = require('cors')

const pool  = mysql.createPool({
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'salon_shop'
})

const app = express()
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: "*",
}))
const port = process.env.PORT || 5000

const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        credentials: true,
        origin: "http://localhost:3000",
        transports: ['websocket', 'polling'],
        methods: ["GET", "POST"],
    },
    allowEIO3: true
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// รอการ connect จาก client
io.on('connection', (socket) => {
    console.log('user connected : '+socket.id)
    let countdown;
    // เมื่อ Client ตัดการเชื่อมต่อ
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on("join", (id) => {
        socket.join(id);
    });

    socket.on("start", (id) => {
        let time = 300
        countdown = setInterval(update, 1000);

        function update() {
            // Here were are calculating minutes and second from given time.
            let min = Math.floor(time / 60);
            let sec = time % 60;
        
            min = min.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })
            sec = sec.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })
        
            //Here we are printing our current time.
            console.log(`${min}:${sec}`)
            socket.to(id).emit('time', `${min}:${sec}`)
        
            // Here we are reducing our time by 1. As this function is called every 1 sec so our time will reduce by 1 every 1 second.
            time--;
        
            // Stop when min and sec are 0.
            if (min == 0 && sec == 0){
                clearInterval(countdown)
                pool.getConnection(async (err, connection) => {
                    if(err) throw err
                    console.log('connected as id ' + connection.threadId)
                    sql = 'UPDATE `order` SET status=? WHERE id=?'
                    connection.query(sql, ["Cancel" ,id], (err, rows) => {
                        connection.release()
                        if (!err) {
                            socket.to(id).emit('cancel', 'Time Out! Cancel Order!')
                        } else {
                            console.log(err)
                        }
                    })
                })
            }
        }
    })

    socket.on('confirm_', function (id){
        clearInterval(countdown)
        pool.getConnection(async (err, connection) => {
            if(err) throw err
            console.log('connected as id ' + connection.threadId)
            sql = 'UPDATE `order` SET status=? WHERE id=?'
            connection.query(sql, ["Confirmed" ,id], (err, rows) => {
                connection.release()
                if (!err) {
                    socket.to(id).emit('confirm', 'Shop Confirm Your Order.')
                } else {
                    console.log(err)
                }
            })
        })
    })

    socket.on('confirm', function (id){
        clearInterval(countdown)
        pool.getConnection(async (err, connection) => {
            if(err) throw err
            console.log('connected as id ' + connection.threadId)
            sql = 'UPDATE `order` SET status=? WHERE id=?'
            connection.query(sql, ["Confirmed" ,id], (err, rows) => {
                connection.release()
                if (!err) {
                    socket.to(id).emit('msg', 'Shop Confirm Your Order.')
                } else {
                    console.log(err)
                }
            })
        })
    })

    socket.on('cancel_', function (id){
        clearInterval(countdown)
        pool.getConnection(async (err, connection) => {
            if(err) throw err
            console.log('connected as id ' + connection.threadId)
            sql = 'UPDATE `order` SET status=? WHERE id=?'
            connection.query(sql, ["Cancel" ,id], (err, rows) => {
                connection.release()
                if (!err) {
                    socket.to(id).emit('cancel', 'Cancel Order!')
                } else {
                    console.log(err)
                }
            })
        })
    })

    socket.on('cancel', function (id){
        clearInterval(countdown)
        pool.getConnection(async (err, connection) => {
            if(err) throw err
            console.log('connected as id ' + connection.threadId)
            sql = 'UPDATE `order` SET status=? WHERE id=?'
            connection.query(sql, ["Cancel" ,id], (err, rows) => {
                connection.release()
                if (!err) {
                    socket.to(id).emit('msg', 'Cancel Order!')
                } else {
                    console.log(err)
                }
            })
        })
    })
    
}) 

// Listen on enviroment port or 5000
app.listen(port, () => console.log(`APP Listening on port ${port}`))
server.listen(5001, () => console.log(`IO Listening on port ${5001}`))

// Post sign_up
app.post('/sign_up', (req, res) => {
    pool.getConnection(async (err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)

        const { email, password, display_name, firstname, lastname, phonenumber, location_name } = req.body
        console.log(req)
        var sql = 'SELECT * FROM user WHERE email=?'
        connection.query(sql, [email], (err, rows) => {
            if (!err) {
                console.log(rows)
                if(rows.length > 0){
                    connection.release() // return the connection to pool
                    res.status(500).json({error: 'This E-mail is already in use!'})
                } else{
                    var date_time = new Date()
                    var sql = 'INSERT INTO location (location_name, create_time) VALUES (?, ?)'
                    connection.query(sql, [location_name, date_time], (err, rows) => {
                        if (!err) {
                            location_id = rows.insertId
                            var sql = 'INSERT INTO user (email, password, display_name, firstname, lastname, phonenumber, location_id, role_id) VALUES (?, ?, ?, ?, ?, ?, ?,2)'
                            connection.query(sql, [email, password, display_name, firstname, lastname, phonenumber, location_id], (err, rows) => {
                                connection.release() // return the connection to pool
                                if (!err) {
                                    res.status(200).json({msg: 'Sign Up Success!'})
                                } else {
                                    console.log(err)
                                    res.status(500).json({error: 'Incorrect E-mail or Password!'})
                                }
                            })
                        } else {
                            connection.release() // return the connection to pool
                            console.log(err)
                            res.status(500).json({error: 'Incorrect E-mail or Password!'})
                        }
                    })
                }
            } else {
                connection.release() // return the connection to pool
                console.log(err)
                res.status(500).json({error: 'Incorrect E-mail or Password!'})
            }
        })
    })
})

// Post sign_in
app.post('/sign_in', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)

        const { email, password } = req.body

        if(email == null || email == '' || password == null || password == ''){
            connection.release()
            res.status(500).json({error: 'E-mail or Password cannot be null or empty!'})
        }
        else{
            connection.query('SELECT id, firstname, lastname, role_id FROM user WHERE email=? AND password=?', [email, password], (err, rows) => {
                connection.release() // return the connection to pool
                if (!err && rows.length > 0 && rows != null) {
                    res.json(rows)
                } else {
                    console.log(err)
                    res.status(500).json({error: 'Incorrect E-mail or Password!'})
                }
            })
        }
    })
})

// Get All User
app.get('/get_user', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT *, user.id as user_id FROM user JOIN location ON user.location_id=location.id', [], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.json(rows)
            } else {
                console.log(err)
                res.status(500).json({error: 'User Not Found!'})
            }
        })
    })
})

// Get All User
app.post('/get_user_order', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('connected as id ' + connection.threadId)
        const { user_id } = req.body
        console.log(req.body)
        sql = 'SELECT * FROM `order` JOIN location ON shop.location_id=location.id WHERE shop.shop_name LIKE ? OR location.location_name LIKE ?'
        connection.query(sql, ['%'+keyword+'%', '%'+keyword+'%'], (err, rows) => {
            console.log(rows)
            if (!err && rows.length > 0) {
                var response = rows
                var completedRequests = 0

                function handleCategoryQuery(index) {
                    sql = 'SELECT category_id, category_name FROM shop_category JOIN category ON category.id=shop_category.category_id  WHERE shop_id=?'
                    connection.query(sql, [response[index].shop_id], (err, rows) => {
                        if (!err && rows.length > 0) {
                            response[index].category = rows
                            completedRequests++

                            if (completedRequests === response.length) {
                                connection.release()
                                res.json(response)
                            }
                        } else {
                            connection.release()
                            console.log(err)
                            res.status(500).json({})
                        }
                    })
                }

                for (let index = 0; index < response.length; index++) {
                    handleCategoryQuery(index)
                }
            } else {
                connection.release()
                console.log(err)
                res.json([])
            }
        })
        
    })
})


// Get User By ID
app.get('/get_user/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)

        const { id } = req.params
        console.log(req.params)

        if(id == null || id == ''){
            connection.release() // return the connection to pool
            res.status(404).json({error: '404 Not Found!'})
        }
        else{
            connection.query('SELECT *, user.id as user_id FROM user JOIN location ON user.location_id=location.id WHERE user.id=?', [id], (err, rows) => {
                connection.release() // return the connection to pool
                if (!err && rows.length > 0) {
                    res.json(rows)
                } else {
                    console.log(err)
                    res.status(500).json({error: 'User Not Found!'})
                }
            })
        }
    })
})

// Get All User
app.get('/search_user/', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT *, user.id as user_id FROM user JOIN location ON user.location_id=location.id', [], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.json(rows)
            } else {
                console.log(err)
                res.json([])
            }
        })
    })
})
// Get All User
app.get('/search_user/:keyword', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        const { keyword } = req.params
        console.log(req.params)
        connection.query('SELECT *, user.id as user_id FROM user JOIN location ON user.location_id=location.id WHERE user.firstname LIKE ? OR user.lastname LIKE ? OR location.location_name LIKE ?', ['%'+keyword+'%', '%'+keyword+'%', '%'+keyword+'%'], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.json(rows)
            } else {
                console.log(err)
                res.json([])
            }
        })
    })
})

// Update User By ID
app.post('/update_user', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)

        const { id, email, password, 
                display_name, firstname, lastname, 
                phonenumber, location_name} = req.body
        console.log(req.body)

        if(id == null || id == ''){
            connection.release()
            res.status(404).json({error: '404 Not Found!'})
        }
        else{
            var sql = "SELECT * FROM user WHERE id=?"
            connection.query(sql, [id], (err, rows) => {
                if (!err && rows.length > 0) {
                    var location_id = rows[0].location_id
                    var sql = 'SELECT *, user.id as user_id FROM user JOIN location ON user.location_id=location.id WHERE email=?'
                    connection.query(sql, [email], (err, rows) => {
                        if (!err) {
                            console.log(rows)
                            if(rows.length > 0 && rows[0].email == email && rows[0].user_id != id){
                                connection.release() // return the connection to pool
                                res.status(500).json({error: 'This E-mail is already in use!'})
                            } else{
                                var sql = "UPDATE user SET email=?, password=?, display_name=?, firstname=?, lastname=?, phonenumber=? WHERE user.id=?"
                                connection.query(sql, [email, password, display_name, firstname, lastname, phonenumber, id], (err, rows) => {
                                    if (!err) {
                                        console.log(rows)
                                        var date_time = new Date()
                                        var sql = "UPDATE location SET location_name=?, update_time=? WHERE id=?"
                                        connection.query(sql, [location_name, date_time, location_id], (err, rows) => {
                                            connection.release() // return the connection to pool
                                            if (!err) {
                                                console.log(rows)
                                                res.status(200).json({msg: 'Edit User Data Success!'})
                                            } else {
                                                console.log(err)
                                                res.status(500).json({error: 'User Not Found!'})
                                            }
                                        })
                                    } else {
                                        connection.release() // return the connection to pool
                                        console.log(err)
                                        res.status(500).json({error: 'User Not Found!'})
                                    }
                                })
                            }
                        } else {
                            connection.release() // return the connection to pool
                            console.log(err)
                            res.status(500).json({error: 'Incorrect E-mail or Password!'})
                        }
                    })
                } else {
                    connection.release() // return the connection to pool
                    console.log(err)
                    res.status(500).json({error: 'User Not Found!'})
                }
            })
        }
    })
})

// Create Shop
app.post('/create_shop', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('connected as id ' + connection.threadId)
        const { shop_name, phonenumber, location_name, create_by, category} = req.body
        console.log(req.body)
        connection.query('SELECT * FROM shop WHERE shop_name=?', [shop_name], (err, rows) => {
            if (!err) {
                console.log(rows)
                if(rows.length > 0){
                    connection.release() // return the connection to pool
                    res.status(500).json({error: 'This Shop Name is already in use!'})
                } else{
                    var date_time = new Date()
                    var sql = 'INSERT INTO location (location_name, create_time) VALUES (?, ?)'
                    connection.query(sql, [location_name, date_time], (err, rows) => {
                        if (!err) {
                            location_id = rows.insertId
                            var sql = 'INSERT INTO shop (shop_name, phonenumber, location_id, create_time, create_by) VALUES (?, ?, ?, ?, ?)'
                            connection.query(sql, [shop_name, phonenumber, location_id, date_time, create_by], (err, rows) => {
                                if (!err) {
                                    var completedRequests = 0
                                    var id = rows.insertId
                                    function handleCategoryQuery(index) {
                                        sql = 'INSERT INTO shop_category (shop_id, category_id) VALUES (?, ?)'
                                        connection.query(sql, [id, category[index]], (err, rows) => {
                                            if (!err) {
                                                completedRequests++

                                                if (completedRequests === category.length) {
                                                    connection.release()
                                                    res.status(200).json({msg: 'Shop Create Success!'})
                                                }
                                            } else {
                                                connection.release()
                                                console.log(err)
                                                res.status(500).json({ error: 'Category Insert ERROR!' })
                                            }
                                        })
                                    }

                                    if(category.length != 0){
                                        for (let index = 0; index < category.length; index++) {
                                            handleCategoryQuery(index)
                                        }
                                    } else{
                                        connection.release()
                                        res.status(200).json({msg: 'Update Shop Data Success!'})
                                    }
                                } else {
                                    console.log(err)
                                    res.status(500).json({error: 'Shop Insert Error!!'})
                                }
                            })
                        } else {
                            connection.release() // return the connection to pool
                            console.log(err)
                            res.status(500).json({error: 'Shop Not Found!'})
                        }
                    })
                }
            } else {
                connection.release()
                console.log(err)
                res.status(500).json({ error: 'Shop Not Found!' })
            }
        })
    })
})

// Get All Shop
app.get('/get_shop', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT *, shop.id as shop_id, user.id as user_id FROM shop JOIN user ON shop.create_by=user.id JOIN location ON shop.location_id=location.id', [], (err, rows) => {
            if (!err) {
                var response = rows
                var completedRequests = 0;

                function handleCategoryQuery(index) {
                    sql = 'SELECT category_id, category_name FROM shop_category JOIN category ON category.id=shop_category.category_id  WHERE shop_id=?'
                    connection.query(sql, [response[index].shop_id], (err, rows) => {
                        if (!err) {
                            response[index].category = rows
                            completedRequests++

                            if (completedRequests === response.length) {
                                connection.release()
                                res.json(response)
                            }
                        } else {
                            connection.release()
                            console.log(err)
                            res.status(500).json({ error: 'Shop Not Found!' })
                        }
                    })
                }

                for (let index = 0; index < response.length; index++) {
                    handleCategoryQuery(index)
                }
            } else {
                connection.release()
                console.log(err)
                res.status(500).json({ error: 'Shop Not Found!' })
            }
        })
    })
})

// Get Shop By ID
app.get('/get_shop/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)

        const { id } = req.params
        console.log(req.params)

        if(id == null || id == ''){
            connection.release()
            res.status(404).json({error: '404 Not Found!'})
        }
        else{
            var sql = 'SELECT *, shop.id as shop_id, user.id as user_id FROM shop JOIN user ON shop.create_by=user.id JOIN location ON shop.location_id=location.id WHERE shop.id=?'
            connection.query(sql, [id], (err, rows) => {
                if (!err) {
                    response = rows
                    if(rows.length != 0){
                        sql = 'SELECT category_id, category_name FROM shop_category JOIN category ON category.id=shop_category.category_id  WHERE shop_id=?'
                        connection.query(sql, [id], (err, rows) => {
                            if (!err) {
                                console.log(rows)
                                response[0].category = rows
                                sql = 'SELECT id as menu_id, menu_name, price FROM shop_menu WHERE create_by=?'
                                connection.query(sql, [id], (err, rows) => {
                                    connection.release() // return the connection to pool
                                    if (!err) {
                                        console.log(rows)
                                        response[0].menu = rows
                                        res.json(response)
                                    } else {
                                        console.log(err)
                                        res.status(500).json({error: 'Shop Not Found!'})
                                    }
                                })
                            } else {
                                connection.release() // return the connection to pool
                                console.log(err)
                                res.status(500).json({error: 'Shop Not Found!'})
                            }
                        })
                    } else{
                        connection.release()
                        res.status(500).json({error: 'Shop Not Found!'})
                    }
                } else {
                    connection.release()
                    console.log(err)
                    res.status(500).json({error: 'Shop Not Found!'})
                }
            })
        }
    })
})

// Get Shop By create by
app.get('/get_shop_by_user/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)

        const { id } = req.params
        console.log(req.params)

        if(id == null || id == ''){
            connection.release()
            res.status(404).json({error: '404 Not Found!'})
        }
        else{
            var sql = 'SELECT *, shop.id as shop_id, user.id as user_id FROM shop JOIN user ON shop.create_by=user.id JOIN location ON shop.location_id=location.id WHERE shop.create_by=?'
            connection.query(sql, [id], (err, rows) => {
                if (!err) {
                    response = rows
                    if(rows.length != 0){
                        sql = 'SELECT category_id, category_name FROM shop_category JOIN category ON category.id=shop_category.category_id  WHERE shop_id=?'
                        connection.query(sql, [rows[0].shop_id], (err, rows) => {
                            if (!err) {
                                console.log(rows)
                                response[0].category = rows
                                sql = 'SELECT id as menu_id, menu_name, price FROM shop_menu WHERE create_by=?'
                                connection.query(sql, [id], (err, rows) => {
                                    connection.release() // return the connection to pool
                                    if (!err) {
                                        console.log(rows)
                                        response[0].menu = rows
                                        res.json(response)
                                    } else {
                                        console.log(err)
                                        res.status(500).json({error: 'Shop Not Found!'})
                                    }
                                })
                            } else {
                                connection.release() // return the connection to pool
                                console.log(err)
                                res.status(500).json({error: 'Shop Not Found!'})
                            }
                        })
                    } else{
                        connection.release()
                        res.status(500).json({error: 'Shop Not Found!'})
                    }
                } else {
                    connection.release()
                    console.log(err)
                    res.status(500).json({error: 'Shop Not Found!'})
                }
            })
        }
    })
})

// Get Shop By ID
app.get('/get_shop_by_category/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)

        const { id } = req.params
        console.log(req.params)

        var sql = 'SELECT *, shop.id as shop_id FROM shop_category JOIN shop ON shop_category.shop_id=shop.id JOIN location ON shop.location_id=location.id WHERE shop_category.category_id=?'
        connection.query(sql, [id], (err, rows) => {
            connection.release()
            if (!err && rows.length > 0) {
                res.status(200).json(rows)
            } else {
                console.log(err)
                res.json([])
            }
        })
    })
})

// Get All Shop
app.get('/search_shop/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('connected as id ' + connection.threadId)
        const { keyword } = req.params
        console.log(req.params)

        connection.query('SELECT *, shop.id as shop_id FROM shop JOIN location ON shop.location_id=location.id', [], (err, rows) => {
            console.log(rows)
            if (!err && rows.length > 0) {
                var response = rows
                var completedRequests = 0;

                function handleCategoryQuery(index) {
                    sql = 'SELECT category_id, category_name FROM shop_category JOIN category ON category.id=shop_category.category_id  WHERE shop_id=?'
                    connection.query(sql, [response[index].shop_id], (err, rows) => {
                        if (!err) {
                            response[index].category = rows
                            completedRequests++

                            if (completedRequests === response.length) {
                                connection.release()
                                res.json(response)
                            }
                        } else {
                            connection.release()
                            console.log(err)
                            res.json([])
                        }
                    })
                }

                for (let index = 0; index < response.length; index++) {
                    handleCategoryQuery(index)
                }
            } else {
                connection.release()
                console.log(err)
                res.json([])
            }
        })
    })
})
// Get All Shop
app.get('/search_shop/:keyword', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('connected as id ' + connection.threadId)
        const { keyword } = req.params
        console.log(req.params)

        connection.query('SELECT *, shop.id as shop_id FROM shop JOIN location ON shop.location_id=location.id WHERE shop.shop_name LIKE ? OR location.location_name LIKE ?', ['%'+keyword+'%', '%'+keyword+'%'], (err, rows) => {
            console.log(rows)
            if (!err && rows.length > 0) {
                var response = rows
                var completedRequests = 0

                function handleCategoryQuery(index) {
                    sql = 'SELECT category_id, category_name FROM shop_category JOIN category ON category.id=shop_category.category_id  WHERE shop_id=?'
                    connection.query(sql, [response[index].shop_id], (err, rows) => {
                        if (!err) {
                            response[index].category = rows
                            completedRequests++

                            if (completedRequests === response.length) {
                                connection.release()
                                res.json(response)
                            }
                        } else {
                            connection.release()
                            console.log(err)
                            res.status(500).json([])
                        }
                    })
                }

                for (let index = 0; index < response.length; index++) {
                    handleCategoryQuery(index)
                }
            } else {
                connection.release()
                console.log(err)
                res.status(500).json([])
            }
        })
        
    })
})

// Update Shop By ID
app.post('/update_shop', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
 
        const { id, shop_name, phonenumber, location_name, category} = req.body
        console.log(req.body)

        if(id == null || id == ''){
            connection.release()
            res.status(404).json({error: '404 Not Found!'})
        }
        else{
            var sql = "SELECT * FROM shop WHERE id=?"
            connection.query(sql, [id], (err, rows) => {
                if (!err && rows.length > 0) {
                    console.log(rows)
                    var location_id = rows[0].location_id
                    connection.query('SELECT *, shop.id as shop_id FROM shop JOIN location ON shop.location_id=location.id WHERE shop_name=?', [shop_name], (err, rows) => {
                        if (!err) {
                            if(rows.length > 0 && rows[0].shop_id != id){
                                connection.release() // return the connection to pool
                                res.status(500).json({error: 'This Shop Name is already in use!'})
                            } else{
                                var sql = "UPDATE shop SET shop_name=?, phonenumber=? WHERE shop.id=?"
                                connection.query(sql, [shop_name, phonenumber, id], (err, rows) => {
                                    if (!err) {
                                        var date_time = new Date()
                                        var sql = "UPDATE location SET location_name=?, update_time=? WHERE id=?"
                                        connection.query(sql, [location_name, date_time, location_id], (err, rows) => {
                                            if (!err) {
                                                var completedRequests = 0
                                                sql = 'DELETE FROM shop_category WHERE shop_id=?'
                                                connection.query(sql, [id], (err, rows) => {
                                                    console.log(rows)
                                                    if (err) {
                                                        console.log(err)
                                                        connection.release()
                                                        res.status(500).json({ error: 'Category Delete ERROR!' })
                                                    }
                                                })
        
                                                function handleCategoryQuery(index) {
                                                    sql = 'INSERT INTO shop_category (shop_id, category_id) VALUES (?, ?)'
                                                    connection.query(sql, [id, category[index]], (err, rows) => {
                                                        if (!err) {
                                                            completedRequests++
        
                                                            if (completedRequests === category.length) {
                                                                connection.release()
                                                                res.status(200).json({msg: 'Update Shop Data Success!'})
                                                            }
                                                        } else {
                                                            connection.release()
                                                            console.log(err)
                                                            res.status(500).json({ error: 'Category Insert ERROR!' })
                                                        }
                                                    })
                                                }
        
                                                if(category.length != 0){
                                                    for (let index = 0; index < category.length; index++) {
                                                        handleCategoryQuery(index)
                                                    }
                                                } else{
                                                    connection.release()
                                                    res.status(200).json({msg: 'Update Shop Data Success!'})
                                                }
                                            } else {
                                                connection.release() // return the connection to pool
                                                console.log(err)
                                                res.status(500).json({error: 'User Not Found!'})
                                            }
                                        })
                                    } else {
                                        connection.release()
                                        console.log(err)
                                        res.status(500).json({error: 'Shop Not Found!'})
                                    }
                                })
                            }
                        } else {
                            connection.release()
                            console.log(err)
                            res.status(500).json({ error: 'Shop Not Found!' })
                        }
                    })
                }else{
                    connection.release()
                    res.status(500).json({error: 'Shop Not Found!'})
                }
            })
        }
    })
})

// Create Shop Menu
app.post('/create_shop_menu', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('connected as id ' + connection.threadId)
        const { menu_name, price, create_by } = req.body
        connection.query('SELECT * FROM shop_menu WHERE menu_name=? AND create_by=?', [menu_name, create_by], (err, rows) => {
            if (!err) {
                console.log(rows)
                if(rows.length > 0){
                    connection.release() // return the connection to pool
                    res.status(500).json({error: 'This Menu Name is already in use!'})
                } else{
                    var sql = 'INSERT INTO shop_menu (menu_name, price, create_by) VALUES (?, ?, ?)'
                    connection.query(sql, [menu_name, price, create_by], (err, rows) => {
                        connection.release() // return the connection to pool
                        if (!err) {
                            console.log(rows)
                            res.status(200).json({msg: 'Shop Menu Create Success!'})
                        } else {
                            console.log(err)
                            res.status(500).json({error: 'Shop Menu Not Found!'})
                        }
                    })
                }
            } else {
                connection.release()
                console.log(err)
                res.status(500).json({ error: 'Shop Menu Not Found!' })
            }
        })
    })
})

// Get Shop Menu By Shop ID
app.get('/get_shop_menu/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)

        const { id } = req.params
        console.log(req.params)

        if(id == null || id == ''){
            connection.release()
            res.status(404).json({error: '404 Not Found!'})
        }
        else{
            var sql = 'SELECT * FROM shop_menu WHERE id=?'
            connection.query(sql, [id], (err, rows) => {
                connection.release()
                if (!err) {
                    console.log(rows)
                    res.json(rows)
                } else {
                    console.log(err)
                    res.status(500).json({error: 'Shop Not Found!'})
                }
            })
        }
    })
})

// Update User By ID
app.post('/update_shop_menu', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)

        const { id, menu_name, price } = req.body
        console.log(req.body)

        if(id == null || id == ''){
            connection.release()
            res.status(404).json({error: '404 Not Found!'})
        }
        else{
            var sql = "UPDATE shop_menu SET menu_name=?, price=? WHERE id=?"
            connection.query(sql, [menu_name, price, id], (err, rows) => {
                if (!err) {
                    console.log(rows)
                    res.status(200).json({msg: 'Edit User Data Success!'})
                } else {
                    connection.release() // return the connection to pool
                    console.log(err)
                    res.status(500).json({error: 'User Not Found!'})
                }
            })
        }
    })
})

// Create Order
app.post('/create_order', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('connected as id ' + connection.threadId)
        const { user_id, shop_id, total_price, order_time, menu } = req.body

        if(user_id == null || user_id == '' || 
           shop_id == null || shop_id == '' ||
           total_price == null || total_price == '' ||
           order_time == null || order_time == ''){
            connection.release()
            res.status(404).json({error: 'Incomplete Information!'})
        } else{
            connection.query('SELECT * FROM user WHERE id=?', [user_id], (err, rows) => {
                if (!err && rows.length != 0) {
                    connection.query('SELECT * FROM shop WHERE id=?', [shop_id], (err, rows) => {
                        if (!err && rows.length != 0) {
                            var date_time = new Date()
                                var sql = 'INSERT INTO `order` (create_by, order_at, total_price, status, order_time, create_time) VALUES (?, ?, ?, ?, ?, ?)'
                                connection.query(sql, [user_id, shop_id, total_price, "Not Yet Paid", order_time, date_time], (err, rows) => {
                                    if (!err) {
                                        order_id = rows.insertId
                                        var completedRequests = 0

                                        function handleMenuQuery(index) {
                                            sql = 'INSERT INTO order_detail (order_id, menu_id) VALUES (?, ?)'
                                            connection.query(sql, [order_id, menu[index].menu_id], (err, rows) => {
                                                if (!err) {
                                                    completedRequests++

                                                    if (completedRequests === menu.length) {
                                                        connection.release()
                                                        res.status(200).json({order_id: order_id,msg: 'Order Success!'})
                                                    }
                                                } else {
                                                    connection.release()
                                                    console.log(err)
                                                    res.status(500).json({ error: 'Order Menu Insert ERROR!' })
                                                }
                                            })
                                        }

                                        if(menu.length != 0){
                                            for (let index = 0; index < menu.length; index++) {
                                                handleMenuQuery(index)
                                            }
                                        } else{
                                            connection.release()
                                            res.status(200).json({msg: 'Dont have Menu!'})
                                        }
                                    } else {
                                        connection.release() // return the connection to pool
                                        console.log(err)
                                        res.status(500).json({error: 'Order Insert Error!'})
                                    }
                                })
                        } else {
                            connection.release()
                            console.log(err)
                            res.status(500).json({ error: 'Shop Not Found!' })
                        }
                    })
                } else {
                    connection.release()
                    console.log(err)
                    res.status(500).json({error: 'User Not Found!'})
                }
            })
        }
    })
})

// Get All Order By User Id
app.get('/get_order_user/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        const { id } = req.params
        console.log(req.params)

        if(id == null || id == ''){
            connection.release() // return the connection to pool
            res.status(404).json({error: '404 Not Found!'})
        }
        else{
            connection.query('SELECT *,`order`.id as order_id FROM `order` JOIN shop ON `order`.order_at=shop.id WHERE `order`.create_by=? ORDER BY order_id DESC', [id], (err, rows) => {
                if (!err && rows.length > 0) {
                    var response = rows
                    var completedRequests = 0

                function handleCategoryQuery(index) {
                    sql = 'SELECT * FROM order_detail JOIN shop_menu ON order_detail.menu_id=shop_menu.id WHERE order_id=?'
                    connection.query(sql, [response[index].order_id], (err, rows) => {
                        console.log(rows)
                        if (!err && rows.length > 0) {
                            response[index].order_detail = rows
                            completedRequests++

                            if (completedRequests === response.length) {
                                connection.release()
                                res.json(response)
                            }
                        } else {
                            connection.release()
                            console.log(err)
                            res.status(500).json([])
                        }
                    })
                }

                for (let index = 0; index < response.length; index++) {
                    handleCategoryQuery(index)
                }
                } else {
                    connection.release() // return the connection to pool
                    console.log(err)
                    res.status(500).json([])
                }
            })
        }
    })
})

// Get All Order By User Id
app.get('/get_order_shop/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        const { id } = req.params
        console.log(req.params)

        if(id == null || id == ''){
            connection.release() // return the connection to pool
            res.status(404).json({error: '404 Not Found!'})
        }
        else{
            connection.query('SELECT *,`order`.id as order_id FROM `order` JOIN shop ON `order`.order_at=shop.id  JOIN user ON `order`.create_by=user.id WHERE shop.create_by=? ORDER BY order_id DESC', [id], (err, rows) => {
                if (!err && rows.length > 0) {
                    var response = rows
                    var completedRequests = 0

                function handleCategoryQuery(index) {
                    sql = 'SELECT * FROM order_detail JOIN shop_menu ON order_detail.menu_id=shop_menu.id WHERE order_id=?'
                    connection.query(sql, [response[index].order_id], (err, rows) => {
                        console.log(rows)
                        if (!err && rows.length > 0) {
                            response[index].order_detail = rows
                            completedRequests++

                            if (completedRequests === response.length) {
                                connection.release()
                                res.json(response)
                            }
                        } else {
                            connection.release()
                            console.log(err)
                            res.status(500).json([])
                        }
                    })
                }

                for (let index = 0; index < response.length; index++) {
                    handleCategoryQuery(index)
                }
                } else {
                    connection.release() // return the connection to pool
                    console.log(err)
                    res.status(500).json([])
                }
            })
        }
    })
})

// Get All Order By User Id
app.get('/get_order_user_noti/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        const { id } = req.params
        console.log(req.params)

        if(id == null || id == ''){
            connection.release() // return the connection to pool
            res.status(404).json({error: '404 Not Found!'})
        }
        else{
            connection.query('SELECT *,`order`.id as order_id FROM `order` JOIN shop ON `order`.order_at=shop.id WHERE `order`.create_by=? AND `order`.status=? ORDER BY order_id DESC', [id, "Not Yet Paid"], (err, rows) => {
                if (!err && rows.length > 0) {
                    var response = rows
                    var completedRequests = 0

                function handleCategoryQuery(index) {
                    sql = 'SELECT * FROM order_detail JOIN shop_menu ON order_detail.menu_id=shop_menu.id WHERE order_id=?'
                    connection.query(sql, [response[index].order_id], (err, rows) => {
                        console.log(rows)
                        if (!err && rows.length > 0) {
                            response[index].order_detail = rows
                            completedRequests++

                            if (completedRequests === response.length) {
                                connection.release()
                                res.json(response)
                            }
                        } else {
                            connection.release()
                            console.log(err)
                            res.status(500).json([])
                        }
                    })
                }

                for (let index = 0; index < response.length; index++) {
                    handleCategoryQuery(index)
                }
                } else {
                    connection.release() // return the connection to pool
                    console.log(err)
                    res.status(500).json([])
                }
            })
        }
    })
})

// Get All Order By User Id
app.get('/get_order_shop_noti/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        const { id } = req.params
        console.log(req.params)

        if(id == null || id == ''){
            connection.release() // return the connection to pool
            res.status(404).json({error: '404 Not Found!'})
        }
        else{
            connection.query('SELECT *,`order`.id as order_id FROM `order` JOIN shop ON `order`.order_at=shop.id JOIN user ON `order`.create_by=user.id WHERE shop.create_by=? AND `order`.status=? ORDER BY order_id DESC', [id, "Wait Confirm"], (err, rows) => {
                if (!err && rows.length > 0) {
                    var response = rows
                    var completedRequests = 0

                function handleCategoryQuery(index) {
                    sql = 'SELECT * FROM order_detail JOIN shop_menu ON order_detail.menu_id=shop_menu.id WHERE order_id=?'
                    connection.query(sql, [response[index].order_id], (err, rows) => {
                        console.log(rows)
                        if (!err && rows.length > 0) {
                            response[index].order_detail = rows
                            completedRequests++

                            if (completedRequests === response.length) {
                                connection.release()
                                res.json(response)
                            }
                        } else {
                            connection.release()
                            console.log(err)
                            res.status(500).json([])
                        }
                    })
                }

                for (let index = 0; index < response.length; index++) {
                    handleCategoryQuery(index)
                }
                } else {
                    connection.release() // return the connection to pool
                    console.log(err)
                    res.status(500).json([])
                }
            })
        }
    })
})

// Get Order By Id
app.get('/get_order/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)

        const { id } = req.params
        console.log(req.params)

        if(id == null || id == ''){
            connection.release() // return the connection to pool
            res.status(404).json({error: '404 Not Found!'})
        }
        else{
            connection.query('SELECT *,`order`.id as order_id FROM `order` JOIN shop ON `order`.order_at=shop.id WHERE `order`.id=?', [id], (err, rows) => {
                if (!err && rows.length > 0) {
                    var response = rows
                    var completedRequests = 0

                function handleCategoryQuery(index) {
                    sql = 'SELECT * FROM order_detail JOIN shop_menu ON order_detail.menu_id=shop_menu.id WHERE order_id=?'
                    connection.query(sql, [response[index].order_id], (err, rows) => {
                        console.log(rows)
                        if (!err && rows.length > 0) {
                            response[index].order_detail = rows
                            completedRequests++

                            if (completedRequests === response.length) {
                                connection.release()
                                res.json(response)
                            }
                        } else {
                            connection.release()
                            console.log(err)
                            res.status(500).json({})
                        }
                    })
                }

                for (let index = 0; index < response.length; index++) {
                    handleCategoryQuery(index)
                }
                } else {
                    connection.release() // return the connection to pool
                    console.log(err)
                    res.status(500).json({error: 'Order Not Found!'})
                }
            })
        }
    })
})

// Pay Order By Id
app.post('/pay_order', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)

        const { id, price } = req.body

        if(id == null || id == ''){
            connection.release() // return the connection to pool
            res.status(404).json({error: '404 Not Found!'})
        }
        else{
            connection.query('SELECT * FROM `order` WHERE `order`.id=? AND `order`.total_price', [id, price], (err, rows) => {
                if (!err && rows.length > 0) {
                    var date_time = new Date()
                    sql = 'UPDATE `order` SET status=?, pay_time=? WHERE id=?'
                    connection.query(sql, ["Wait Confirm", date_time ,id], (err, rows) => {
                        connection.release()
                        if (!err) {
                            res.status(200).json({msg: 'Payment Success, Wait for Confirmation from the Shop.'})
                        } else {
                            console.log(err)
                            res.status(500).json({ error: 'Menu Not Found!' })
                        }
                    })
                } else {
                    connection.release() // return the connection to pool
                    console.log(err)
                    res.status(500).json({error: 'The amount does not match the amount to be paid!'})
                }
            })
        }
    })
})

// Pay Order By Id
app.post('/confirm_order', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)

        const { id } = req.body

        if(id == null || id == ''){
            connection.release() // return the connection to pool
            res.status(404).json({error: '404 Not Found!'})
        }
        else{
            connection.query('SELECT * FROM `order` WHERE `order`.id=? AND `order`.status=?', [id, "Wait Confirm"], (err, rows) => {
                if (!err && rows.length > 0) {
                    sql = 'UPDATE `order` SET status=? WHERE id=?'
                    connection.query(sql, ["Confirmed" ,id], (err, rows) => {
                        connection.release()
                        if (!err) {
                            res.status(200).json({msg: 'Confirm Success'})
                        } else {
                            console.log(err)
                            res.status(500).json({ error: 'Oder Update Error!' })
                        }
                    })
                } else {
                    connection.release() // return the connection to pool
                    console.log(err)
                    res.status(500).json({error: 'Order Not Found or Status is Not Yet Paid!'})
                }
            })
        }
    })
})

// Pay Order By Id
app.post('/cancel_order', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)

        const { id } = req.body

        if(id == null || id == ''){
            connection.release() // return the connection to pool
            res.status(404).json({error: '404 Not Found!'})
        }
        else{
            connection.query('SELECT * FROM `order` WHERE `order`.id=? AND (`order`.status=? OR `order`.status=?)', [id, "Wait Confirm", "Not Yet Paid"], (err, rows) => {
                if (!err && rows.length > 0) {
                    sql = 'UPDATE `order` SET status=? WHERE id=?'
                    connection.query(sql, ["Cancel" ,id], (err, rows) => {
                        connection.release()
                        if (!err) {
                            res.status(200).json({msg: 'Cancel Order Success'})
                        } else {
                            console.log(err)
                            res.status(500).json({ error: 'Oder Cancel Error!' })
                        }
                    })
                } else {
                    connection.release() // return the connection to pool
                    console.log(err)
                    res.status(500).json({error: 'Order Not Found!'})
                }
            })
        }
    })
})
