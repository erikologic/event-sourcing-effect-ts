import type { IDecide } from "src/functionalEventSourcing/types"
import type { AssertMapShape, SelectFunctionByDiscriminantValueInParams } from "src/libs/utils"
import type {
  AddBillingDetailsCommand,
  AddItemToCartCommand,
  ExternalCommand,
  RemoveItemFromCartCommand
} from "./externalCommands"
import type { BillingDetailsAddedEvent, ItemAddedEvent, ItemRemovedEvent } from "./internalEvents"
import type { NewCartState, OpenCartState } from "./states"

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

export type CommandsToDecidersMap = {
  [K in ExternalCommand["_tag"]]: SelectFunctionByDiscriminantValueInParams<Deciders, "_tag", K>
}
const _assertDeciderMapShape: AssertMapShape<CommandsToDecidersMap, ExternalCommand["_tag"], Deciders> = true
