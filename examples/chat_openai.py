"""Drop-in OpenAI Python SDK example for Wanyra API (https://api.star1age.cn/v1)."""
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://api.star1age.cn/v1",
    api_key=os.environ["STAR1AGE_API_KEY"],
)

response = client.chat.completions.create(
    model=os.environ.get("WANYRA_MODEL", "star1age-claude-sonnet-5.5"),
    messages=[
        {"role": "user", "content": "Write a 3-line haiku about unified AI gateways."}
    ],
)

print(response.choices[0].message.content)
print("Usage:", response.usage)
