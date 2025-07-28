import { Match, Schema } from "effect"
import * as Effect from "effect/Effect"

const User = Schema.TaggedStruct("User", {
  name: Schema.String,
  age: Schema.Number
})
type IUser = Schema.Schema.Type<typeof User>

const john = User.make({ name: "John", age: 44 })

const Pet = Schema.TaggedStruct("Pet", {
  name: Schema.String,
  age: Schema.Number
})
type IPet = Schema.Schema.Type<typeof Pet>

const dog = Pet.make({ name: "Dog", age: 5 })

type IEntities = IUser | IPet

const engine = Match.type<IEntities>().pipe(
  Match.tag("Pet", (input) => {
    console.log(`Pet: ${input.name}, Age: ${input.age}`)
  }),
  Match.tag("User", (input) => {
    console.log(`User: ${input.name}, Age: ${input.age}`)
  }),
  Match.exhaustive
)

console.log(engine(dog))
