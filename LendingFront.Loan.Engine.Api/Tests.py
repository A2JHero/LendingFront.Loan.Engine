import requests

res = requests.post('http://localhost:5000/requests', json={
	'BusinessTaxId':'12-3156789',
	'BusinessName':'B1',
	'OwnerSSN':'111-11-1111',
	'OwnerName':'John Doe',
	'OwnerEmail':'johndoe@email.com',
	'Amount': 25000
})
if res.ok:  print(res.json())
else: print("error_res")

res2 = requests.get('http://localhost:5000/requests')
if res2.ok:  print(res2.json())
else: print("error_res2")

res3 = requests.get('http://localhost:5000/payments')
if res3.ok:  print(res3.json())
else: print("error_res3")

res4 = requests.get('http://localhost:5000/paymentsReport/2019-01-01/2019-10-31')
if res4.ok:  print(res4.json())
else: print("error_res4")