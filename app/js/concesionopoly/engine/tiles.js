import merge from 'deepmerge'

const tiles = [
  {
    type: 'property'
  },
  {
    type: 'property',
    priceOptions: [ 75000, 35000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '12 canchas de tenis.|Alquilar una cancha por hora cuesta $160.',
      price: 35000
    }
  },
  {
    type: 'luck',
    message: 'Tu contacto en el Gobierno te avisa que hay una concesión que no tiene ofertas y consigue un contrato a bajo costo por 99 años.',
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 35000
    }
  },
  {
    type: 'property',
    priceOptions: [ 177000, 282000 ],
    property: {
      name: 'Estacionamiento Centro Cultural San Martín',
      description: 'Cuenta con 260 plazas de estacionamiento.|Está abierto las 24 hs.|Sus tarifas son: nocturna $30 el auto y $36 la camioneta; diurna $24 el auto y $30 la camioneta.',
      price: 177000
    }
  },
  {
    type: 'extraordinary-tax',
    message: 'Perdés la concesión por no seguir la normativa vigente.'
  },
  {
    type: 'property',
    priceOptions: [ 14000, 31000 ],
    property: {
      name: 'Estacionamiento Plazoleta Coroneles Pitta Pedernera',
      description: 'Está abierto las 24 hs.|Sus tarifas son: hora $39; Estadía de 12 hs $160; Estadía de 24 hs $160.',
      price: 14000
    }
  },
  {
    type: 'property',
    priceOptions: [ 45000, 90000 ],
    property: {
      name: 'Autódromo de la Ciudad',
      description: 'Superficie total techada de 3500 mts2.|160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales.|Estacionamiento para 50 mil autos.',
      price: 45000
    }
  },
  {
    type: 'luck',
    message: 'El gobierno nacional decreta facilidades para blanquear dólares, decidís poner un boliche en costanera.',
    property: {
      name: 'Canchas de fútbol X BAJO AUTOPISTA 1 - 115B/116',
      description: 'Alquiler de cancha por hora $500 aproximadamente.|7 canchas de césped sintetico.|5 canchas de tenis de polvo de labrillo, cubieras.',
      price: 35000
    }
  },
  {
    type: 'property',
    priceOptions: [ 35000, 60000 ],
    property: {
      name: 'Canchas de fútbol X BAJO AUTOPISTA 1 - 115B/116',
      description: 'Alquiler de cancha por hora $500 aproximadamente.|7 canchas de césped sintetico.|5 canchas de tenis de polvo de labrillo, cubieras.',
      price: 35000
    }
  },
  {
    type: 'property',
    priceOptions: [ 12000, 20000 ],
    property: {
      name: 'Baulera de Palos y Carros del Golf Municipal',
      description: 'Guardar los palos cuesta aproximadamente $200 por mes.',
      price: 12000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1400000, 2550000 ],
    property: {
      name: 'Zoologico de Buenos Aires',
      description: 'Entrada para mayores de 12 años: $150.|18 hectareas en Palermo, donde el m2 vale $2.829,00 dolares, aproximadamente.',
      price: 1400000
    }
  },
  {
    type: 'property',
    priceOptions: [ 105000, 6500 ],
    property: {
      name: 'Estacionamiento Bajo Autopista 6 603 A',
      description: 'Cuenta con 100 plazas de estacionamiento.|Está abierto las 24 hs.|Sus tarifas son: autos hora $10; estadía 12 hs $50; estadía 24 hs $70.',
      price: 6500
    }
  },
  {
    type: 'property',
    priceOptions: [ 75000, 120000 ],
    property: {
      name: 'Restaurant Rodizio',
      description: 'Precio Menú $335 sin bebidas.|300 cubiertos.|5 salones para eventos para 710 cubiertos.',
      price: 75000
    }
  },
  {
    type: 'property',
    priceOptions: [ 80000, 110000 ],
    property: {
      name: 'Restaurant Happening',
      description: 'Precio promedio $350 por persona.|200 cubiertos.|Más de 50 años de funcionamiento, mismos dueños que Gardiner.',
      price: 80000
    }
  },
  {
    type: 'property',
    priceOptions: [ 55000, 20000 ],
    property: {
      name: 'Restaurant El Palacio de la Papa Frita',
      description: 'Precio promedio $250 por persona.|200 cubiertos.|Empresa con 4 sucursales.',
      price: 55000
    }
  },
  {
    type: 'luck',
    message: 'Sale a concurso una concesión sin indexación por inflación, el canon es irrisorio y la conseguís sin problemas.',
    property: {
      name: 'Restaurant Gardiner',
      description: 'Precio promedio $340 por persona.|250 cubiertos.|Fundado en 1989, mismos dueños que Happening.',
      price: 60000
    }
  },
  {
    type: 'property',
    priceOptions: [ 60000, 90000 ],
    property: {
      name: 'Restaurant Gardiner',
      description: 'Precio promedio $340 por persona.|250 cubiertos.|Fundado en 1989, mismos dueños que Happening.',
      price: 60000
    }
  },
  {
    type: 'luck',
    message: 'A tu cuñado le deben un favor y te adjudican una concesión.',
    property: {
      name: 'Restaurant La Perla',
      description: 'Precio promedio $100 por persona.|Más de 150 cubiertos.|Empresa con 3 sucursales.',
      price: 5000
    }
  },
  {
    type: 'property',
    priceOptions: [ 5000, 35000 ],
    property: {
      name: 'Restaurant La Perla',
      description: 'Precio promedio $100 por persona.|Más de 150 cubiertos.|Empresa con 3 sucursales.',
      price: 5000
    }
  },
  {
    type: 'property',
    priceOptions: [ 50200, 32500 ],
    property: {
      name: 'Parrilla Siga la Vaca',
      description: 'Precio cena $225 por persona.|200 cubiertos.|Empresa con 6 sucursales',
      price: 32500
    }
  },
  {
    type: 'property',
    priceOptions: [ 14000, 7000 ],
    property: {
      name: 'Cafe del Centro Cultural Recoleta',
      description: 'Un café cuesta $25.|Lugar para 40 personas.',
      price: 7000
    }
  },
  {
    type: 'property',
    priceOptions: [ 26000, 58000 ],
    property: {
      name: 'Disco Tequila',
      description: 'Entrada promedio $200.|Capacidad 300 personas.',
      price: 26000
    }
  },
  {
    type: 'property',
    priceOptions: [ 81000, 121000 ],
    property: {
      name: 'Discoteca Pacha',
      description: 'Capacidad para 3000 personas.|Es un grupo con 18 discotecas alrededor del mundo.|Entrada para noche común $150 aproximadamente.',
      price: 81000
    }
  },
  {
    type: 'property',
    priceOptions: [ 8000, 25000 ],
    property: {
      name: 'Estacionamiento Catalinas Sur',
      description: 'Cuenta con 100 plazas de estacionamiento.|Está abierto las 24 hs.|Sus tarifas para autos son: $30; Estadía 12 hs $100; Estadía 24 hs $150; durante partidos de Boca $120.',
      price: 8000
    }
  },
  {
    type: 'property',
    priceOptions: [ 3200, 55000 ],
    property: {
      name: 'Club Hipico Argentino',
      description: 'Membrecía $350.|8 clases $1.500.|Mantener al caballo $4.500.',
      price: 3200
    }
  },
  {
    type: 'property',
    priceOptions: [ 132000, 49000 ],
    property: {
      name: 'Buenos Aires Design',
      description: 'Posee 140 espacios de estacionamiento.|Cuenta con 72 locales.',
      price: 49000
    }
  },
  {
    type: 'property',
    priceOptions: [ 197000, 520000 ],
    property: {
      name: 'Complejo Costa Salguero',
      description: 'Superficie techada 20.000m2 en 17 hectareas de espacio.|Cuenta con 23 subconcesiones, entre los que se cuentan 4 estacionamientos, 2 centros de convenciones, 3 salones de conferencias y un hotel.',
      price: 197000
    }
  },
  {
    type: 'property',
    priceOptions: [ 27000, 56000 ],
    property: {
      name: 'Resto Pizza Banana',
      description: 'Precio promedio $280 por persona.|Salón de 750m2|Espacio para 1200 personas.',
      price: 27000
    }
  },
  {
    type: 'property',
    priceOptions: [ 51000, 23000 ],
    property: {
      name: 'Kartodromo Argentino',
      description: 'Promedio de alquiler de karting $250.|Derecho de pista $300',
      price: 23000
    }
  },
  {
    type: 'luck',
    message: 'Tu concesión pasa desapercibida otra vez mas y el gobierno de turno te renueva sin preguntar.',
    property: {
      name: 'Kartodromo Argentino',
      description: 'Promedio de alquiler de karting $250.|Derecho de pista $300',
      price: 23000
    }
  },
  {
    type: 'property',
    priceOptions: [ 64000, 22000 ],
    property: {
      name: 'Golf Club Jose Jurado',
      description: 'Cancha con 18 hoyos.|Cuota de ingreso $1.000.|Cuota mensual $150.',
      price: 64000
    }
  },
  {
    type: 'extraordinary-tax',
    message: 'Se hace público el canon que pagás mensualmente a causa del Concesionopoly, perdés una concesión.'
  },
  {
    type: 'property',
    priceOptions: [ 16000, 30000 ],
    property: {
      name: 'Playa de estacionamiento X 1-110B',
      description: 'Aproximadamente $35 la hora.|Entran aproximandamente 100 autos.',
      price: 16000
    }
  }
]

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4()
}

tiles.forEach((tile) => {
  if (tile.property) {
    tile.property.id = guid()

    tile.property.description = tile.property.description
      .split('|').map(s => `<p>${s}</p>`).join('')
  }
})

export default {
  get: i => merge({}, tiles[parseInt(i, 10)]),
  size: tiles.length
}
