import { getOutputText } from "./output"

describe("getOutputText", () => {
  it(`given empty text, get expected text back`, async () => {
    expect(getOutputText("")).toEqual("Text: ")
  })
  it(`given some text, get expected text back`, async () => {
    expect(getOutputText("yo")).toEqual("Text: yo")
  })
})
