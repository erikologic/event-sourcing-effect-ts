import type { IEvent, IEvolve, IState } from "src/functionalEventSourcing/types"
import type { Same, SelectFunctionByDiscriminantValueInParams } from "src/libs/utils"
import type { AddItemToCartCommand } from "./commands"
import type { Deciders } from "./deciders"
import type { BillingDetailsAddedEvent, ItemAddedEvent, PaymentCompletedEvent } from "./events"
import type { Evolvers } from "./evolvers"
import type { NewCartState } from "./states"

type step1 = NewCartState
type step2 = AddItemToCartCommand
type step3 = Same<
  SelectFunctionByDiscriminantValueInParams<Deciders, "_tag", step1["_tag"]>,
  SelectFunctionByDiscriminantValueInParams<Deciders, "_tag", step2["_tag"]>
>
type step4 = ReturnType<step3>[number]
type step5 = Same<
  SelectFunctionByDiscriminantValueInParams<Evolvers, "_tag", step1["_tag"]>,
  SelectFunctionByDiscriminantValueInParams<Evolvers, "_tag", step4["_tag"]>
>
type step6 = ReturnType<step5>

type events = [ItemAddedEvent, BillingDetailsAddedEvent, PaymentCompletedEvent]
type state0 = NewCartState
type state1 = ReturnType<
  Same<
    SelectFunctionByDiscriminantValueInParams<Evolvers, "_tag", state0["_tag"]>,
    SelectFunctionByDiscriminantValueInParams<Evolvers, "_tag", events[0]["_tag"]>
  >
>
type state2 = ReturnType<
  Same<
    SelectFunctionByDiscriminantValueInParams<Evolvers, "_tag", state1["_tag"]>,
    SelectFunctionByDiscriminantValueInParams<Evolvers, "_tag", events[1]["_tag"]>
  >
>
type _state3 = ReturnType<
  Same<
    SelectFunctionByDiscriminantValueInParams<Evolvers, "_tag", state2["_tag"]>,
    SelectFunctionByDiscriminantValueInParams<Evolvers, "_tag", events[2]["_tag"]>
  >
>

type FindEvolvers<TEvolvers extends Array<IEvolve<any, any, any>>, TState extends IState, TEvent extends IEvent> = Same<
  SelectFunctionByDiscriminantValueInParams<TEvolvers[number], "_tag", TState["_tag"]>,
  SelectFunctionByDiscriminantValueInParams<TEvolvers[number], "_tag", TEvent["_tag"]>
>

type Fold<TState extends IState, TEvents extends Array<IEvent>, TEvolvers extends Array<IEvolve<any, any, any>>> = (
  state: TState,
  events: TEvents,
  evolvers: TEvolvers
) => TEvents extends [infer CurrentEvent extends IEvent, ...infer RestEvents] ? [
    ReturnType<FindEvolvers<TEvolvers, TState, CurrentEvent>>,
    RestEvents,
    TEvolvers
  ] :
  never

type _result = ReturnType<
  Fold<NewCartState, [ItemAddedEvent, BillingDetailsAddedEvent], Array<Evolvers>>
>
