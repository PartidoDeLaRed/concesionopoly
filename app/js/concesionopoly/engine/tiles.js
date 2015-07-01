import merge from 'deepmerge'

const tiles = [
  {
    type: 'property'
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'luck',
    message: 'Un amigo de un amigo es diputado, y te consiguió la concesión por las Canchas de Tenis Parque Sarmiento gratis.',
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'extraordinary-tax',
    message: 'Firmaste un contrato trucho, el Gobierno de la Ciudad te cancela una Concesión.'
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'luck',
    message: 'Un amigo de un amigo es diputado, y te consiguió la concesión por las Canchas de Tenis Parque Sarmiento gratis.',
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'luck',
    message: 'Un amigo de un amigo es diputado, y te consiguió la concesión por las Canchas de Tenis Parque Sarmiento gratis.',
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'luck',
    message: 'Un amigo de un amigo es diputado, y te consiguió la concesión por las Canchas de Tenis Parque Sarmiento gratis.',
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'luck',
    message: 'Un amigo de un amigo es diputado, y te consiguió la concesión por las Canchas de Tenis Parque Sarmiento gratis.',
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  },
  {
    type: 'extraordinary-tax',
    message: 'Firmaste un contrato trucho, el Gobierno de la Ciudad te cancela una Concesión.'
  },
  {
    type: 'property',
    priceOptions: [ 1000, 3000 ],
    property: {
      name: 'Canchas de Tenis Parque Sarmiento',
      description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
      price: 1000
    }
  }
]

export default {
  get: i => merge({}, tiles[i]),
  size: tiles.length
}
