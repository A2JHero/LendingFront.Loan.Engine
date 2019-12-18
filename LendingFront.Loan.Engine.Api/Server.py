import pdb
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine
from json import dumps

dbPath="..\\LendingFront.Loan.Engine.DB\\LoanEngine.db"
#dbPath="LoanEngine.db"
db_connect = create_engine('sqlite:///'+dbPath)
app = Flask(__name__)
cors = CORS(app)
#app.config['CORS_HEADERS'] = 'Content-Type'
api = Api(app)


class LoanRequests(Resource):
    def get(self):
        #pdb.set_trace()
        conn = db_connect.connect() # connect to database
        query = conn.execute("select * from LoanRequests") # This line performs query and returns json result
        return {'loanRequests': [dict(zip(tuple (query.keys()) ,i)) for i in query.cursor]}
    
    def post(self):
        conn = db_connect.connect()
        #reqData = request.get_json(force=True)
        #print(request.json)
        #pdb.set_trace()
        BusinessTaxId = request.json['BusinessTaxId']
        BusinessName = request.json['BusinessName']
        OwnerSSN = request.json['OwnerSSN']
        OwnerName = request.json['OwnerName']
        OwnerEmail = request.json['OwnerEmail']
        Amount = int(request.json['Amount'])
        Status = ""
        if Amount >50000 : Status="Declined"
        if Amount ==50000 : Status="Undecided"
        if Amount <50000 : Status="Approved"
        
        try:
            insertQuery = "insert into LoanRequests values(null,'{0}','{1}','{2}','{3}', \
                             '{4}','{5}','{6}')".format(BusinessTaxId,BusinessName,OwnerSSN,OwnerName, OwnerEmail, Amount, Status)
            #pdb.set_trace()
            query = conn.execute(insertQuery)
        except:
            print('an error ocurred while inserting')
        else:
            print("Nothing went wrong")
        return {'status':'success'}

    
class LoanPayments(Resource):
    def get(self):
        conn = db_connect.connect()

        selectQuery = "select lr.BusinessName, lr.Status, lp.Id PaymentIdentification \
	                        ,lp.Amount PaymentAmount, lb.TotalPayments, (lr.Amount - lb.PaymentsValue) LoanBalance \
                            from LoanPayments lp \
                            inner join LoanRequests lr on lr.Id = lp.LoanId \
                            inner join ( \
	                            select lp.LoanId,COUNT(1) TotalPayments,SUM(Amount) PaymentsValue \
	                            from LoanPayments lp \
	                            GROUP BY lp.LoanId ) lb on lb.LoanId = lr.Id"
        try:
            #pdb.set_trace()
            query = conn.execute(selectQuery)
            #result = {'data': [dict(zip(tuple (query.keys()) ,i)) for i in query.cursor]}

            return {'loanPayments': [dict(zip(tuple (query.keys()) ,i)) for i in query.cursor]}
            #return jsonify(result)
        except:
            print('an error ocurred while inserting')
        else:
            print("Nothing went wrong")
    

class LoanPaymentsReport(Resource):
    @app.route('/paymentsReport/<dateFrom>/<dateTo>')
    def get(dateFrom,dateTo):
        #dFrom = dateFrom
        #dTo = dateTo

        conn = db_connect.connect()

        selectQuery = "select lr.BusinessName, lr.Status, lp.Id PaymentIdentification \
	                        ,lp.Amount PaymentAmount, lb.TotalPayments, (lr.Amount - lb.PaymentsValue) LoanBalance \
                            from LoanPayments lp \
                            inner join LoanRequests lr on lr.Id = lp.LoanId \
                            inner join ( \
	                            select lp.LoanId,COUNT(1) TotalPayments,SUM(Amount) PaymentsValue \
	                            from LoanPayments lp \
	                            GROUP BY lp.LoanId ) lb on lb.LoanId = lr.Id\
                            where date(lp.PaymentDate) between '" + dateFrom + "' and '" + dateTo +"'"
                                
        try:
            #pdb.set_trace()
            query = conn.execute(selectQuery)
            #result = {'data': [dict(zip(tuple (query.keys()) ,i)) for i in query.cursor]}

            return {'loanPayments': [dict(zip(tuple (query.keys()) ,i)) for i in query.cursor]}
            #return jsonify(result)
        except:
            print('an error ocurred while inserting')
        else:
            print("Nothing went wrong")


api.add_resource(LoanRequests, '/requests') # Route_1
api.add_resource(LoanPayments, '/payments') # Route_2


if __name__ == '__main__':
     app.run(host='0.0.0.0')