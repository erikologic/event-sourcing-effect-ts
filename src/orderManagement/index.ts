import type { FindDecider, FindEvolvers, FoldCommands, FoldEvents } from "src/functionalEventSourcing/types"
import type { BillingDetailsAddedEvent, ItemAddedEvent, PaymentCompletedEvent } from "./events"
import type { Evolvers } from "./evolvers"
import type { NewCartState } from "./states"
import { Deciders } from "./deciders"
import { AddBillingDetailsCommand, AddItemToCartCommand, AddPaymentCompletedCommand } from "./commands"

// e.g. folding events
{
  type _stateCase1 = ReturnType<
    FoldEvents<NewCartState, [ItemAddedEvent, BillingDetailsAddedEvent], Array<Evolvers>>
  >
  type _stateCase2 = ReturnType<
    FoldEvents<NewCartState, [ItemAddedEvent, BillingDetailsAddedEvent, PaymentCompletedEvent], Array<Evolvers>>
  >

  type _stateInvalidCase = ReturnType<
    FoldEvents<NewCartState, [PaymentCompletedEvent], Array<Evolvers>>
  >
}

// _stateCase2 explained 
{
  type _events = [ItemAddedEvent, BillingDetailsAddedEvent, PaymentCompletedEvent]
  type _state1 = NewCartState
  type _evolver1 = FindEvolvers< Array<Evolvers>, _state1, _events[0]>
  type _state2 = ReturnType<_evolver1>
  type _evolver2 = FindEvolvers< Array<Evolvers>, _state2, _events[1]>
  type _state3 = ReturnType<_evolver2>
  type _evolver3 = FindEvolvers< Array<Evolvers>, _state3, _events[2]>
  type _state4 = ReturnType<_evolver3>
}

// e.g. folding commands (aka end-to-end cases)
{
  type _e2eCase1 = ReturnType<FoldCommands<NewCartState, [AddItemToCartCommand], Array<Deciders>,  Array<Evolvers>>>
  type _e2eCase2 = ReturnType<FoldCommands<NewCartState, [AddItemToCartCommand, AddBillingDetailsCommand, AddPaymentCompletedCommand], Array<Deciders>,  Array<Evolvers>>>
}

// _e2eCase2 explained
{
  type _commands = [AddItemToCartCommand, AddBillingDetailsCommand, AddPaymentCompletedCommand]
  type _state1 = NewCartState
  type _decider1= FindDecider<_commands[0], _state1, Array<Deciders>>
  type _event1 = ReturnType<_decider1>[number]
  type _state2 = ReturnType<FoldEvents<_state1, [_event1], Array<Evolvers>>>
  type _decider2 = FindDecider<_commands[1], _state2, Array<Deciders>>
  type _event2 = ReturnType<_decider2>[number]
  type _state3 = ReturnType<FoldEvents<_state2, [_event2], Array<Evolvers>>>
  type _decider3 = FindDecider<_commands[2], _state3, Array<Deciders>>
  type _event3 = ReturnType<_decider3>[number]
  type _state4 = ReturnType<FoldEvents<_state3, [_event3], Array<Evolvers>>>
}

