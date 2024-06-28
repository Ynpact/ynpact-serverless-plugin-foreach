# Serverless plugin foreach
This plugin, devolped by [Ynpact](https://www.ynpact.com), provide 2 operators for use in the serverless framework template. Those mimic the Terraform / Open Tofy count or foreach operators.

The **repeat** operator allows to repeat n time a yaml block. In this templated block you can use {{i}} anywhere and it will be replaced by the repeat-index.

The **foreach** operator allows you to repeat a yaml block, iterating on a list of string map. In the templated block, you can use {{i}} and {{i.\<key\>}} and it will be replaced repectively by the index and the value of the string at this key of the map.

## Setup
```npm install serverless-plugin-foreach --save-dev```

## Usage

### repeat operator
${repeat(template, count, start = 0, pad = 0)}
serverless.yml
```
custom:
  template:
    bucket_{{i}}:
        Name: bucket_{{i}}
Resources:
  ${   repeat(${self:custom.template}, 3   }
```
resultat generé par l'opérateur :
```
bucket_0:
  Name: bucket_0
bucket_1:
  Name: bucket_1
bucket_2:
  Name: bucket_2
```
You can optionnaly use the operator parameter start and pad to respectively start the counter from another value of 0 and pad to have the indice padded with x "0".
### foreach operator
serverless.yml
```
custom:
  template:
    endpoint_{{i}}:
        Name: {{i.name}}
        Type: {{i.type}}
  endpointsParams:
    - name: foo
      type: https
    - name: bar
      type: ssh
Resources:
  ${   foreach(${self:custom.template}, ${self:custom.channelsParams}   }
```
resultat generé par l'opérateur :
```
endpoint_0:
  Name: foo
  Type: https
endpoint_1:
  Name: bar
  Type: ssh
```
## Bug report, enhancement and pull request
Do not hesitate to [contact us](contact@ynpact.com) for bug report, enhancement or pull request.

Under ISC license.