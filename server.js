var express = require("express")
var Sequelize = require("sequelize")
var nodeadmin = require("nodeadmin")

//connect to mysql database
var sequelize = new Sequelize('AdministrationParking', 'root', '', {
    dialect:'mysql',
    host:'localhost'
})

sequelize.authenticate().then(function(){
    console.log('Success')
})

//define a new Model
var parkingspots = sequelize.define('ParkingSpots', {
    parkingAdress: Sequelize.STRING,
    parkingDescription: Sequelize.STRING,
    priceParking: Sequelize.STRING
})

var cardetails = sequelize.define('CarDetails', {
    parking_id: Sequelize.INTEGER,
    car_no: Sequelize.STRING,
    parkingAdress: Sequelize.STRING,
    parkingDescription: Sequelize.STRING,
    priceParking: Sequelize.STRING,
    timeParking: Sequelize.STRING
})

cardetails.belongsTo(parkingspots, {foreignKey: 'parking_id', targetKey: 'id'})
//Categories.hasMany(Products)

var app = express()

app.use('/nodeamin', nodeadmin(app))

//access static files
app.use(express.static('public'))
app.use('/admin', express.static('admin'))

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// get a list of categories
app.get('/ParkingSpots', function(request, response) {
    parkingspots.findAll().then(function(ParkingSpots){
        response.status(200).send(ParkingSpots)
    })
        
})

// get one category by id
app.get('/ParkingSpots/:id', function(request, response) {
    parkingspots.findOne({where: {id:request.params.id}}).then(function(ParkingSpots) {
        if(ParkingSpots) {
            response.status(200).send(ParkingSpots)
        } else {
            response.status(404).send()
        }
    })
})

//create a new category
app.post('/ParkingSpots', function(request, response) {
    parkingspots.create(request.body).then(function(ParkingSpots) {
        response.status(201).send(ParkingSpots)
    })
})

app.put('/ParkingSpots/:id', function(request, response) {
    parkingspots.findById(request.params.id).then(function(ParkingSpots) {
        if(ParkingSpots) {
            ParkingSpots.update(request.body).then(function(ParkingSpots){
                response.status(201).send(ParkingSpots)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/ParkingSpots/:id', function(request, response) {
    parkingspots.findById(request.params.id).then(function(ParkingSpots) {
        if(ParkingSpots) {
            ParkingSpots.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/CarDetails', function(request, response) {
    cardetails.findAll(
        {
            include: [{
                model: parent,
                where: { id: Sequelize.col('CarDetails.parking_id') }
            }]
        }
        
        ).then(
            function(CarDetails) {
                response.status(200).send(CarDetails)
            }
        )
})

app.get('/CarDetails/:id', function(request, response) {
    cardetails.findById(request.params.id).then(
            function(product) {
                response.status(200).send(CarDetails)
            }
        )
})

app.post('/CarDetails', function(request, response) {
    cardetails.create(request.body).then(function(CarDetails) {
        response.status(201).send(CarDetails)
    })
})

app.put('/CarDetails/:id', function(request, response) {
    cardetails.findById(request.params.id).then(function(CarDetailsuct) {
        if(CarDetails) {
            CarDetails.update(request.body).then(function(CarDetails){
                response.status(201).send(CarDetails)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/CarDetails/:id', function(request, response) {
    cardetails.findById(request.params.id).then(function(CarDetails) {
        if(CarDetails) {
            CarDetails.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/ParkingSpots/:id/CarDetails', function(request, response) {
    cardetails.findAll({where:{parking_id: request.params.id}}).then(
            function(CarDetails) {
                response.status(200).send(CarDetails)
            }
        )
})

app.listen(8080)
