import type { ICommand } from "../functionalEventSourcing/types"

export interface AddItemToCartCommand extends ICommand {
  _tag: "AddItemToCartCommand"
}

export interface RemoveItemFromCartCommand extends ICommand {
  _tag: "RemoveItemFromCartCommand"
}

export interface AddBillingDetailsCommand extends ICommand {
  _tag: "AddBillingDetailsCommand"
}

export type ExternalCommand =
  | AddItemToCartCommand
  | RemoveItemFromCartCommand
  | AddBillingDetailsCommand
