var Converter = require('csvtojson').core.Converter
var fs = require('fs')
var path = require('path')
var request = require('superagent')
var Batch = require('batch')

var file = path.resolve(__dirname, 'db.csv')
var targetFile = path.resolve(__dirname, 'db.json')
var fileStream = fs.createReadStream(file)
var csvConverter = new Converter({ constructResult: true })

function save(obj, cb) {
  fs.writeFile(targetFile, JSON.stringify(obj, null, 2), cb)
}

function getInfo(calle, cb) {
  var r = request.get('http://servicios.usig.buenosaires.gob.ar/normalizar')
    .query({ direccion: calle })
    .end(function(err, res){
      if (err) return cb(new Error('Not found'))
      if (!res || !res.body) return cb(new Error('Not found'))
      if (res.errorMessage) return cb(new Error(res.errorMessage))
      if (!res.body.direccionesNormalizadas.length) return cb(new Error('Not found'))
      var dir = res.body.direccionesNormalizadas[0]
      cb(null, dir)
    })
  return r
}

function getCoordenadas(dir, cb) {
  var query

  if (dir.tipo === 'calle_altura') {
    query = {
      'cod_calle': dir.cod_calle,
      'altura': dir.altura
    }
  } else if (dir.tipo === 'calle_y_calle'){
    query = {
      'cod_calle1': dir.cod_calle,
      'cod_calle2': dir.cod_calle_cruce
    }
  } else {
    return cb(new Error('Incompatible'))
  }

  var r = request.get('http://ws.usig.buenosaires.gob.ar/geocoder/2.2/geocoding')
    .query(query)
    .end(function(err, res){
      if (err) return cb(new Error('Not found'))
      if (!res || !res.body) return cb(new Error('Not found'))
      var c = JSON.parse(res.text.replace(/^\(|\)$/g, ''))
      cb(null, c)
    })
}

// [
//   'AV. RAFAEL OBLIGADO 7030',
// ].forEach(function(direccion){
//   getInfo(direccion, function(err, dir){
//     if (err) return console.error(err)
//     getCoordenadas(dir, function(err, coordenadas){
//       if (err) return console.error(err)
//       console.log(coordenadas)
//     })
//   })
// })

// return;

csvConverter.on('end_parsed', function(direcciones){
  var batch = new Batch

  batch.concurrency(3)

  direcciones.forEach(function(item){
    batch.push(function(done){
      console.log('push', item)
      getInfo(item.Domicilio, function(err, dir){
        if (err) {
          console.log(err)
          return done(err)
        }
        getCoordenadas(dir, function(err, coordenadas){
          if (err) {
            console.log(err)
            return done(err)
          }
          console.log('Coordenadas de "%s" encontradas.', item.Domicilio)
          item.Coordenadas = coordenadas
          done(null)
        })
      })
    })
  })

  batch.end(function(){
    console.log('listoo')
    console.log(arguments)
    save(direcciones, function(err) {
      if(err) return console.log(err)
      console.log('Lestoo.')
    })
  })
})

fileStream.pipe(csvConverter)
