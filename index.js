	
'use strict';
const yaml = require('js-yaml');
 
class ResourceMultiplier {
  constructor(serverless, cliOptions, { log }) {
    this.serverless = serverless;
    this.configurationVariablesSources = {
        repeat: {
            async resolve({ address, params }) {
                const fileContent = JSON.stringify(params[0]);
                const start = params[2] ? parseInt(params[2]) : 0
                const padding = params[3] ? parseInt(params[3]) : 0

                let output = {}

                for(let i=start; i<start + parseInt(params[1]); i++){
                    const index = String(i).padStart(padding, '0')
                    const content = fileContent.replaceAll("{{i}}", index);
                    let data = yaml.load(content);
                    
                    for(let key of Object.keys(data)) output[key] = data[key]
                }
                const result = {value: {Resources: output}}
                log.verbose("Repeat operator output: ", result)
                return result
            },
        },
        foreach: {
            async resolve({ address, params }) {
                
                const fileContent = JSON.stringify(params[0]);
                let output = {}

                for(let i=0; i<params[1].length; i++){
                    
                    let content = fileContent
                    const index = String(i)
                    content = content.replaceAll("{{i}}", index);
                    for(let field of Object.keys(params[1][i])){
                        content = content.replaceAll("{{i."+ field +"}}", params[1][i][field]);
                    }
                    let data = yaml.load(content);
                    
                    for(let key of Object.keys(data)) output[key] = data[key]
                }
                const result = {value: {Resources: output}}
                log.verbose("Foreach operator output: ", result)
                return result
            }
        },
        ternary: {
            async resolve({ address, params }) {
                return {
                  value: params[0] === params[1] ? params[2] : params[3],
                };
            }
        }
    }
  }
}

module.exports = ResourceMultiplier;