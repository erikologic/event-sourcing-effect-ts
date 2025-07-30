import type { Fold } from "src/functionalEventSourcing/types"
import type { BillingDetailsAddedEvent, ItemAddedEvent, PaymentCompletedEvent } from "./events"
import type { Evolvers } from "./evolvers"
import type { NewCartState } from "./states"

type _state1 = ReturnType<
  Fold<NewCartState, [ItemAddedEvent, BillingDetailsAddedEvent], Array<Evolvers>>
>

type _state2 = ReturnType<
  Fold<NewCartState, [ItemAddedEvent, BillingDetailsAddedEvent, PaymentCompletedEvent], Array<Evolvers>>
>

type _stateInvalid = ReturnType<
  Fold<NewCartState, [PaymentCompletedEvent], Array<Evolvers>>
>
