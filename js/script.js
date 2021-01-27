// output HTML
$(document).ready(function () {

  // data

  const fieldCodes = [
    'W', 'U', 'B', 'R', 'G'
    // colors [W = White; U = Blue; B = Black; R = Red; G = Green]
  ]

  // type
  const cardTypes = [
    'terre',
    'creature',
    'incantesimi',
    'artefatti',
    'instantanei',
    'stregonerie'
  ]

  const powerValues = [1, 2, 3, 4, 5]

  // Abbiamo creato un oggetto di oggetti, come riferimento
  // di una edizione. Se ad esempio scrivo editions['SP']
  // allora otterrò tutto un oggetto che descrive
  // con più dettagli l'edizione.
  // come oggetto di oggetti, può essere navigato solo con il for-in
  const editions = {

    'BL': {
      edition: 'Boolean',
      rarity: 'blue'
    },

    'SP': {
      edition: 'Special',
      rarity: 'red'
    },

    'PK': {
      edition: 'Pokemon',
      rarity: 'yellow'
    }

  }

  const cards = [{

    // Prima carta ---------------------------------------------------------------
    cardName: 'Grizzly Bears',
    cost: {
      genericCostNumber: 1,
      costFields: [ // colors array con riferimento a fieldCodes
        fieldCodes[0],  // 'W',  - un suo riferimento
        fieldCodes[2]   // 'B'
      ],
    },
    picture: 'images/i.png',
    cardType: cardTypes[1],
    cardObject: 'Bear',
    editionType: editions['BL'],
    description: 'Lorem ipsum',
    story: 'Naltro Lorem Ipsum',
    score: {
      power: 2,  // filtrarlo per power
      toughness: 2
      }
    },
    {
      // Seconda carta -----------------------------------------------------------
      cardName: 'Sviluppatore guerriero',
      cost: {
        genericCostNumber: 3,
        costFields: [ // colors array con riferimento a fieldCodes
          fieldCodes[0],
        ],
      },
      picture: 'images/g.png',  // da inserire immagine
      cardType: cardTypes[1],
      cardObject: 'Bear',
      editionType: editions['BL'],
      description: 'Lo sviluppatore guerriero spezza i byte in bit!',
      story: 'Lo sviluppatore guerriero è una forma di essere umano evoluto.',
      score: {
        power: 5,  // r
        toughness: 3
      }
    },
    {
      // Terza carta -------------------------------------------------------------
      cardName: 'Dave',
      cost: {
        genericCostNumber: 1,
        costFields: [ // colors array con riferimento a fieldCodes
          fieldCodes[0],
          fieldCodes[1]
        ],
      },
      picture: 'images/g.png',  // da inserire immagine
      cardType: cardTypes[3],
      cardObject: 'Beard',
      editionType: editions['BL'],
      description: 'Dave ha voglia di vivere pari a 0',
      story: 'Dave non fa niente. E\' un essere inutile',
      score: {
        power: 1,  // r
        toughness: 1
      }
    },
    {
      // Quarta carta ------------------------------------------------------------
      cardName: 'Pikachu',
      cost: {
        genericCostNumber: 5,
        costFields: [ // colors array con riferimento a fieldCodes
          fieldCodes[2],
          fieldCodes[3]
        ],
      },
      picture: 'images/g.png',  // da inserire immagine
      cardType: cardTypes[1],
      cardObject: 'Pokemon',
      editionType: editions['PK'],
      description: 'Pikachu ha dei poteri ma mi sa che dentro magic non c\'entra assolutamente niente',
      story: 'Un essere in forte disagio in un mondo che non è il suo',
      score: {
        power: 4,  // r
        toughness: 4
      }
    },
    {
      // Quinta carta ------------------------------------------------------------
      cardName: 'Piccolo',
      cost: {
        genericCostNumber: 4,
        costFields: [ // colors array con riferimento a fieldCodes
          fieldCodes[4]
        ],
      },
      picture: 'images/g.png',  // da inserire immagine
      cardType: cardTypes[6],
      cardObject: 'Creatura Tenera',
      editionType: editions['SP'],
      description: 'Piccolo interisce tutti. Anche chi non ha un cuore',
      story: 'Piccolo è l\'essere più tenero di tutti i pianeti',
      score: {
        power: 5,  // r
        toughness: 1
      }
    },
  ]

  console.log(cards);
  // end cards array ---------------------------------------------------------------------

  // metods
  // function to filter by power
  function filterByPower(powerValue, array){
    return array.filter((element) => {
      return element.score.power === powerValue
    })
  }

  // function to filter by type
  function filterByCardType(cardTypeValue, array) {
    return array.filter((element) => {
      return element.cardType === cardTypeValue
    })
  }

  // function to print on HTML an array element
  function render(DOMElementId, array) {
    const cardListHTMLElement = document.getElementById(DOMElementId)
    cardListHTMLElement.innerHTML += ''

    array.forEach((element) => {
      cardListHTMLElement.innerHTML += `
        <li>
          <div>
            <h2>Nome carta: ${element.cardName}</h2>
            <h4>Tipo carta: ${element.cardType}</h4>
            ${element.cardName}
          </div>
        </li>
      `
    })
  }

  function renderSelect(DOMElementId, array) {
    const select = document.getElementById(DOMElementId)

    array.forEach((element) => {
      select.innerHTML += `
        <option value="${element}"><${element}</option>
      `
    });
  }

  // OUTPUT 
  render('listaCarte, cards')
  renderSelect('powerSelect', powerValues)
  renderSelect('cardTypeSelect', cardTypes)

  // eventi da registrare
  $('#powerSelect').change(function () {
    if (isNaN($(this).val())) {
      alert('Scegli un valore numerico')
    } else {
      const selectValue = parseInt($(this).val())
      const filteredArray = filterByPower(selectValue, cards)

      render('listaCarte', filteredArray)
    }
  })

  $('#cardTypeSelect').change(function () {
    const selectValue = $(this).val()
    const filteredArray = filterByCardType(selectValue, cards)

    render('listaCarte', filteredArray)
  })

  $('#resetButton').click(function () {
    render ('listaCarte', cards)
  })
}); // fine document ready
