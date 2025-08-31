import boto3

session = boto3.session.Session()

bucket_name = "bucket1"

s3 = session.client(
    's3',
    endpoint_url="https://e24998ec6e65f30687f1c651a304b2df.r2.cloudflarestorage.com",
    aws_access_key_id="9380d2afaa3ccfec1175d32a6857efe8",
    aws_secret_access_key="68f6642f253b1afca49f56b59ccc98c086d672368faf5841f9aca33b33c22f0c"
)

paginator = s3.get_paginator("list_objects_v2")
for page in paginator.paginate(Bucket=bucket_name):
    if "Contents" in page:
        # Collect up to 1000 keys per batch
        objects_to_delete = [{"Key": obj["Key"]} for obj in page["Contents"]]
        
        # Delete batch
        response = s3.delete_objects(
            Bucket=bucket_name,
            Delete={"Objects": objects_to_delete}
        )
        print(f"Deleted {len(objects_to_delete)} objects")
