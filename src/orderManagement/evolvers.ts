import type { Same, SelectFunctionByDiscriminantValueInParams } from "src/libs/utils"
import type { IEvolve } from "../functionalEventSourcing/types"
import type { BillingDetailsAddedEvent, InternalEvents, ItemAddedEvent, ItemRemovedEvent } from "./internalEvents"
import type { NewCartState, OpenCartState, States } from "./states"

export type OpenCartEvolve = IEvolve<
  NewCartState | OpenCartState,
  ItemAddedEvent | ItemRemovedEvent,
  OpenCartState
>

export type OpenCartWithBillingDetailsEvolve = IEvolve<
  OpenCartState,
  BillingDetailsAddedEvent,
  OpenCartState
>

export type Evolvers =
  | OpenCartEvolve
  | OpenCartWithBillingDetailsEvolve

export type EventsToStateToEvolversMap = {
  [K in InternalEvents["_tag"]]: {
    [S in States["_tag"]]: Same<
      SelectFunctionByDiscriminantValueInParams<Evolvers, "_tag", K>,
      SelectFunctionByDiscriminantValueInParams<Evolvers, "_tag", S>
    >
  }
}

export type Map = EventsToStateToEvolversMap extends
  Record<InternalEvents["_tag"], Record<States["_tag"], IEvolve<any, any, any>> | never> ? true : false
const _assertMap: Map = true
