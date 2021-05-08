const villains = require('./villains')

villains.forEach(villain => {
  console.log(`('${villain.name}', '${villain.movie}', '${villain.slug}' )`)
})
