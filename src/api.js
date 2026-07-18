async function callOpenAI(answers, apiKey) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content: "You are SchemeSeva, an expert on Indian government welfare schemes. Return ONLY a valid JSON array with no markdown or extra text. Every object must contain: name, type ('Central' or 'State'), benefit, eligibility, howToApply, tags. Return only real currently active schemes matching the user's profile.",
        },
        {
          role: 'user',
          content: `Find government schemes for:
State: ${answers.state}
Category: ${answers.category}
Age: ${answers.age}
Monthly Income: ${answers.income}
Gender: ${answers.gender}

Return ONLY the JSON array.`,
        },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error('REQUEST_FAILED')
  }

  const data = await response.json()

  try {
    return JSON.parse(data.choices[0].message.content)
  } catch {
    const error = new Error('PARSE_FAILED')
    error.code = 'PARSE_FAILED'
    throw error
  }
}

export default callOpenAI
