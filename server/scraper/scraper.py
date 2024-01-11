import requests
from bs4 import BeautifulSoup
from datetime import datetime
import json

url = "https://dps.psx.com.pk/market-watch"

response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

table_rows = soup.find_all('tr')
data = []
timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

headers = [header.text for header in table_rows[0].find_all('th')]
desired_indexes = [0, 3, 4, 5, 6, 7, 8, 9, 10]

for row in table_rows[1:]:  # Skipping the header row
    columns = row.find_all('td')

    row_data = []
    for column in columns:
        if column.a:  # If the 'a' tag exists in the column
            row_data.append(column.a.text.strip())
        else:
            row_data.append(column.text.strip())

    desired_data = [row_data[i] for i in desired_indexes]
    desired_data.append(timestamp)
    data.append(desired_data)

desired_headers = [headers[i] for i in desired_indexes] + ['Timestamp']

# Create a dictionary with headers and data
result = {"headers": desired_headers, "data": data}

# Convert the dictionary to a JSON string
json_data = json.dumps(result, indent=2)

# Print the JSON data
print(json_data)
