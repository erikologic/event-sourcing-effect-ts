import type { IEvolve } from "../functionalEventSourcing/types"
import type { BillingDetailsAddedEvent, ItemAddedEvent } from "./internalEvents"
import type { NewCartState, OpenCartState } from "./states"

export type openCartEvolve = IEvolve<
  NewCartState | OpenCartState,
  ItemAddedEvent,
  OpenCartState
>

export type openCartWithBillingDetailsEvolve = IEvolve<
  OpenCartState,
  BillingDetailsAddedEvent,
  OpenCartState
>
