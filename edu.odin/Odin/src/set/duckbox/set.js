var fetch = require('node-fetch');
var readline  = require('readline');
var {google}  = require('googleapis');
var FormData = require('form-data');
const DIIR = 'https://edu.duckbox.com.br/api/set/duckbox/';
exports.InAula = async (auth,origin,who,what) => {
    var form = new FormData()
    form.append('tokenAuth',auth)
    form.append('tokenSchool',origin)
    form.append('token',who)
    form.append('idEvent',what)
var pathFinal = DIIR+'setinAula.php'   
    try {
        let response = await fetch(pathFinal, {
            method: 'POST',
            body:form
          });
        let responseJson = await response.json();
        console.log(await responseJson)
        return {error:null,response: await responseJson}
    } catch (error) {
        console.log(error);
          return {error:error}
      }
}

exports.isAula = async (auth,origin,who,what) => {
    var form = new FormData()
    form.append('tokenAuth',auth)
    form.append('tokenSchool',origin)
    form.append('token',who)
    form.append('idEvent',what)
var pathFinal = DIIR+'isAula.php'   
    try {
        let response = await fetch(pathFinal, {
            method: 'POST',
            body:form
          });
        let responseJson = await response.json();
        console.log(await responseJson)
        return {error:null,response: await responseJson}
    } catch (error) {
        console.log(error);
          return {error:error}
      }
}

exports.OutAula = async (auth,origin,who,what) => {
    var form = new FormData()
    form.append('tokenAuth',auth)
    form.append('tokenSchool',origin)
    form.append('token',who)
    form.append('idEvent',what)
var pathFinal = DIIR+'setoutAula.php'   
    try {
        let response = await fetch(pathFinal, {
            method: 'POST',
            body:form
          });
        let responseJson = await response.json();
        console.log(await responseJson)
        return {error:null,response: await responseJson}
    } catch (error) {
        console.log(error);
          return {error:error}
      }
}

exports.CloseAula = async (auth,origin,what) => {
    var form = new FormData()
    form.append('tokenAuth',auth)
    form.append('tokenSchool',origin)
    form.append('tokenAula',what)
var pathFinal = DIIR+'setAulaoff.php'   
    try {
        let response = await fetch(pathFinal, {
            method: 'POST',
            body:form
          });
        let responseJson = await response.json();
        console.log(await responseJson)
        return {error:null,response: await responseJson}
    } catch (error) {
        console.log(error);
          return {error:error}
      }
}
