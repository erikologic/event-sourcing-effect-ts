import type { IDecide } from "src/functionalEventSourcing/types"
import type { Same, SelectFunctionByDiscriminantValueInParams } from "src/libs/utils"
import type {
  AddBillingDetailsCommand,
  AddItemToCartCommand,
  AddPaymentCompletedCommand,
  Commands,
  RemoveItemFromCartCommand
} from "./commands"
import type { BillingDetailsAddedEvent, ItemAddedEvent, ItemRemovedEvent, PaymentCompletedEvent } from "./events"
import type { NewCartState, OpenCartState, OpenCartWithBillingState, States } from "./states"

export type AddItemToCartDecider = IDecide<
  AddItemToCartCommand,
  NewCartState | OpenCartState | OpenCartWithBillingState,
  ItemAddedEvent
>

export type RemoveItemFromCartDecider = IDecide<
  RemoveItemFromCartCommand,
  OpenCartState | OpenCartWithBillingState,
  ItemRemovedEvent
>

export type AddBillingDetailsDecider = IDecide<
  AddBillingDetailsCommand,
  OpenCartState,
  BillingDetailsAddedEvent
>

export type AddPaymentCompletedDecider = IDecide<
  AddPaymentCompletedCommand,
  OpenCartWithBillingState,
  PaymentCompletedEvent
>

export type Deciders =
  | AddItemToCartDecider
  | RemoveItemFromCartDecider
  | AddBillingDetailsDecider
  | AddPaymentCompletedDecider

export type CommandsToStateToDecidersMap = {
  [TCommand in Commands["_tag"]]: {
    [TState in States["_tag"]]: Same<
      SelectFunctionByDiscriminantValueInParams<Deciders, "_tag", TCommand>,
      SelectFunctionByDiscriminantValueInParams<Deciders, "_tag", TState>
    >
  }
}
export type Map = CommandsToStateToDecidersMap extends
  Record<Commands["_tag"], Record<States["_tag"], IDecide<any, any, any>> | never> ? true : false
const _assertMap: Map = true
