import json

def handler():
    hoge = {
        'message': 'hello world!!'
    }
    return {
        'statusCode': 200,
        'body': json.dumps(hoge)
    }
