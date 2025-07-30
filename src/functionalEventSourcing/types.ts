// https://thinkbeforecoding.com/post/2021/12/17/functional-event-sourcing-decider

import type { Same, SelectFunctionByDiscriminantValueInParams } from "src/libs/utils"

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

export type FindEvolvers<
  TEvolvers extends Array<IEvolve<any, any, any>>,
  TState extends IState,
  TEvent extends IEvent
> = Same<
  SelectFunctionByDiscriminantValueInParams<TEvolvers[number], "_tag", TState["_tag"]>,
  SelectFunctionByDiscriminantValueInParams<TEvolvers[number], "_tag", TEvent["_tag"]>
>

export type FoldEvolvers<
  TState extends IState,
  TEvents extends Array<IEvent>,
  TEvolvers extends Array<IEvolve<any, any, any>>
> = (
  state: TState,
  events: TEvents,
  evolvers: TEvolvers
) => TEvents extends
  [infer CurrentEvent extends IEvent, infer NextEvent extends IEvent, ...infer RestEvents extends Array<IEvent>] ?
  ReturnType<FindEvolvers<TEvolvers, TState, CurrentEvent>> extends infer ResultState extends IState ? ReturnType<
      FoldEvolvers<
        ResultState,
        [NextEvent, ...RestEvents],
        TEvolvers
      >
    > :
  never :
  TEvents extends [infer CurrentEvent extends IEvent, ...infer _RestEvents extends Array<IEvent>] ?
    ReturnType<FindEvolvers<TEvolvers, TState, CurrentEvent>> :
  never

// TODO: engine
