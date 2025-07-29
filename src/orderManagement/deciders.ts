import type { IDecide } from "src/functionalEventSourcing/types"
import type { Same, SelectFunctionByDiscriminantValueInParams } from "src/libs/utils"
import type { AddBillingDetailsCommand, AddItemToCartCommand, Commands, RemoveItemFromCartCommand } from "./commands"
import type { BillingDetailsAddedEvent, ItemAddedEvent, ItemRemovedEvent } from "./events"
import type { NewCartState, OpenCartState, States } from "./states"

export type AddItemToCartDecider = IDecide<
  AddItemToCartCommand,
  NewCartState | OpenCartState,
  ItemAddedEvent
>

export type RemoveItemFromCartDecider = IDecide<
  RemoveItemFromCartCommand,
  OpenCartState,
  ItemRemovedEvent
>

export type AddBillingDetailsDecider = IDecide<
  AddBillingDetailsCommand,
  OpenCartState,
  BillingDetailsAddedEvent
>

export type Deciders =
  | AddItemToCartDecider
  | RemoveItemFromCartDecider
  | AddBillingDetailsDecider

export type CommandsToStateToDecidersMap = {
  [TCommand in Commands["_tag"]]: {
    [TState in NewCartState["_tag"] | OpenCartState["_tag"]]: Same<
      SelectFunctionByDiscriminantValueInParams<Deciders, "_tag", TCommand>,
      SelectFunctionByDiscriminantValueInParams<Deciders, "_tag", TState>
    >
  }
}
export type Map = CommandsToStateToDecidersMap extends
  Record<Commands["_tag"], Record<States["_tag"], IDecide<any, any, any>> | never> ? true : false
const _assertMap: Map = true
