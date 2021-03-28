import { Output } from "./type/output"
import * as core from "@actions/core"

export const getOutputText = (inputText: string): string => {
  return `Text: ${inputText}`
}

export const setOutput = (output: Output): void => {
  core.setOutput("text", output.text)
}
