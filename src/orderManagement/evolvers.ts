import type { Same, SelectFunctionByDiscriminantValueInParams } from "src/libs/utils"
import type { IEvolve } from "../functionalEventSourcing/types"
import type {
  BillingDetailsAddedEvent,
  Events,
  ItemAddedEvent,
  ItemRemovedEvent,
  PaymentCompletedEvent
} from "./events"
import type { NewCartState, OpenCartState, OpenCartWithBillingState, OrderPlacedState, States } from "./states"

export type OpenCartEvolve = IEvolve<
  NewCartState | OpenCartState,
  ItemAddedEvent | ItemRemovedEvent,
  OpenCartState
>

export type OpenCartWithBillingDetailsEvolve = IEvolve<
  OpenCartState,
  BillingDetailsAddedEvent,
  OpenCartWithBillingState
>

export type AddPaymentCompletedEvolve = IEvolve<
  OpenCartWithBillingState,
  PaymentCompletedEvent,
  OrderPlacedState
>

export type Evolvers =
  | OpenCartEvolve
  | OpenCartWithBillingDetailsEvolve
  | AddPaymentCompletedEvolve

export type EventsToStateToEvolversMap = {
  [TEvent in Events["_tag"]]: {
    [TStates in States["_tag"]]: Same<
      SelectFunctionByDiscriminantValueInParams<Evolvers, "_tag", TEvent>,
      SelectFunctionByDiscriminantValueInParams<Evolvers, "_tag", TStates>
    >
  }
}

export type Map = EventsToStateToEvolversMap extends
  Record<Events["_tag"], Record<States["_tag"], IEvolve<any, any, any>> | never> ? true : false
const _assertMap: Map = true
