const villainsList = [{
  name: 'Captain Hook',
  movie: 'Peter Pan',
  slug: 'captain-hook',
}, {
  name: 'Cruella de Vil',
  movie: 'One Hundred and One Dalmatians',
  slug: 'cruella-de-vil',
}]

const singleVillain = {
  name: 'Gaston',
  movie: 'Beauty and the Beast',
  slug: 'gaston',
}

const singleNotVillain = {
  movie: 'Beauty and the Beast',
  slug: 'gaston',
}

const wrongVillain = {
  name: 'Al',
  movie: 'Toy Story',
  slug: 123456789
}

module.exports = { villainsList, singleVillain, singleNotVillain, wrongVillain }
