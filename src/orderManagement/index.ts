import type { Same, SelectFunctionByDiscriminantValueInParams } from "src/libs/utils"
import type { AddItemToCartCommand } from "./commands"
import type { Deciders } from "./deciders"
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
