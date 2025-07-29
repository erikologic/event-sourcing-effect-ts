import type { IState } from "../functionalEventSourcing/types"

export interface NewCartState extends IState {
  _tag: "NewCartState"
}

export interface OpenCartState extends IState {
  _tag: "OpenCartState"
}
