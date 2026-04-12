import fs from 'fs'

type Key = string | number

export default class JsonStorage<Data> {
  #values: Record<Key, Data> = {}
  private readonly filename: string

  constructor(filename: string) {
    this.filename = filename
    this.load()
  }

  load() {
    try {
      const data = fs.readFileSync(this.filename, 'utf-8')
      this.#values = JSON.parse(data) ?? {}
    } catch (e) {
      console.error('failed to load data from file', e)
    }
  }

  save() {
    try {
      fs.writeFileSync(this.filename, JSON.stringify(this.#values))
    } catch (e) {
      console.error('failed to save data from file', e)
    }
  }

  get(key: Key): Data | undefined {
    return this.#values[key]
  }

  set(key: Key, value: Data) {
    this.#values[key] = value
    this.save()
  }

  getAll() {
    return this.#values
  }
}
