import type { FoldEvolvers } from "src/functionalEventSourcing/types"
import type { BillingDetailsAddedEvent, ItemAddedEvent, PaymentCompletedEvent } from "./events"
import type { Evolvers } from "./evolvers"
import type { NewCartState } from "./states"

type _state1 = ReturnType<
  FoldEvolvers<NewCartState, [ItemAddedEvent, BillingDetailsAddedEvent], Array<Evolvers>>
>

type _state2 = ReturnType<
  FoldEvolvers<NewCartState, [ItemAddedEvent, BillingDetailsAddedEvent, PaymentCompletedEvent], Array<Evolvers>>
>

type _stateInvalid = ReturnType<
  FoldEvolvers<NewCartState, [PaymentCompletedEvent], Array<Evolvers>>
>
