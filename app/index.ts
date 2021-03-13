import { getInput } from "./input"
import { getOutputText, setOutput } from "./output"
import { Output } from "./type/output"

const input = getInput()

const output: Output = {
  text: getOutputText(input.text)
}

setOutput(output)
