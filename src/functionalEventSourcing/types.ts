// https://thinkbeforecoding.com/post/2021/12/17/functional-event-sourcing-decider

import { number } from "effect/Equivalence"

export interface IEvent {
  _type: "event"
  _tag: string
}

export interface ICommand {
  _type: "command"
  _tag: string
}

export interface IState {
  _type: "state"
  _tag: string
}

export type IEvolve<
  TInputState extends IState,
  TInputEvent extends IEvent,
  TOutputState extends IState
> = (state: TInputState, event: TInputEvent) => TOutputState

export type IDecide<
  TCommand extends ICommand,
  TState extends IState,
  TEvent extends IEvent
> = (command: TCommand, state: TState) => Array<TEvent>

// TODO: fold
// TODO: engine
