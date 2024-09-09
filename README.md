# Serverless plugin foreach
This plugin, devolped by [Ynpact](https://www.ynpact.com), provide 3 operators for use in the serverless framework template. Those mimic the Terraform / Open Tofy count, foreach and ternary operators. [See our blog post](https://www.ynpact.com/serverless-plugin-en/)

The **repeat** operator allows to repeat n time a yaml block. In this templated block you can use {{i}} anywhere and it will be replaced by the repeat-index.

The **foreach** operator allows you to repeat a yaml block, iterating on a list of string map. In the templated block, you can use {{i}} and {{i.\<key\>}} and it will be replaced repectively by the index and the value of the string at this key of the map.

The **ternary** operator mimic the ternary if/else value evaluation.

> [!IMPORTANT]  
> If you use the plugin with serverless v4, you can get issues using the plugin by referencing template and parameters to yml block **INSIDE** the serverless.yml.
> Indeed, it seems that allthough serverless framework state the opposite, there are difference in the plugin interface and it makes problem.
> 
> **However, and fortunately, this plugin can still be used with serverless v4 using the ${file(...):...} syntax, as stated as a tips at the end of this README** (and this works also with v3)


## Setup
```npm install @ynpact/serverless-plugin-foreach --save-dev```

## Usage

### repeat operator
```${repeat(template, count, start = 0, pad = 0)}```

serverless.yml
```yaml
plugins:
  - '@ynpact/serverless-plugin-foreach'
custom:
  template:
    bucket{{i}}:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: bucket_{{i}}
resources:
  - ${repeat(${self:custom.template}, 3)}
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
```${foreach(template, list-of-string-value-map)}```

serverless.yml
```yaml
plugins:
  - '@ynpact/serverless-plugin-foreach'
custom:
  template:
    bucket{{i}}:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: "{{i.name}}"
        PublicAccessBlockConfiguration:
          BlockPublicAcls: "{{i.blockPublicAcls}}"
  bucketParams:
    - name: my-public-bucket
      blockPublicAcls: false
    - name: my-private-bucket
      blockPublicAcls: true
resources:
  - ${foreach(${self:custom.template}, ${self:custom.bucketParams})}
```
resultat generé par l'opérateur :
```yaml
Resources:
  bucket0:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: my-public-bucket
      PublicAccessBlockConfiguration:
        BlockPublicAcls: false
  bucket1:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: my-private-bucket
      PublicAccessBlockConfiguration:
        BlockPublicAcls: true
```
### ternary operator
```${ternary(valueToTest, expectedValue, returnedValueIfEqual, returnedValueIfNot)}```

serverless.yml
```yaml
plugins:
  - '@ynpact/serverless-plugin-foreach'
custom:
  isProduction: ${ternary(${opt:stage}, "prod", "true", "false")}
```
resultat generé par l'opérateur, avec stage=prod :
```yaml
"true"
```
## Tips
You can also use the 2 operators foreach and repeat in conjunction with the “file” operator to externalize your template and configuration into separate files as follows:
```yaml
plugins:
  - '@ynpact/serverless-plugin-foreach'
resources:
  - ${foreach(   ${file(template/bucketTemplate.yml.tpl)}, ${file(conf/${opt:stage}.yml):buketsParams}   )}
```
## Test
```npm test```
## Bug report, enhancement and pull request
Do not hesitate to [contact us](mailto:contact@ynpact.com) for bug report, enhancement or pull request.

Under MIT license.
