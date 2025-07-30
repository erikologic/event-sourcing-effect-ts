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

export type FoldEvents<
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
      FoldEvents<
        ResultState,
        [NextEvent, ...RestEvents],
        TEvolvers
      >
    > :
  never :
  TEvents extends [infer CurrentEvent extends IEvent, ...infer _RestEvents extends Array<IEvent>] ?
    ReturnType<FindEvolvers<TEvolvers, TState, CurrentEvent>> :
  never

export type FindDecider<
  TCommand extends ICommand,
  TState extends IState,
  TDeciders extends Array<IDecide<any, any, any>>
  > = Same<
    SelectFunctionByDiscriminantValueInParams<TDeciders[number], "_tag", TCommand["_tag"]>,
    SelectFunctionByDiscriminantValueInParams<TDeciders[number], "_tag", TState["_tag"]>
  > 

export type FoldCommands<
  TState extends IState,
  TCommands extends Array<ICommand>,
  TDeciders extends Array<IDecide<any, any, any>>,
  TEvolvers extends Array<IEvolve<any, any, any>>
> = (
  state: TState,
  commands: TCommands,
  deciders: TDeciders,
  evolvers: TEvolvers
) => TCommands extends
  [infer CurrentCommand extends ICommand, infer NextCommand extends ICommand, ...infer RestCommands extends Array<ICommand>] ?
    ReturnType<FindDecider<CurrentCommand, TState, TDeciders>> extends infer ResultEvents extends Array<IEvent> ?  
      ReturnType<FoldEvents<TState, [ResultEvents[number]], TEvolvers>> extends infer NextState extends IState ?
        ReturnType<FoldCommands<NextState, [NextCommand, ...RestCommands], TDeciders, TEvolvers>>
        : never
    : never 
  : TCommands extends
  [infer CurrentCommand extends ICommand,  ...infer RestCommands extends Array<ICommand>] ?
    ReturnType<FindDecider<CurrentCommand, TState, TDeciders>>  extends infer ResultEvents extends Array<IEvent> ?
      ReturnType<FoldEvents<TState, [ResultEvents[number]], TEvolvers>> 
      : never
    : never 

  