import json
import pandas as pd

s1 = pd.Series([1,2,3,5])
print(s1)

def handler():
    hoge = {
        'message': 'hello world!!'
    }
    return {
        'statusCode': 200,
        'body': json.dumps(hoge)
    }
