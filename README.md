# Serverless plugin foreach
This plugin, devolped by [Ynpact](https://www.ynpact.com), provide 2 operators for use in the serverless framework template. Those mimic the Terraform / Open Tofy count or foreach operators.

The **repeat** operator allows to repeat n time a yaml block. In this templated block you can use {{i}} anywhere and it will be replaced by the repeat-index.

The **foreach** operator allows you to repeat a yaml block, iterating on a list of string map. In the templated block, you can use {{i}} and {{i.\<key\>}} and it will be replaced repectively by the index and the value of the string at this key of the map.

## Setup
```npm install @ynpact/serverless-plugin-foreach --save-dev```

## Usage

### repeat operator
```${repeat(template, count, start = 0, pad = 0)}```

serverless.yml
```yaml
custom:
  template:
    bucket{{i}}:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: bucket_{{i}}
resources:
  - ${repeat(${self:custom.template}, 3}
```
resultat generé par l'opérateur :
```yaml
Resources:
  bucket0:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: bucket_0
  bucket1:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: bucket_1
  bucket2:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: bucket_2
```
You can optionnaly use the operator parameter start and pad to respectively start the counter from another value of 0 and pad to have the indice padded with x "0".
### foreach operator
```${repeat(template, list-of-string-value-map)}```

serverless.yml
```yaml
custom:
  template:
    bucket{{i}}:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: "{{i.name}}"
        AccessControl: "{{i.access}}"
  bucketParams:
    - name: my-public-bucket
      access: PublicRead
    - name: my-private-bucket
      access: Private
resources:
  - ${foreach(${self:custom.template}, ${self:custom.bucketParams}}
```
resultat generé par l'opérateur :
```yaml
Resources:
  bucket0:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: my-public-bucket
      AccessControl: PublicRead
  bucket1:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: my-private-bucket
      AccessControl: Private
```
## Test
```npm test```
## Bug report, enhancement and pull request
Do not hesitate to [contact us](mailto:contact@ynpact.com) for bug report, enhancement or pull request.

Under MIT license.