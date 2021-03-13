import { Input } from "./type/input"
import core from "@actions/core"

export const getInput = (): Input => {
  return {
    text: core.getInput("text")
  }
}
