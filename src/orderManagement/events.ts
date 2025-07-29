import type { IEvent } from "../functionalEventSourcing/types"

export interface ItemAddedEvent extends IEvent {
  _tag: "ItemAddedEvent"
}

export interface ItemRemovedEvent extends IEvent {
  _tag: "ItemRemovedEvent"
}

export interface BillingDetailsAddedEvent extends IEvent {
  _tag: "BillingDetailsAddedEvent"
}

export interface PaymentCompletedEvent extends IEvent {
  _tag: "PaymentCompletedEvent"
}

export type Events =
  | ItemAddedEvent
  | ItemRemovedEvent
  | BillingDetailsAddedEvent
  | PaymentCompletedEvent
