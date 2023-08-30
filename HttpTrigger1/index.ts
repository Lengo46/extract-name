import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log("HTTP trigger function processed a request.")
  const inputText = req.query.inputText

  console.log("inputText", inputText)

  const patterns = [
    /I am (\w+)/i,
    /My name is (\w+)/i,
    /I'm (\w+)/i,
    /This is (\w+)/i,
    /Call me (\w+)/i,
    /Hi, I'm (\w+)/i,
    /Hello, my name is (\w+)/i,
    /Hey, call me (\w+)/i,
  ]

  let extractedName = null

  for (const pattern of patterns) {
    const match = inputText.match(pattern)
    if (match) {
      extractedName = match[1]
      break
    }
  }

  // If no name was extracted, check if the input consists of only letters (a-zA-Z)
  if (!extractedName && /^[a-zA-Z]+$/.test(inputText.trim())) {
    extractedName = inputText.trim()
  }

  console.log("result", extractedName)

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: {
      input: inputText,
      result: extractedName,
    },
  }
}

export default httpTrigger
