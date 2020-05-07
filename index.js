const { termToNTriples } = require('@rdfjs/to-ntriples')

class TermMap {
  constructor (entries) {
    this.index = new Map()

    if (entries) {
      for (const [term, value] of entries) {
        this.set(term, value)
      }
    }
  }

  get size () {
    return this.index.size
  }

  clear () {
    this.index.clear()
  }

  delete (term) {
    return this.index.delete(termToNTriples(term))
  }

  * entries () {
    for (const [, { term, value }] of this.index) {
      yield [term, value]
    }
  }

  forEach (callback, thisArg) {
    for (const pair of this.entries()) {
      callback.call(thisArg, pair)
    }
  }

  get (term) {
    const item = this.index.get(termToNTriples(term))

    return item && item.value
  }

  has (term) {
    return this.index.has(termToNTriples(term))
  }

  * keys () {
    for (const [, { term }] of this.index) {
      yield term
    }
  }

  set (term, value) {
    const key = termToNTriples(term)

    this.index.set(key, { term, value })

    return this
  }

  * values () {
    for (const [, { value }] of this.index) {
      yield value
    }
  }

  [Symbol.iterator] () {
    return this.entries()[Symbol.iterator]()
  }
}

module.exports = TermMap
