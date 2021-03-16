class ArraySet extends Set {
  add(arr) {
    super.add(arr.toString())
  }

  has(arr) {
    return super.has(arr.toString())
  }

  indexOf(arg) {
    return [...this].indexOf(arg.toString())
  }

  recent() {
    return Array.from(this).pop()
  }
}

const generate = (initial) => new Array(9).fill(initial)

export { ArraySet, generate }
