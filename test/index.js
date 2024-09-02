var assert = require('assert');
var plugin = require('../index.js');

describe('Test plugin', function () {
    
    pluginInstance = new plugin({}, {}, {log: {verbose:() => console.log()} })
    
    describe('repeat operator', function () {
        it('simple use', async () => {
            const params = [ {"truc{{i}}":"hello{{i}}"}, 10 ]
            const test = await pluginInstance.configurationVariablesSources.repeat.resolve({adress: null, params: params})
            assert.equal(JSON.stringify(test), '{"value":{"Resources":{"truc0":"hello0","truc1":"hello1","truc2":"hello2","truc3":"hello3","truc4":"hello4","truc5":"hello5","truc6":"hello6","truc7":"hello7","truc8":"hello8","truc9":"hello9"}}}')
        });
        it('use with start', async () => {
            const params = [ {"truc{{i}}":"hello{{i}}"}, 10, 1 ]
            const test = await pluginInstance.configurationVariablesSources.repeat.resolve({adress: null, params: params})
            assert.equal(JSON.stringify(test), '{"value":{"Resources":{"truc1":"hello1","truc2":"hello2","truc3":"hello3","truc4":"hello4","truc5":"hello5","truc6":"hello6","truc7":"hello7","truc8":"hello8","truc9":"hello9","truc10":"hello10"}}}')
        });
        it('use with start and pad', async () => {
            const params = [ {"truc{{i}}":"hello{{i}}"}, 10, 0, 3 ]
            const test = await pluginInstance.configurationVariablesSources.repeat.resolve({adress: null, params: params})
            assert.equal(JSON.stringify(test), '{"value":{"Resources":{"truc000":"hello000","truc001":"hello001","truc002":"hello002","truc003":"hello003","truc004":"hello004","truc005":"hello005","truc006":"hello006","truc007":"hello007","truc008":"hello008","truc009":"hello009"}}}')
        });
    });

    describe('foreach operator', function () {
        it('simple use', async () => {
            const params = [
                {"endpoint{{i}}": {"url": "{{i.url}}", "name": "{{i.name}}"}},
                [
                    {url: "url-foo", name: "name-foo"},
                    {url: "url-bar", name: "name-bar"}
                ]
            ]
            let test = await pluginInstance.configurationVariablesSources.foreach.resolve({adress: null, params: params})
            assert.equal(JSON.stringify(test), '{"value":{"Resources":{"endpoint0":{"url":"url-foo","name":"name-foo"},"endpoint1":{"url":"url-bar","name":"name-bar"}}}}')
        });
    });

    describe('ternary operator', function () {
        it('simple use, number->string and true', async () => {
            const params = [1,1, "true", "false"]
            let test = await pluginInstance.configurationVariablesSources.ternary.resolve({adress: null, params: params})
            assert.equal(JSON.stringify(test), '{"value":"true"}')
        });
        it('simple use, number->string and false', async () => {
            const params = [1,0, "true", "false"]
            let test = await pluginInstance.configurationVariablesSources.ternary.resolve({adress: null, params: params})
            assert.equal(JSON.stringify(test), '{"value":"false"}')
        });
        it('simple use, string->string and true', async () => {
            const params = ["hola","hola", "good", "bad"]
            let test = await pluginInstance.configurationVariablesSources.ternary.resolve({adress: null, params: params})
            assert.equal(JSON.stringify(test), '{"value":"good"}')
        });
        it('simple use, string->string and true', async () => {
            const params = ["hola","hello", "good", "bad"]
            let test = await pluginInstance.configurationVariablesSources.ternary.resolve({adress: null, params: params})
            assert.equal(JSON.stringify(test), '{"value":"bad"}')
        });
        it('simple use, string->number and true', async () => {
            const params = ["hola","hola", 10, 0]
            let test = await pluginInstance.configurationVariablesSources.ternary.resolve({adress: null, params: params})
            assert.equal(JSON.stringify(test), '{"value":10}')
        });
        it('simple use, string->number and false', async () => {
            const params = ["hola","hello", 10, 0]
            let test = await pluginInstance.configurationVariablesSources.ternary.resolve({adress: null, params: params})
            assert.equal(JSON.stringify(test), '{"value":0}')
        });
    });

});
